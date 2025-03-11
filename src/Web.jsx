import { Fragment, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [datas, setDatas] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    return () => {
      axios.get("http://api-nya.test/api/tes").then((response) => {
        setDatas(response.data);
      });
      axios.get("http://api-nya.test/api/users").then((response) => {
        setUsers(response.data);
      });
      axios.get("http://api-nya.test/api/csrf-token").then((response) => {
        console.log("ini dari getter");
        console.log(response.data.csrf_token);
        setCsrfToken(response.data.csrf_token);
      });
    };
  }, []);

  useEffect(() => {
    console.log("ini dari testing");
    console.log(csrfToken);
  }, [csrfToken]);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post("http://api-nya.test/api/users", formData).then((response) => {
      console.log(response);
    });
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="flex-col min-h-screen text-3xl font-semibold tracking-wide flexc font-inter">
        <div>Halo Gais!</div>
        <br />
        {/* {datas.length > 0 &&
          datas.map((value, index) => (
            <Fragment key={index}>
              <ul className="mb-10">
                <li className="text-base">{value.message}</li>
                <li className="text-lg">{value.title}</li>
                <li className="text-sm">{value.description}</li>
              </ul>
            </Fragment>
          ))} */}

        {/* {users.length > 0 &&
          users.map((value, index) => (
            <Fragment key={`${index}-${value.id}`}>
              <ul className="w-full mb-10 px-28">
                <li className="text-base">{value.id}</li>
                <li className="text-lg">{value.name}</li>
                <li className="text-sm">{value.email}</li>
              </ul>
            </Fragment>
          ))} */}

        <form method="post" className="py-5" onSubmit={handleSubmit}>
          <input type="hidden" name="_token" value={csrfToken} />

          <div className="flex-col px-3 text-left flexc">
            <label htmlFor="name" className="w-full text-lg">
              name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="p-3 text-base text-gray-500"
              placeholder="name"
              onChange={handleChange}
            />
          </div>
          <div className="flex-col px-3 text-left flexc">
            <label htmlFor="email" className="w-full text-lg">
              email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="p-3 text-base text-gray-500"
              placeholder="email"
              onChange={handleChange}
            />
          </div>
          <div className="flex-col px-3 text-left flexc">
            <label htmlFor="password" className="w-full text-lg">
              password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="p-3 text-base text-gray-500"
              placeholder="password"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 text-base text-white bg-blue-500 rounded-lg shadow"
          >
            submit
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
