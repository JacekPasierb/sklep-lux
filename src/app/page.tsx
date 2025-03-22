import { About } from '../components/About/About';
import { Hero } from '../components/Hero/Hero';
import { Heroa, HeroA } from '../components/Hero/Heroa';
import { Herob } from '../components/Hero/Herob';
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
      <section style={{height:"600px"}}></section>
    </main>
  );
}
