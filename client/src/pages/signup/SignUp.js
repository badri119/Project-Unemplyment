import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import program from "../../assets/program.gif";
import { useCookies } from "react-cookie";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setConfirmPass] = useState("");
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (pass !== cpass) {
        setError("Passwords do not match");
        return;
      }

      //API call from backend goes here
      const action = axios.get("");
      // console.log(action.payload);
      setCookie("Token", action.payload.Token);
      setCookie("UserId", action.payload.UserId);

      // Check if the action contains an error
      if (action.error) {
        setError(action.payload); // Set error message received from backend
      } else {
        // If registration is successful, navigate to details page and setcookie:
        // console.log(action.payload.token);

        navigate("/topics"); //set route to whatever the login requires
      }
    } catch (err) {
      // Handle other unexpected errors
      console.error("Error during registration:", err);
      setError("An unexpected error occurred");
    }
  };

  return (
    <>
      <div className="sm:h-screen sm:flex sm:justify-center sm:items-start sm:flex-col sm:bg-gradient-to-r from-neutral-300 to-stone-400 ">
        <div className="flex md:justify-center md:items-center md:w-1/2 h-screen items-center justify-center">
          <div className="border-2 border-slate-950 border-solid rounded-md bg-white  shadow-md py-5  md:h-auto p-7 md:w-3/5  h-2/3">
            <h1 className="text-3xl font-bold text mt-2 text-slate-900 flex justify-center">
              Sign Up
            </h1>

            <form
              onSubmit={handleSubmit}
              className="px-5 py-5 flex flex-col text-md font-bold gap-3"
            >
              <TextField
                InputLabelProps={{ required: false }}
                size="30"
                required
                type="email"
                pattern="[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+(\.[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+)*@([a-zA-Z0-9_][-a-zA-Z0-9_]*(\.[-a-zA-Z0-9_]+)*\.([cC][oO][mM]))(:[0-9]{1,5})?"
                label="Email"
                variant="outlined"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <TextField
                InputLabelProps={{ required: false }}
                size="30"
                required
                type="text"
                label="Username"
                variant="outlined"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
              <TextField
                InputLabelProps={{ required: false }}
                required
                type="password"
                name="password"
                label="Password"
                variant="outlined"
                onChange={(event) => {
                  setPass(event.target.value);
                }}
              />
              <TextField
                InputLabelProps={{ required: false }}
                required
                type="password"
                name="repeatpassword"
                label="Retype Password"
                variant="outlined"
                onChange={(event) => {
                  setConfirmPass(event.target.value);
                }}
              />
              <div className="relative mt-2 ">
                {error && (
                  <Alert
                    severity="error"
                    variant="filled"
                    className="absolute top-0 left-0 right-0 flex justify-center"
                  >
                    <p className="font-bold">{error}</p>
                  </Alert>
                )}
              </div>
              <div className="flex justify-center mt-14">
                <button className="text-lg p-2 bg-white text-black rounded-md w-32 border-2 hover:bg-black hover:text-white border-black">
                  Register
                </button>
              </div>
            </form>
            <p className=" flex justify-center mt-1 font-bold text-lg">
              Have an account?&nbsp;{" "}
              <Link
                to="/login"
                className="text-green-600 hover:text-sky-600 hover:underline"
              >
                Sign in here!
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

export default SignUp;
