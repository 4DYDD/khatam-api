import { Fragment, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import api, { deleteUser, fetchCSRFToken, fetchUsers } from "./services/api";
import ButtonDanger from "./elements/ButtonDanger";
import ButtonSuccess from "./elements/ButtonSuccess";

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
  const [sending, setSending] = useState(false);

  useEffect(() => {
    return () => {
      api.get("/api/tes").then((response) => {
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

  const handleDelete = (event, dom, id) => {
    event.preventDefault();

    setSending(true);

    deleteUser(id, token)
      .then((responsenya) => {
        fetchUsers().then((response) => {
          console.log(responsenya);
          const success = responsenya.data;
          setSuccess(success);

          document.getElementById(dom).classList.add("animate-scale-down");
          setTimeout(() => {
            setUsers(response.data);
            setSending(false);
          }, 200);
        });
      })
      .catch(({ response }) => {
        const errors = response.data.errors;
        console.log(errors);
        setErrors(errors);
        setSuccess({});
        setSending(false);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formData);

    setSending(true);
    axios
      .post("http://api-nya.test/api/users", formData, {
        headers: {
          "X-API-TOKEN": token,
        },
      })
      .then((responsenya) => {
        console.log(responsenya);

        fetchUsers().then((response) => {
          const success = { ...responsenya.data, type: "submitted" };
          setSuccess(success);
          setErrors({});
          setUsers(response.data);
          setSending(false);
        });
      })
      .catch(({ response }) => {
        const errors = response.data.errors;
        console.log(errors);
        setErrors(errors);
        setSuccess({});
        setSending(false);
      });
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="flex-col min-h-screen py-10 font-semibold tracking-wide flexc font-inter">
        <div className="text-3xl">Halo Gais!</div>
        <br />
        {datas.length > 0 &&
          datas.map((value, index) => (
            <Fragment key={index}>
              <ul className="mb-10 max-w-[30rem]">
                <li className="text-2xl font-bold">{value.message}</li>
                <li className="text-base">{value.title}</li>
                <li className="text-sm text-gray-500">{value.description}</li>
              </ul>
            </Fragment>
          ))}

        {users.length > 0 && (
          <div className="w-[50rem] flexc">
            <div className="relative grid grid-cols-2 transall">
              {users.map((value, index) => {
                const isLast = index + 1 == users.length;

                return (
                  <ul
                    key={`${index}-${value.id}`}
                    id={`${index}-${value.id}`}
                    className={`w-[20rem] relative p-5 m-2 rounded-lg shadow shadow-gray-400 border border-gray-300 transall 
                      ${
                        isLast &&
                        success?.type == "submitted" &&
                        "animate-scale-up"
                      }`}
                  >
                    <li className="text-base">{value.id}</li>
                    <li className="text-lg">{value.name}</li>
                    <li className="text-sm text-gray-500">{value.email}</li>
                    <div className="w-full mt-5 flexc !justify-end">
                      <ButtonDanger
                        onClick={(event) => {
                          const konfirmasi = confirm(
                            `yakin ingin menghapus ${value.name} ?`
                          );

                          if (konfirmasi)
                            handleDelete(
                              event,
                              `${index}-${value.id}`,
                              value.id
                            );
                        }}
                        disabled={sending}
                        className={`text-sm font-bold ${
                          sending && "!opacity-50"
                        }`}
                      >
                        Delete
                      </ButtonDanger>
                    </div>
                  </ul>
                );
              })}
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

            {errors && errors.name && (
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

            {errors && errors.email && (
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

            {errors && errors.password && (
              <span className="w-full px-3 mt-1 text-sm text-left text-red-500">
                {errors.password}
              </span>
            )}
          </div>

          <ButtonSuccess
            type="submit"
            disabled={sending}
            className={`px-4 py-2 text-base text-white bg-blue-500 rounded-lg shadow flexc ${
              sending && "opacity-50"
            }`}
          >
            <i className="text-sm fa-solid fa-plus" />
            <span className="ms-1">Add User</span>
          </ButtonSuccess>
        </form>

        {success.message && (
          <div className="text-base text-center text-green-500">
            {success.message}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
