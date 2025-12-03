import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CounterBox = ({ target, label  }) => {
  const [count, setCount] = useState(0);
  const boxRef = useRef(null);
  const started = useRef(false); // to prevent reruns
  const duration = 5000;

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: boxRef.current,
      start: 'top 90%', // when 10% visible from bottom
      onEnter: () => {
        if (started.current) return;
        started.current = true;

        let start = 0;
        const increment = Math.ceil(target / (duration / 16));
        const interval = setInterval(() => {
          start += increment;
          if (start >= target) {
            start = target;
            clearInterval(interval);
          }
          setCount(start);
        }, 16);
      },
      once: true,
    });

    return () => {
      trigger.kill();
    };
  }, [target]);

  return (
    <div
      ref={boxRef}
      className={`border bg-gradient-to-b from-[#F2E7FE] via-[#EEE7FE] to-[#FFFFFF] border-white text-center rounded-3xl p-4`}
    >
      <h2 className='sm:text-[50px] text-[18px] font-medium'>{count}+</h2>
      <p className='sm:text-[18px] text-[13px] sm:pb-4 text-[#4D4D4D]'>{label}</p>
    </div>
  );
};

export default CounterBox;
