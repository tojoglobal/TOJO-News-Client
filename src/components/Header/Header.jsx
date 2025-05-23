"use client";
import TopBar from "./TopBar";
import MainHeader from "./MainHeader";
import NavigationBar from "./NavigationBar";
// import CryptoTicker from "./CryptoTicker";
import HeaderScroll from "./HeaderScroll";
import { usePathname } from "next/navigation";
const Header = () => {
  const pathname = usePathname();
  return (
    <>
      <TopBar />
      <MainHeader />
      <NavigationBar />
      {/* <CryptoTicker /> */}
      {pathname !== "/documentaries" && <HeaderScroll />}
    </>
  );
};

export default Header;
