import React from "react";
import ButtonWarning from "../elements/ButtonWarning";
import useStatus from "../store/useStatus";
import ButtonDanger from "../elements/ButtonDanger";
import { Delete } from "../elements/icons/Delete";
import useEdit from "../store/useEdit";
import useFormUpdateData from "../store/useFormUpdateData";
import {
  handleCloseUpdateForm,
  handleDelete,
  handleUpdate,
} from "../utils/handle";
import ButtonSuccess from "../elements/ButtonSuccess";
import { fetchUsers, updateUser, deleteUser } from "../services/api";
import useToken from "../store/useToken";
import useUsers from "../store/useUsers";

function UsersContainer({ props }) {
  const { handleChangeUpdate, zeroEditField } = props;

  const { users, setUsers } = useUsers();

  const { edit, setEdit } = useEdit();
  const { formUpdateData, setFormUpdateData } = useFormUpdateData();
  const { sending, setSending, success, setSuccess, errors, setErrors } =
    useStatus();

  const { token, setToken } = useToken();

  return (
    <>
      <div className="w-[60rem] xl:w-[100rem] flexc">
        <div className="relative grid grid-cols-2 xl:grid-cols-3 transall">
          {users.map((value, index) => {
            const isLast = index + 1 == users.length;

            return (
              <ul
                key={`key-${index}-${value.id}`}
                id={`${index}-${value.id}`}
                className={`w-[26rem] relative overflow-hidden m-2 rounded-lg shadow shadow-gray-400 border border-gray-300 transall 
                      ${
                        isLast && success?.type == "submitted"
                          ? "animate-scale-up"
                          : "bawadew"
                      }`}
              >
                {/*  */}

                {edit && edit == value.id && (
                  <div
                    id={`edit-${index}-${value.id}`}
                    className="w-full h-full overflow-y-auto bg-white transcenter flexc z-[2] animate-slide-down"
                  >
                    {/*  */}

                    <form
                      onSubmit={(event) => {
                        if (zeroEditField) return;

                        handleUpdate(event, `${index}-${value.id}`, value.id, {
                          zeroEditField,
                          setSending,
                          formUpdateData,
                          updateUser,
                          token,
                          fetchUsers,
                          setSuccess,
                          setErrors,
                          setFormUpdateData,
                          setEdit,
                          setUsers,
                        });
                      }}
                      className="flex-col gap-3 mt-10 mb-5 flexc"
                    >
                      {/*  */}

                      <div
                        className={`w-full gap-3 text-sm flexc  ${
                          edit &&
                          edit == value.id &&
                          errors &&
                          errors.type === "notupdated" &&
                          "mt-20"
                        }`}
                      >
                        <label className="flex-[2]" htmlFor="name">
                          Name
                        </label>
                        <input
                          className="text-gray-600  px-3 py-1.5 rounded shadow outline-none ring-0 shadow-gray-400"
                          type="text"
                          name="name"
                          id="name"
                          value={formUpdateData.name || ""}
                          placeholder={value.name}
                          onChange={handleChangeUpdate}
                        />
                      </div>

                      {edit &&
                        edit == value.id &&
                        errors &&
                        errors.type === "notupdated" &&
                        errors.name && (
                          <div className="w-full mb-2 text-xs font-bold text-red-500 text-start">
                            {errors.name}
                          </div>
                        )}

                      <div className="w-full gap-3 text-sm flexc">
                        <label className="flex-[2]" htmlFor="email">
                          email
                        </label>
                        <input
                          className="text-gray-600 px-3 py-1.5 rounded shadow outline-none ring-0 shadow-gray-400"
                          type="email"
                          name="email"
                          id="email"
                          value={formUpdateData.email || ""}
                          placeholder={value.email}
                          onChange={handleChangeUpdate}
                        />
                      </div>

                      {edit &&
                        edit == value.id &&
                        errors &&
                        errors.type === "notupdated" &&
                        errors.email && (
                          <div className="w-full mb-2 text-xs font-bold text-red-500 text-start">
                            {errors.email}
                          </div>
                        )}

                      <div className="w-full gap-3 text-sm flexc">
                        <label className="flex-[2]" htmlFor="password">
                          Password
                        </label>
                        {/*  */}

                        <input
                          className={`z-[1] relative text-gray-600 px-3 py-1.5 rounded shadow outline-none ring-0 shadow-gray-400`}
                          type="text"
                          name="password"
                          id="password"
                          value={formUpdateData.password || ""}
                          placeholder={`your new password...`}
                          onChange={handleChangeUpdate}
                        />

                        {/*  */}
                      </div>

                      {edit &&
                        edit == value.id &&
                        errors &&
                        errors.type === "notupdated" &&
                        errors.password && (
                          <div className="w-full mb-2 text-xs font-bold text-red-500 text-start">
                            {errors.password}
                          </div>
                        )}

                      <div className="flexc !justify-end w-full mt-2 py-3">
                        <ButtonSuccess
                          disabled={zeroEditField}
                          type={`submit`}
                          className={`text-sm mx-2 ${
                            zeroEditField && "!opacity-50"
                          }`}
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

                            handleCloseUpdateForm(`edit-${index}-${value.id}`, {
                              setFormUpdateData,
                              setSending,
                              setErrors,
                              setEdit,
                            });
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
                  <li className="text-base text-gray-400">{value.id}</li>
                  <li className="text-lg">
                    {value.name.length > 20
                      ? value.name.substring(0, 20) + "..."
                      : value.name}
                  </li>
                  <li className="text-sm text-gray-500">{value.email}</li>
                  <div className="w-full mt-5 flexc !justify-end gap-3">
                    <ButtonWarning
                      onClick={(event) => {
                        setEdit(value.id);
                        setSending(true);
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
                            value.id,
                            {
                              setSending,
                              setSuccess,
                              setErrors,
                              deleteUser,
                              token,
                              fetchUsers,
                              setUsers,
                            },
                            success?.type == "submitted"
                          );
                      }}
                      disabled={sending}
                      className={`text-sm font-bold !px-0 !py-0 overflow-hidden ${
                        sending && "!opacity-50"
                      }`}
                    >
                      {/* <Delete
                        width={20}
                        height={20}
                        strokeWidth={2.5}
                        className="w-full h-full px-4 py-2"
                      /> */}
                      <div className="w-full h-full px-4 py-2">Delete</div>
                    </ButtonDanger>

                    {/*  */}
                  </div>
                </div>
              </ul>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default UsersContainer;
