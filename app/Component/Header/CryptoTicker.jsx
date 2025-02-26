"use client";
import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import axios from "axios";

const CryptoTicker = ({ symbol }) => {
  const [price, setPrice] = useState(null);
  const [pricePercent, setPricePercent] = useState(null);
  const wsRef = useRef(null);

  useEffect(() => {
    if (!symbol) return;

    const fetchInitialData = async () => {
      try {
        const response = await axios.get(
          `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}USDT`
        );
        setPrice(parseFloat(response.data.lastPrice).toFixed(2));
        setPricePercent(
          parseFloat(response.data.priceChangePercent).toFixed(2)
        );
      } catch (error) {
        console.error("Error fetching initial market data:", error);
      }
    };

    fetchInitialData();

    const wsUrl = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}usdt@ticker`;

    const connectWebSocket = () => {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setPrice(parseFloat(data.c).toFixed(2)); // Last trade price
          setPricePercent(parseFloat(data.P).toFixed(2)); // 24h price change %
        } catch (error) {
          console.error("WebSocket message error:", error);
        }
      };

      ws.onclose = () => {
        // console.warn(`WebSocket closed: ${symbol}, reconnecting...`);
        setTimeout(connectWebSocket, 2000); //2s timeout
      };
    };

    connectWebSocket();

    return () => wsRef.current?.close();
  }, [symbol]);

  return (
    <div>
      {price !== null ? (
        <Link href={`/price/${symbol.toLowerCase()}`} className="text-sm">
          {symbol} ${price}
          <span
            className={`text-xs pl-1 font-light ${
              pricePercent >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {pricePercent >= 0 ? "▲" : "▼"}
          </span>
          <span className="text-sm">{pricePercent}%</span>
        </Link>
      ) : (
        <p className="text-xs">Loading...</p>
      )}
    </div>
  );
};

CryptoTicker.propTypes = {
  symbol: PropTypes.string.isRequired,
};

export default CryptoTicker;
