import { Fragment, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    axios.get("http://api-nya.test/api/tes").then((response) => {
      setDatas(response.data);
    });
  }, []);

  return (
    <>
      <div className="flex-col h-screen text-3xl font-semibold tracking-wide flexc font-inter">
        <div>Halo Gais!</div>
        <br />
        {datas.length > 0 &&
          datas.map((value, index) => (
            <Fragment key={index}>
              <ul className="mb-10">
                <li className="text-base">{value.message}</li>
                <li className="text-lg">{value.title}</li>
                <li className="text-sm">{value.description}</li>
              </ul>
            </Fragment>
          ))}
      </div>
    </>
  );
}

export default App;
