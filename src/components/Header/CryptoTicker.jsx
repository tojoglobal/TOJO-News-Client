"use client";
import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import axios from "axios";
import React from "react";
import { Skeleton } from "@/src/ui/skeleton";

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
        setTimeout(connectWebSocket, 2000); //2s timeout
      };
    };

    connectWebSocket();

    return () => wsRef.current?.close();
  }, [symbol]);

  return (
    <div>
      {price !== null ? (
        <Link
          href={`/price/${symbol.toLowerCase()}`}
          className="text-xs md:text-sm"
        >
          {symbol} ${price}
          <span
            className={`text-[10px] md:text-xs md:pl-1 font-light ${
              pricePercent >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {pricePercent >= 0 ? "▲" : "▼"}
          </span>
          <span className="text-xs md:text-sm">{pricePercent}%</span>
        </Link>
      ) : (
        <Skeleton className="skeleton-box h-[18px] w-full rounded-sm" />
      )}
    </div>
  );
};

CryptoTicker.propTypes = {
  symbol: PropTypes.string.isRequired,
};

export default CryptoTicker;
