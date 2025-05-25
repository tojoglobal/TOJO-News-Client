"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import CryptoTicker from "./CryptoTicker";

const HeaderScroll = () => {
  const tickerWrapperRef = useRef(null);
  const listRef = useRef(null);
  const clonedListRef = useRef(null);

  const symbols = [
    "BTC", // Bitcoin
    "ETH", // Ethereum
    "BNB", // Binance Coin
    "SOL", // Solana
    "XRP", // XRP (Ripple)
    "ADA", // Cardano
    "DOGE", // Dogecoin
    "MATIC", // Polygon
    "DOT", // Polkadot
    "AVAX", // Avalanche
    "LTC", // Litecoin
    "SHIB", // Shiba Inu
    "ATOM", // Cosmos
    "ARB", // Arbitrum
    "OP", // Optimism
  ];

  useEffect(() => {
    const $tickerWrapper = tickerWrapperRef.current;
    const $list = listRef.current;
    const $clonedList = clonedListRef.current;

    if (!$list || !$clonedList) return;

    const listItemWidth = 185;
    const listWidth = listItemWidth * symbols.length;

    [$list, $clonedList].forEach((el) => {
      el.style.width = `${listWidth}px`;
    });

    $clonedList.classList.add("cloned");

    // Use GSAP 3 syntax
    const infinite = gsap.timeline({ repeat: -1, paused: true });

    const time = 35;

    infinite
      .fromTo(
        $list,
        { x: 0 },
        { x: -listWidth, duration: time, ease: "linear" },
        0
      )
      .fromTo(
        $clonedList,
        { x: listWidth },
        { x: 0, duration: time, ease: "linear" },
        0
      )
      .set($list, { x: listWidth })
      .to($clonedList, { x: -listWidth, duration: time, ease: "linear" }, time)
      .to($list, { x: 0, duration: time, ease: "linear" }, time)
      .progress(1)
      .progress(0)
      .play();

    // Pause on hover
    const pauseTicker = () => infinite.pause();
    const resumeTicker = () => infinite.play();

    $tickerWrapper.addEventListener("mouseenter", pauseTicker);
    $tickerWrapper.addEventListener("mouseleave", resumeTicker);

    return () => {
      $tickerWrapper.removeEventListener("mouseenter", pauseTicker);
      $tickerWrapper.removeEventListener("mouseleave", resumeTicker);
      infinite.kill();
    };
  }, [symbols.length]);

  return (
    <div
      className="h-[30px] md:h-[53px] mt-3 md:mt-1 relative top-1 left-0 pb-1  bg-white w-full overflow-hidden cursor-pointer"
      ref={tickerWrapperRef}
    >
      <ul className="flex p-0 m-0 w-full" ref={listRef}>
        {symbols.map((symbol, index) => (
          <li
            className="ml-1 w-[250px] inline-block"
            // style={{ width: "200px", display: "inline-block" }}
            key={index}
          >
            <CryptoTicker symbol={symbol} />
          </li>
        ))}
      </ul>
      <ul
        className="flex p-0 m-0 w-full absolute top-0 left-0"
        ref={clonedListRef}
      >
        {symbols.map((symbol, index) => (
          <li
            className="ml-1 w-[250px] inline-block"
            // style={{ width: "200px", display: "inline-block" }}
            key={index + symbols.length}
          >
            <CryptoTicker symbol={symbol} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeaderScroll;
