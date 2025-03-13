import { Fragment, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import api, {
  deleteUser,
  fetchCSRFToken,
  fetchUsers,
  updateUser,
} from "./services/api";
import ButtonDanger from "./elements/ButtonDanger";
import ButtonSuccess from "./elements/ButtonSuccess";
import ButtonWarning from "./elements/ButtonWarning";

function App() {
  const [datas, setDatas] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [formUpdateData, setFormUpdateData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [token, setToken] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({});
  const [sending, setSending] = useState(false);
  const [edit, setEdit] = useState(null);

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

  const handleCancelUpdate = (status, dom) => {
    showEditMenu(status, dom);
    setFormUpdateData({
      name: "",
      email: "",
      password: "",
    });

    setTimeout(() => {
      setEdit(null);
    }, 300);
  };

  const showEditMenu = (status, dom) => {
    if (status == false) {
      document.getElementById(dom).classList.remove("animate-slide-down");
      document.getElementById(dom).classList.add("animate-slide-up");
    }
  };

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

  const handleUpdate = (event, dom, id) => {
    event.preventDefault();

    console.log("update datanya!");

    setSending(true);

    let filteredFormUpdateData = {};

    filteredFormUpdateData.name =
      formUpdateData.name && formUpdateData.name !== ""
        ? formUpdateData.name
        : null;

    filteredFormUpdateData.email =
      formUpdateData.email && formUpdateData.email !== ""
        ? formUpdateData.email
        : null;

    filteredFormUpdateData.password =
      formUpdateData.password && formUpdateData.password !== ""
        ? formUpdateData.password
        : null;

    updateUser(id, filteredFormUpdateData, token)
      .then((responsenya) => {
        fetchUsers().then((response) => {
          console.log(responsenya);
          const success = responsenya.data;
          setSuccess(success);

          setFormUpdateData({
            name: "",
            email: "",
            password: "",
          });

          handleCancelUpdate(false, `edit-${dom}`);

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
    // console.log({ ...formData, [event.target.name]: event.target.value });
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleChangeUpdate = (event) => {
    setFormUpdateData({
      ...formUpdateData,
      [event.target.name]: event.target.value,
    });
  };

  // useEffect(() => {
  //   console.log(formUpdateData);
  // }, [formUpdateData]);

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
          <div className="w-[60rem] flexc">
            <div className="relative grid grid-cols-2 transall">
              {users.map((value, index) => {
                const isLast = index + 1 == users.length;

                return (
                  <ul
                    key={`${index}-${value.id}`}
                    id={`${index}-${value.id}`}
                    className={`w-[26rem] relative overflow-hidden m-2 rounded-lg shadow shadow-gray-400 border border-gray-300 transall 
                      ${
                        isLast &&
                        success?.type == "submitted" &&
                        "animate-scale-up"
                      }`}
                  >
                    {/*  */}

                    {edit && edit == value.id && (
                      <div
                        id={`edit-${index}-${value.id}`}
                        className="w-full h-full bg-white transcenter flexc z-[2] animate-slide-down"
                      >
                        {/*  */}

                        <form
                          onSubmit={(event) => {
                            handleUpdate(
                              event,
                              `${index}-${value.id}`,
                              value.id
                            );
                          }}
                          className="flex-col gap-3 flexc"
                        >
                          <div className="w-full gap-3 text-sm flexc">
                            <label className="flex-[2]" htmlFor="name">
                              Name
                            </label>
                            <input
                              className="text-gray-600 px-3 py-1.5 rounded shadow outline-none ring-0 shadow-gray-400"
                              type="text"
                              name="name"
                              id="name"
                              placeholder={value.name}
                              onChange={handleChangeUpdate}
                            />
                          </div>
                          <div className="w-full gap-3 text-sm flexc">
                            <label className="flex-[2]" htmlFor="email">
                              email
                            </label>
                            <input
                              className="text-gray-600 px-3 py-1.5 rounded shadow outline-none ring-0 shadow-gray-400"
                              type="email"
                              name="email"
                              id="email"
                              placeholder={value.email}
                              onChange={handleChangeUpdate}
                            />
                          </div>
                          <div className="w-full gap-3 text-sm flexc">
                            <label className="flex-[2]" htmlFor="password">
                              Password
                            </label>
                            <input
                              className="text-gray-600 px-3 py-1.5 rounded shadow outline-none ring-0 shadow-gray-400"
                              type="password"
                              name="password"
                              id="password"
                              placeholder="your new password..."
                              onChange={handleChangeUpdate}
                            />
                          </div>
                          <div className="flexc !justify-end w-full mt-2">
                            <ButtonSuccess
                              type={`submit`}
                              className={`text-sm mx-2`}
                            >
                              update
                            </ButtonSuccess>

                            {/*  */}
                            {/*  */}
                            {/*  */}

                            <ButtonDanger
                              className={`text-sm mx-2`}
                              onClick={(event) => {
                                event.preventDefault();

                                handleCancelUpdate(
                                  false,
                                  `edit-${index}-${value.id}`
                                );
                              }}
                            >
                              cancel
                            </ButtonDanger>
                          </div>
                        </form>

                        {/*  */}
                      </div>
                    )}

                    <div className="py-5 px-10 h-[14rem] flexc !items-start gap-1 flex-col">
                      <li className="text-base">{value.id}</li>
                      <li className="text-lg">{value.name}</li>
                      <li className="text-sm text-gray-500">{value.email}</li>
                      <div className="w-full mt-5 flexc !justify-end gap-3">
                        <ButtonWarning
                          onClick={(event) => {
                            setEdit(value.id);
                          }}
                          disabled={sending}
                          className={`text-sm font-bold ${
                            sending && "!opacity-50"
                          }`}
                        >
                          Edit
                        </ButtonWarning>

                        {/*  */}
                        {/*  */}
                        {/*  */}

                        <ButtonDanger
                          onClick={(event) => {
                            const konfirmasi = confirm(
                              `yakin ingin menghapus (${value.name}) ?`
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

                        {/*  */}
                      </div>
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
