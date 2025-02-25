import Footer from "./Component/Footer/Footer";
import Header from "./Component/Header/Header";

export default function Home({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
