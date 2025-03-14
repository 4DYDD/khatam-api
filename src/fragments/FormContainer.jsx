import React from "react";
import useStatus from "../store/useStatus";
import ButtonSuccess from "../elements/ButtonSuccess";
import { handleSubmit } from "../utils/handle";
import useToken from "../store/useToken";
import useFormData from "../store/useFormData";
import useUsers from "../store/useUsers";

import { fetchUsers, addUser } from "../services/api";

function FormContainer({ props }) {
  const { clearInputData, addDataRef, handleChange } = props;

  const { users, setUsers } = useUsers();
  const { formData, setFormData } = useFormData();

  const { token, setToken } = useToken();

  const { sending, setSending, success, setSuccess, errors, setErrors } =
    useStatus();

  return (
    <>
      <form
        ref={addDataRef && addDataRef}
        method="post"
        className="py-5 min-w-[30rem]"
        onSubmit={(event) => {
          handleSubmit(event, {
            setSending,
            setSuccess,
            setErrors,
            addUser,
            formData,
            setFormData,
            token,
            fetchUsers,
            setUsers,
            clearInputData,
          });
        }}
      >
        {/*  */}

        <div className="flex-col px-3 text-left flexc !items-start mb-5">
          <label htmlFor="name" className="w-full text-lg">
            name
          </label>
          <input
            type="text"
            maxLength="255"
            id="name"
            name="name"
            className="w-full p-3 text-base text-gray-500 border border-gray-400 rounded-lg shadow outline-none shadow-gray-400 ring-none"
            placeholder="name"
            onChange={handleChange}
          />

          {errors && errors.type === "notsubmitted" && errors.name && (
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

          {errors && errors.type === "notsubmitted" && errors.email && (
            <span className="w-full px-3 mt-1 text-sm text-left text-red-500">
              {errors.email}
            </span>
          )}
        </div>
        <div className="flex-col px-3 text-left flexc !items-start mb-5">
          <label htmlFor="password" minLength="8" className="w-full text-lg">
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

          {errors && errors.type === "notsubmitted" && errors.password && (
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
    </>
  );
}

export default FormContainer;
