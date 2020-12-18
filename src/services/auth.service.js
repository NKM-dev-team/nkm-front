import axios from "axios";

const API_URL = "https://krzysztofruczkowski.pl:8080/api/";

// const register = (username, email, password) => {
//   return axios.post(API_URL + "signup", {
//     username,
//     email,
//     password,
//   });
// };

const login = (login, password) => async (login, password) => {
    let data = {
        login: login,
        password: password,
    };

    try {
        const result = await axios.post(API_URL + 'login', data)
        const token = result.data;
        console.log('logged in');
        console.log(token);
        localStorage.setItem("token", token);
        localStorage.setItem("username", login);
    } catch (error) {
        console.warn(error.response.data);
    }
}

const logout = () => {
  localStorage.removeItem("username");
  localStorage.removeItem("token");
};

const getCurrentUser = () => {
  return localStorage.getItem("username");
};

export default {
//   register,
  login,
  logout,
  getCurrentUser,
};
