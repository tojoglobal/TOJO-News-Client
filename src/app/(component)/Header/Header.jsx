import TopBar from "./TopBar";
import MainHeader from "./MainHeader";
import NavigationBar from "./NavigationBar";
import CryptoTicker from "./CryptoTicker";
import HeaderScroll from "./HeaderScroll";

const Header = () => {
  return (
    <>
      <TopBar />
      <MainHeader />
      <NavigationBar />
      {/* <CryptoTicker /> */}
      <HeaderScroll />
    </>
  );
};

export default Header;
