import React from "react";
import TopBar from "./TopBar";
import MainHeader from "./MainHeader";
import NavigationBar from "./NavigationBar";

const Header = () => {
  return (
    <div>
      <TopBar />
      <MainHeader />
      <NavigationBar />
    </div>
  );
};

export default Header;
