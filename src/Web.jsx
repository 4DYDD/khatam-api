import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="h-screen flexc font-inter text-3xl font-semibold tracking-wide">
        Halo Gais!
      </div>
    </>
  );
}

export default App;
