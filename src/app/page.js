"use client";
import Image from 'next/image'
import styles from './page.module.css'
import lock from "../../public/lockAdd.png";
import connectTo from '@/utils/db';
import React, { useState, useEffect } from 'react';
export default function Home() {
  const [i, seti] = useState(0);
  const [j, setj] = useState(1);
  const [k, setk] = useState(2);
  useEffect(() => {
    const interval = setInterval(() => {
      seti(prevCount => {
        if (prevCount < 9) {
          return prevCount + 1;
        } else {
          return prevCount=0; // Ensure the count stays at 10 after reaching it
        }
      });
    // Change the interval (in milliseconds) as per your preference
    setj(prevCount => {
      if (prevCount < 9) {
        return prevCount + 1;
      } else {
        return prevCount=0;// Ensure the count stays at 10 after reaching it
      }
    });
    setk(prevCount => {
      if (prevCount < 9) {
        return prevCount + 1;
      } else {
        return prevCount=0;
         // Ensure the count stays at 10 after reaching it
      }
    });
      
    }, 100); 
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []); 
  return (

    <main className={styles.main}>
      <p>LOADING YOUR INVENTORY</p>
        <div className="lock-container">
          <div className="lock">
            {i}
          </div>
          <div className="lock">
            {j}
          </div>
          <div className="lock">
            {k}
          </div>
        </div>
    </main>
  )
}
