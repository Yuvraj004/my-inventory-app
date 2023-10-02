"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './page.css';
import '@fortawesome/fontawesome-free/css/all.css';

export default function Home() {
  const randomInti = Math.floor(Math.random() * 10);
  const randomIntj = Math.floor(Math.random() * 10);
  const randomIntk = Math.floor(Math.random() * 10);
  const [i, seti] = useState(randomInti);
  const [j, setj] = useState(randomIntj);
  const [k, setk] = useState(randomIntk);
  const [pause, setpause] = useState(0);
  const [animate, setAnimate] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      // setTimeout(() => setAnimate(false), 100);
      seti(prevCount => (prevCount < 9 ? prevCount + 1 : 0));
      setj(prevCount => (prevCount < 9 ? prevCount + 1 : 0));
      setk(prevCount => (prevCount < 9 ? prevCount + 1 : 0));
      setpause(prevCount => {
        if (prevCount < 15) return prevCount + 1;
        else {
          clearInterval(interval);
          router.push('/components/login');
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="main">
      <div className='container'>
        <p>LOADING YOUR INVENTORY.....</p>
        <div className="lock-container">
          <div className="lock">
            <h1 className={`${typeof window !== 'undefined' && animate ? 'slide-up-enter' : ''}`}>{i}</h1>
          </div>
          <div className="lock">
            <h1 className={`${typeof window !== 'undefined' && animate ? 'slide-up-enter' : ''}`}>{j}</h1>
          </div>
          <div className="lock">
            <h1 className={`${typeof window !== 'undefined' && animate ? 'slide-up-enter' : ''}`}>{k}</h1>
          </div>
        </div>
      </div>
    </main>
  );
}