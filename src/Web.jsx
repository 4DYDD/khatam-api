import { Fragment, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import api, { fetchCSRFToken, fetchUsers } from "./services/api";

function App() {
  const [datas, setDatas] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [token, setToken] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({});

  useEffect(() => {
    return () => {
      axios.get("http://api-nya.test/api/tes").then((response) => {
        setDatas(response.data);
      });

      fetchUsers().then((response) => {
        setUsers(response.data);
      });

      fetchCSRFToken()
        .then((response) => {
          console.log("token berhasil diambil");
          console.log(response.data);
          setToken(response.data.token);
        })
        .catch((err) => console.error("Gagal mengambil CSRF token:", err));
    };
  }, []);

  useEffect(() => {
    if (token) {
      console.log("kredensial lu :", token);
    }
  }, [token]);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formData);

    axios
      .post("http://api-nya.test/api/users", formData, {
        headers: {
          "X-API-TOKEN": token,
        },
      })
      .then((response) => {
        console.log(response);
        const success = response.data;
        setSuccess(success);
        setErrors({});
        fetchUsers().then((response) => {
          setUsers(response.data);
        });
      })
      .catch(({ response }) => {
        const errors = response.data.errors;
        console.log(errors);
        setErrors(errors);
        setSuccess({});
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

        {users.length > 0 && (
          <div className="w-[50rem] flexc">
            <div className="grid grid-cols-2">
              {users.map((value, index) => (
                <Fragment key={`${index}-${value.id}`}>
                  <ul className="w-[20rem] p-5 m-2 rounded-lg shadow shadow-gray-400 border border-gray-300">
                    <li className="text-base">{value.id}</li>
                    <li className="text-lg">{value.name}</li>
                    <li className="text-sm text-gray-500">{value.email}</li>
                  </ul>
                </Fragment>
              ))}
            </div>
          </div>
        )}

        <form
          method="post"
          className="py-5 min-w-[30rem]"
          onSubmit={handleSubmit}
        >
          <div className="flex-col px-3 text-left flexc !items-start mb-5">
            <label htmlFor="name" className="w-full text-lg">
              name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-3 text-base text-gray-500 border border-gray-400 rounded-lg shadow outline-none shadow-gray-400 ring-none"
              placeholder="name"
              onChange={handleChange}
            />

            {errors.name && (
              <span className="w-full px-3 mt-1 text-sm text-left text-red-500">
                {errors.name}
              </span>
            )}
          </div>
          <div className="flex-col px-3 text-left flexc !items-start mb-5">
            <label htmlFor="email" className="w-full text-lg">
              email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 text-base text-gray-500 border border-gray-400 rounded-lg shadow outline-none shadow-gray-400 ring-none"
              placeholder="email"
              onChange={handleChange}
            />

            {errors.email && (
              <span className="w-full px-3 mt-1 text-sm text-left text-red-500">
                {errors.email}
              </span>
            )}
          </div>
          <div className="flex-col px-3 text-left flexc !items-start mb-5">
            <label htmlFor="password" className="w-full text-lg">
              password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 text-base text-gray-500 border border-gray-400 rounded-lg shadow outline-none shadow-gray-400 ring-none"
              placeholder="password"
              onChange={handleChange}
            />

            {errors.password && (
              <span className="w-full px-3 mt-1 text-sm text-left text-red-500">
                {errors.password}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="px-4 py-2 text-base text-white bg-blue-500 rounded-lg shadow"
          >
            submit
          </button>

          {success.message && (
            <div className="text-base text-center text-green-500">
              {success.message}
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default App;
