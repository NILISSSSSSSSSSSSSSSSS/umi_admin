import React, { useState, useEffect, useRef } from 'react'
export default function Index(props: any) {
  const [count, setCount] = useState(0);

  const currentCount = useRef(0);

  currentCount.current = count;

  const handleClick = () => {
    setTimeout(() => {
      setCount(currentCount.current + 1);
    }, 3000);
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>
        setCount
          </button>
      <button onClick={handleClick}>
        Delay setCount
          </button>
    </div>
  );
}