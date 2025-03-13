"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const CryptoPrices = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 60,
              page: 1,
              sparkline: true,
              price_change_percentage: "1h,24h",
            },
          }
        );
        setCryptoData(response.data);
      } catch (error) {
        setError("Failed to fetch cryptocurrency data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, []);

  const formatNumber = (num) => {
    if (num >= 1e12) {
      return `$ ${(num / 1e12).toFixed(2)}T`;
    } else if (num >= 1e9) {
      return `$ ${(num / 1e9).toFixed(2)}B`;
    } else if (num >= 1e6) {
      return `$ ${(num / 1e6).toFixed(2)}M`;
    } else {
      return `$ ${num.toLocaleString()}`;
    }
  };

  const renderSparkline = (data) => {
    const width = 100;
    const height = 30;
    const max = Math.max(...data);
    const min = Math.min(...data);

    const points = data.map((d, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = ((d - min) / (max - min)) * height;
      return [x, height - y];
    });

    const pathD = points
      .map((point, index) => {
        const [x, y] = point;
        // ${index === 0 ? "M" : "L"}
        return `${x},${y} `;
      })
      .join(" ");

    // Determine the color based on the price change
    const color =
      data[0] < data[data.length - 1] ? "rgb(20, 83, 45)" : "rgb(127, 29, 29)";

    return (
      <>
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
          <g>
            {points.map(([cx, cy], index) => (
              <circle
                key={index}
                cx={cx}
                cy={cy}
                r="2"
                style={{
                  stroke: "none",
                  strokeWidth: 0,
                  fillOpacity: 0.1,
                  fill: color,
                  pointerEvents: "auto",
                }}
              />
            ))}

            <polyline
              points={pathD}
              fill="none"
              stroke={color}
              strokeWidth="1"
              style={{
                stroke: color,
                strokeWidth: 1,
                strokeLinejoin: "round",
                strokeLinecap: "round",
                fill: "none",
              }}
            ></polyline>
            <polyline
              points={pathD}
              style={{
                stroke: "none",
                strokeWidth: 0,
                fillOpacity: 0.1,
                strokeLinejoin: "round",
                strokeLinecap: "round",
                fill: color,
                pointerEvents: "auto",
              }}
            ></polyline>
          </g>
        </svg>
      </>
    );
  };

  return (
    <>
      <section className="max-w-[1440px] w-full  mx-auto">
        <div className="w-full ">
          <div className="h-full p-0 ">
            <div className="flex flex-col gap-4  p-4 lg:p-6">
              <div>
                <h1 className="self-stretch flex-grow-0 flex-shrink-0 w-full text-5xl font-semibold text-center text-[#110b29] capitalize py-1">
                  Today&#39;s Market Cap
                </h1>
              </div>
            </div>
            {/* table of crypto */}
            <div className="p-6 overflow-x-auto">
              {loading ? (
                <span className="loading loading-bars loading-xl"></span>
              ) : error ? (
                <p>{error}</p>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        # Rank
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        1h
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        24h
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Volume (24h)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Market Cap
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Chart
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cryptoData.map((crypto) => (
                      <tr key={crypto.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {crypto.market_cap_rank}
                        </td>
                        <td className="px-2 py-4 whitespace-nowrap overflow-hidden w-[10%]">
                          <div className="flex items-center">
                            <div className="h-8 w-8">
                              <img
                                alt={crypto.name}
                                loading="lazy"
                                className="w-full h-full"
                                src={crypto.image}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-semibold text-gray-900">
                                {crypto.name}
                              </div>
                              <div className="text-sm text-gray-600 uppercase">
                                {crypto.symbol}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          ${crypto.current_price.toLocaleString()}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap ${
                            crypto.price_change_percentage_1h_in_currency >= 0
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {crypto.price_change_percentage_1h_in_currency.toFixed(
                            2
                          )}
                          %
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap ${
                            crypto.price_change_percentage_24h >= 0
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {crypto.price_change_percentage_24h.toFixed(2)}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {formatNumber(crypto.total_volume)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {formatNumber(crypto.market_cap)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {renderSparkline(crypto.sparkline_in_7d.price)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CryptoPrices;
