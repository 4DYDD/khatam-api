// Buat file baru, misalnya src/utils/api.js atau src/services/api.js
import axios from "axios";

// Buat instance axios dengan konfigurasi khusus
const api = axios.create({
  baseURL: "http://api-nya.test",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Fungsi untuk mengambil CSRF token
export const fetchCSRFToken = () => {
  return api.get("/api/csrf-token");
};

export const fetchUsers = () => {
  return api.get("/api/users");
};

export const updateUser = (id, formData, token) => {
  return api.put("/api/users/" + id, formData, {
    headers: {
      "X-API-TOKEN": token,
    },
  });
};

export const deleteUser = (id, token) => {
  return api.delete("/api/users/" + id, {
    headers: {
      "X-API-TOKEN": token,
    },
  });
};

// Export instance untuk digunakan di seluruh aplikasi
export default api;
