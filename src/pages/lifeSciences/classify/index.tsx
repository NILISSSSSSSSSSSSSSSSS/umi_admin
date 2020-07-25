import React, { useState, createContext } from 'react';
//===关键代码
const CountContext = createContext()

function Index() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => { setCount(count + 1) }}>click me</button>
      {/*======关键代码 */}
      <CountContext.Provider value={count}>
      </CountContext.Provider>

    </div>
  )
}
export default Index;

