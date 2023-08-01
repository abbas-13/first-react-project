import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

import { AuthContext } from "../context/authContext";

export const LoginPage = () => {
  const { login, setUser, token, setToken } = useContext(AuthContext);

  const [errMsg, setErrMsg] = useState();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-5/12 h-4/6 bg-white shadow-md p-14 rounded-lg">
        <div className="text-xl min-h-1.625 text-red-600 my-4">{errMsg}</div>
        <form
          onSubmit={handleSubmit(async (data) => {
            const error = await login(data.username, data.password);

            if (error) {
              setErrMsg(error);
            } else {
              navigate("/");
            }
          })}
        >
          <div className="mb-6">
            <label
              className="block mb-6 font-semibold text-2xl"
              htmlFor="username"
            >
              Username <sup className="text-red-600">*</sup>
            </label>
            <input
              className="w-full px-6 py-4 border border-gray-300 rounded text-2xl"
              type="text"
              id="username"
              {...register("username", {
                required: "This field is required",
              })}
            />
            <div className="text-red-600 min-h-1.625 mt-2 text-xl">
              {errors?.username?.message}
            </div>
          </div>
          <div className="mb-6">
            <label
              className="block mb-6 font-semibold text-2xl"
              htmlFor="password"
            >
              Password <sup className="text-red-600">*</sup>
            </label>
            <input
              className="w-full px-6 py-4 border border-gray-300 rounded text-2xl"
              type="password"
              id="password"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 4,
                  message:
                    "Please enter a valid password of minimum 8 characters",
                },
              })}
            />
            <div className="text-red-600 min-h-1.625 mt-2 text-xl">
              {errors?.password?.message}
            </div>
          </div>
          <div className="w-100% text-center">
            <input
              type="submit"
              className="w-fit bg-blue-500 text-2xl hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg"
            />
          </div>
        </form>

        <div className="mt-4 flex justify-center">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              setUser(jwtDecode(credentialResponse.credential));
              setToken(credentialResponse.credential);

              localStorage.setItem("authToken", credentialResponse.credential);
              navigate("/");
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </div>
    </div>
  );
};
