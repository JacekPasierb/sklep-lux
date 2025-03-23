import React from 'react'
import styles from "./VideoSection.module.css"

const VideoSection = () => {
  return (
    <section className={styles.videoSection}>
    <div className={styles.videoWrapper}>
      <video className={styles.fullWidthVideo} autoPlay muted loop>
        <source src="/images/vide.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </section>
  
  )
}

export default VideoSection