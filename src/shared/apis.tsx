import axios from "axios";
import { getCookie } from "./cookie";

const api = axios.create({
  // axios 버전이 바뀌면서 기존 문법이 안먹히던 이슈 발생
  // headers의 Content-Type와 Accpet 설정 & config.headers 설정
  // baseURL: 'http://localhost:8080/api',
  baseURL: "https://cloud-ih.shop/api",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Accept: "application/json,",
  },
});

api.interceptors.request.use((config: any) => {
  const accessToken = getCookie("Authorization");
  config.headers.Authorization = `${accessToken}`;
  return config;
});

const apis = {
  // LOGIN
  login: (data: { email: string; password: string }) => api.post("/login", data),
  signUp: (data: { email: string; password: string }) => api.post("/signup", data),
  kakaoAuth: (code: string | null) => api.post("/user/kakao/callback", code),

  // HOME
  registerUserInfo: (data: any) => api.post("/user/info/", data),
  getUserInfo: () => api.get("/user/info/"),
  registerUserIdealInfo: (data: any) => api.post("/user/ideal/info", data),
};

export default apis;
