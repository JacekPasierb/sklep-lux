"use client";

import {About} from "../components/About/About";
import DiscountForm from "../components/DiscountForm/DiscountForm";
import Footer from "../components/Footer/Footer";
import {Hero} from "../components/Hero/Hero";
import VideoSection from "../components/VideoSection/VideoSection";
import {WatchModelsa} from "../components/WatchModels/WatchModelsa";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [isSmallMobile, setIsSmallMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallMobile(window.innerWidth <= 480); 
    };

    window.addEventListener("resize", handleResize);
    handleResize(); 

  
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <main className={styles.main}>
      <Hero />
      <About />

      {!isSmallMobile && <WatchModelsa />}
      <DiscountForm />
      <VideoSection />
      <Footer isSmallMobile={isSmallMobile}/>
    </main>
  );
}
