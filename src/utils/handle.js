const closeEditMenu = (dom) => {
  document.getElementById(dom).classList.remove("animate-slide-down");
  document.getElementById(dom).classList.add("animate-slide-up");
};

export const handleCloseUpdateForm = (
  dom,
  { setFormUpdateData, setSending, setErrors, setEdit }
) => {
  closeEditMenu(dom);
  setFormUpdateData({
    name: "",
    email: "",
    password: "",
  });

  setSending(false);

  setTimeout(() => {
    setErrors({});
    setEdit(null);
  }, 300);
};

export const handleSubmit = (
  event,
  {
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
  }
) => {
  event.preventDefault();

  setSending(true);
  addUser(formData, token)
    .then((responsenya) => {
      fetchUsers().then((response) => {
        const success = { ...responsenya.data, type: "submitted" };
        setSuccess(success);
        setErrors({});
        setUsers(response.data);
        setSending(false);
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        clearInputData();
      });
    })
    .catch(({ response }) => {
      const errors = response.data.errors;
      setErrors({ ...errors, type: "notsubmitted" });
      setSuccess({});
      setSending(false);
    });
};

export const handleDelete = (
  event,
  dom,
  id,
  {
    setSending,
    setSuccess,
    setErrors,
    deleteUser,
    token,
    fetchUsers,
    setUsers,
  },
  isLast
) => {
  event.preventDefault();

  setSending(true);

  deleteUser(id, token)
    .then((responsenya) => {
      fetchUsers().then((response) => {
        console.log(dom);
        console.log(isLast);
        document.getElementById(dom).classList.add("animate-scale-down");
        console.log(isLast);
        console.log(document.getElementById(dom));

        const success = responsenya.data;
        setSuccess(success);

        setTimeout(() => {
          setUsers(response.data);
          setSending(false);
        }, 10000);
      });
    })
    .catch(({ response }) => {
      const errors = response.data.errors;
      setErrors(errors);
      setSuccess({});
      setSending(false);
    });
};

export const handleUpdate = (
  event,
  dom,
  id,
  {
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
  }
) => {
  event.preventDefault();

  if (zeroEditField) return;

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
        const success = responsenya.data;
        setSuccess({ ...success, type: "updated" });
        setErrors({});

        setFormUpdateData({
          name: "",
          email: "",
          password: "",
        });

        handleCloseUpdateForm(`edit-${dom}`, {
          setFormUpdateData,
          setSending,
          setErrors,
          setEdit,
        });

        setTimeout(() => {
          setUsers(response.data);
          setSending(false);
        }, 200);
      });
    })
    .catch(({ response }) => {
      const errors = response.data.errors;
      setFormUpdateData({
        name: "",
        email: "",
        password: "",
      });
      setErrors({ ...errors, type: "notupdated" });
      setSuccess({});
      // setSending(false);
    });
};
