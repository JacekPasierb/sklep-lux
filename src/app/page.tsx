import { About } from '../components/About/About';
import DiscountForm from '../components/DiscountForm/DiscountForm';
import Features from '../components/Features/Features';
import Footer from '../components/Footer/Footer';
import { Hero } from '../components/Hero/Hero';
import { Heroa, HeroA } from '../components/Hero/Heroa';
import { Herob } from '../components/Hero/Herob';
import VideoSection from '../components/VideoSection/VideoSection';
import { WatchModels } from '../components/WatchModels/WatchModels';
import { WatchModelsa } from '../components/WatchModels/WatchModelsa';
import styles from './page.module.css';



export default function Home() {
  return (
    <main className={styles.main}>
      {/* <Hero /> */}
      <Hero/>
      <About />
      {/* <WatchModels /> */}
      <WatchModelsa />
     <DiscountForm/>
     <VideoSection/>
     <Footer/>
    
    </main>
  );
}
