import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import program from "../../assets/program.gif";
import { useCookies } from "react-cookie";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const response = await axios.get("/login", {
        params: { username: email, password: pass },
      });

      if (response.data.error) {
        setError(response.data.error);
        setSuccess("");
      } else {
        setCookie("Token", response.data[0].auth_token);
        setError("");
        setSuccess("Login Successful!");

        setTimeout(() => {
          navigate("/topics");
        }, 500);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An unexpected error occurred");
    }
  };

  return (
    <>
      <div className="sm:h-screen sm:flex sm:justify-center sm:items-start sm:flex-col sm:bg-gradient-to-r from-neutral-300 to-stone-400">
        <div className="flex md:justify-center md:items-center md:w-1/2 h-screen items-center justify-center">
          <div className="border-2 border-slate-950 border-solid rounded-md bg-white  shadow-md py-5  h-3/6 md:h-auto p-7 md:w-3/5 ">
            <h1 className="text-3xl font-bold text mt-2 text-slate-900 flex justify-center">
              Sign in
            </h1>

            <form
              onSubmit={handleSubmit}
              className="px-5 py-5 flex flex-col text-md font-bold gap-3"
            >
              <TextField
                size="30"
                InputLabelProps={{ required: false }}
                required
                type="text"
                label="Email"
                variant="outlined"
                autoComplete="off"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <TextField
                InputLabelProps={{ required: false }}
                required
                type="password"
                name="psw"
                label="Password"
                variant="outlined"
                autoComplete="off"
                onChange={(event) => {
                  setPass(event.target.value);
                }}
              />
              <div className="relative mt-2">
                {error && (
                  <Alert
                    severity="error"
                    variant="filled"
                    className="absolute top-0 left-0 right-0 justify-center"
                  >
                    <p className=" font-bold">{error}</p>
                  </Alert>
                )}
              </div>
              <div className="relative mt-2">
                {success && (
                  <Alert
                    severity="success"
                    variant="filled"
                    className="absolute top-0 left-0 right-0 justify-center"
                  >
                    <p className=" font-bold">{success}</p>
                  </Alert>
                )}
              </div>
              <div className="flex justify-center mt-14">
                <button className="text-lg p-2 bg-white text-black rounded-md w-32 border-2 hover:bg-black hover:text-white border-black ">
                  Login
                </button>
              </div>
            </form>
            <p className=" flex justify-center mt-1 font-bold text-lg">
              New User?&nbsp;{" "}
              <Link
                to="/signup"
                className="text-green-600 hover:text-sky-600 hover:underline"
              >
                Signup here!
              </Link>{" "}
            </p>
          </div>
        </div>
        <div
          className="absolute top-0 right-0 bottom-0 left-2/4 z-0 w-2/4 hidden md:block"
          style={{
            backgroundImage: `url(${program})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
    </>
  );
};

export default Login;
