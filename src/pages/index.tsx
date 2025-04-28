"use client";

import {useMediaQuery} from "@react-hook/media-query";
import {About} from "../components/About/About";
import DiscountForm from "../components/DiscountForm/DiscountForm";
import Footer from "../components/Footer/Footer";
import {Hero} from "../components/Hero/Hero";
import Navigation from "../components/Navigation/Navigation";
import ShopMenu from "../components/ShopMenu/ShopMenu";
import VideoSection from "../components/VideoSection/VideoSection";
import {WatchModelsa} from "../components/WatchModels/WatchModelsa";
import WatchModelsMin from "../components/WatchModels/WatchModelsMin";
import styles from "./page.module.css";

export default function Home() {
  const isSMobile = useMediaQuery("(max-width: 480px)");

  return (
    <main className={styles.main}>
      <Hero />
      <About />

      {isSMobile ? <WatchModelsMin /> : <WatchModelsa />}
      <DiscountForm />
      <VideoSection />
      <Footer isSmallMobile={isSMobile} />
      <Navigation />
      <ShopMenu />
    </main>
  );
}
