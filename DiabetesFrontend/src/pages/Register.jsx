import React, { useEffect, useState } from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import LoginImg from "../assets/Authentication/login2.jpg";
import Logo from "../assets/Authentication/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { signup  } from "../store/actions/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = ({signup}) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate()
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [formData,setFormData] = useState({
    first_name : "",
    last_name : "",
    email: "",
    password : "",
    re_password: "",
  })

  const {first_name,last_name,email,password,re_password}=formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
      e.preventDefault();
      if (password === re_password) {
        try {
          const response = await signup(first_name, last_name, email, password);
          if (response.status == 201){
            navigate('/login')
          }
          toast.success
        } catch (error) {
          console.error("Signup failed:", error);
        }
      } else {
        toast.error("Password doesn't match");
      }
    };


  // Function to toggle dark mode
  const toggleDarkMode = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark"; // Set dark mode when it's detected
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light"; // Set light mode otherwise
      setIsDarkMode(false);
    }
  };

  useEffect(() => {
    toggleDarkMode();
  }, []);

  const handleDarkModeToggle = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setIsDarkMode(true);
    }
  };

  return (
    <div className="gradient-form h-screen bg-neutral-300 dark:bg-neutral-700">
      <div
        className={`gradient-form  ${
          isDarkMode ? "dark:bg-emerald-700" : "bg-emerald-200"
        }`}
      >
        {/* ... (Rest of your JSX) */}
      </div>
      <div className="min-h-screen flex justify-center items-center px-20 mx-auto max-w-screen-2xl">
        <div className="g-6 flex    text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* Left column container */}
                <div className="px-4 md:px-0 lg:w-6/12">
                  {/* DARK MODE BUTTON */}
                  <button
                    onClick={handleDarkModeToggle}
                    className={`px-4 py-3 ${
                      isDarkMode
                      ? "bg-primary-600 text-white"
                      : "bg-white text-whit-800 dark:bg-neutral-800 dark:text-neutral-200"
                    }  ext-center rounded hover:bg-primary-700  focus:outline-none  focus:ring-primary-200 dark:focus:ring-primary-400`}
                    >
                    {isDarkMode ? <BsFillSunFill /> : <BsFillMoonFill />}
                  </button>

                  <div className="md:mx-5 md:p-12">
                    {/* Logo */}
                    <div className="text-center">
                      <img className="mx-auto w-48" src={Logo} alt="logo" />
                      <h4 className=" mt-1 pb-1 text-xl font-semibold">
                        Stay healthy
                      </h4>
                    </div>

                      <p className="mb-4 text-center text-neutral-800 dark:text-neutral-200">
                        Please login to your account
                      </p>
                      {/* Username input */}
                      
                      <form onSubmit={(e) => onSubmit(e)}>
                      <div className="grid grid-cols-2">
                      <div className="mb-4 mr-2">
                        <input
                          type="text"
                          className="block w-full px-4 py-2 rounded border border-neutral-400 dark:border-neutral-600 bg-transparent focus:outline-none focus:ring focus:border-primary-500 dark:focus:border-primary-500 placeholder-neutral-500 dark:placeholder-neutral-300 text-neutral-700 dark:text-neutral-300 "      
                          aria-required
                          name = "first_name"
                          placeholder="First Name"
                          value={first_name}
                         autoComplete="off" 

                          onChange={(e) => onChange(e)}
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          type="text"
                          className="block w-full px-4 py-2 rounded border border-neutral-400 dark:border-neutral-600 bg-transparent focus:outline-none focus:ring focus:border-primary-500 dark:focus:border-primary-500 placeholder-neutral-500 dark:placeholder-neutral-300 text-neutral-700 dark:text-neutral-300"      
                          aria-required
                          name = "last_name"
                          placeholder="Last Name"
                         autoComplete="off" 

                          value={last_name}
                          onChange={(e) => onChange(e)}

                        />
                      </div>

                      </div>
                      
                      <div className="mb-4">
                        <input
                          type="email"
                          className="block w-full px-4 py-2 rounded border border-neutral-400 dark:border-neutral-600 bg-transparent focus:outline-none focus:ring focus:border-primary-500 dark:focus:border-primary-500 placeholder-neutral-500 dark:placeholder-neutral-300 text-neutral-700 dark:text-neutral-300"
                          name="email"
                         autoComplete="off" 

                          placeholder="Email"
                          value={email}
                          onChange={(e) => onChange(e)}
                        />
                      </div>

                      {/* Password input */}
                      <div className="mb-4">
                        <input
                          type="password"
                          className="block w-full px-4 py-2 rounded border border-neutral-400 dark:border-neutral-600 bg-transparent focus:outline-none focus:ring focus:border-primary-500 dark:focus:border-primary-500 placeholder-neutral-500 dark:placeholder-neutral-300 text-neutral-700 dark:text-neutral-300"
                          placeholder="Password"
                           name="password"
                          value={password}
                                                   autoComplete="off" 

                          onChange={(e) => onChange(e)}
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          type="password"
                          className="block w-full px-4 py-2 rounded border border-neutral-400 dark:border-neutral-600 bg-transparent focus:outline-none focus:ring focus:border-primary-500 dark:focus:border-primary-500 placeholder-neutral-500 dark:placeholder-neutral-300 text-neutral-700 dark:text-neutral-300"
                          value={re_password}
                                                   autoComplete="off" 

                          name="re_password"
                          onChange={(e) => onChange(e)}
                          placeholder="Confirm Password"
                        />
                      </div>

                      {/* Submit button */}
                      <div className="mb-6 text-center">
                        <button type="submit" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-10 rounded-full shadow-md transition-transform transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-300">
                          Register
                        </button>
                      </div>
                      </form>

                      
                      <div className="flex items-center justify-between">
                        <p className="text-neutral-800 dark:text-neutral-200">
                          Already have an account?
                        </p>
                        <Link
                          to="/login"
                          className="px-4 py-2 bg-transparent border border-danger text-danger-600 rounded hover:bg-danger-100 hover:text-danger-700 focus:outline-none focus:border-danger-600 focus:text-danger-600 dark:border-danger-400 dark:hover:bg-danger-100 dark:hover:text-danger-700 dark:focus:border-danger-400 dark:focus:text-danger-600"
                        >
                          Login
                        </Link>
                      </div>
                  </div>
                </div>

                {/* Right column container with background and description */}
                <div
                  className="hidden lg:flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    backgroundImage: `url(${LoginImg})`,
                    backgroundSize: "cover",
                  }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      We are more than just a company
                    </h4>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
<ToastContainer/>
    </div>
  );
};

export default connect(null, { signup })(Register);
