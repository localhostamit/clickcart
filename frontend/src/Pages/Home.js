import Navbar from "../Components/NAVBAR/Navbar";
import Hero from "../Components/HERO/Hero";
import Category from "../Components/CATEGORY/Category";
import ProductSection from "../Components/PRODUCT/ProductSection";
import FlashSale from "../Components/FLASHSALE/FlashSale";
import BannerSection from "../Components/BANNER/BannerSection";
import TopSelling from "../Components/TOPSELLING/TopSelling";
import Footer from "../Components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Category />
      <FlashSale />
      <BannerSection />
      <ProductSection />
      <TopSelling />
      <Footer />
    </>
  );
}

export default Home;