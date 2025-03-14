import { Fragment, useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";

import api, { addUser, fetchToken, fetchUsers } from "./services/api";

import ButtonDanger from "./elements/ButtonDanger";
import ButtonSuccess from "./elements/ButtonSuccess";
import ButtonWarning from "./elements/ButtonWarning";

import useUsers from "./store/useUsers";
import useDatas from "./store/useDatas";
import useFormData from "./store/useFormData";
import useFormUpdateData from "./store/useFormUpdateData";
import useStatus from "./store/useStatus";
import useToken from "./store/useToken";
import useEdit from "./store/useEdit";
import {
  handleCloseUpdateForm,
  handleDelete,
  handleSubmit,
  handleUpdate,
} from "./utils/handle";
import DatasContainer from "./fragments/DatasContainer";
import UsersContainer from "./fragments/UsersContainer";
import FormContainer from "./fragments/FormContainer";

function App() {
  const { datas, setDatas } = useDatas();
  const { users, setUsers } = useUsers();
  const { formData, setFormData } = useFormData();
  const { formUpdateData, setFormUpdateData } = useFormUpdateData();
  const { token, setToken } = useToken();
  const { errors, success, sending, setErrors, setSuccess, setSending } =
    useStatus();

  const addDataRef = useRef(null);

  let zeroEditField =
    !formUpdateData.name && !formUpdateData.email && !formUpdateData.password;

  useEffect(() => {
    return () => {
      api.get("/api/tes").then((response) => {
        setDatas(response.data);
      });

      fetchUsers().then((response) => {
        setUsers(response.data);
      });

      fetchToken()
        .then((response) => {
          setToken(response.data.token);
        })
        .catch((err) => console.error("Gagal mengambil token:", err));
    };
  }, []);

  useEffect(() => {
    if (token) {
      console.log("kredensial lu :", token);
    }
  }, [token]);

  const clearInputData = () => {
    if (addDataRef) {
      addDataRef.current[0].value = "";
      addDataRef.current[1].value = "";
      addDataRef.current[2].value = "";
    }
  };

  const handleChange = (event) => {
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

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  return (
    <>
      <div className="flex-col min-h-screen py-10 font-semibold tracking-wide flexc font-inter">
        <div className="text-3xl">Halo Gais!</div>
        <br />
        {datas.length > 0 && (
          <>
            <DatasContainer datas={datas} />
          </>
        )}

        {users.length > 0 && (
          <UsersContainer props={{ handleChangeUpdate, zeroEditField }} />
        )}

        <FormContainer props={{ clearInputData, addDataRef, handleChange }} />

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
