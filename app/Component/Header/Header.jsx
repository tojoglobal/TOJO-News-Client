import React from "react";
import TopBar from "./TopBar";
import MainHeader from "./MainHeader";
import NavigationBar from "./NavigationBar";
import CryptoTicker from "./CryptoTicker";
import HeaderScroll from "./HeaderScroll";

const Header = () => {
  return (
    <div>
      <TopBar />
      <MainHeader />
      <NavigationBar />
      {/* <CryptoTicker /> */}
      <HeaderScroll />
    </div>
  );
};

export default Header;
