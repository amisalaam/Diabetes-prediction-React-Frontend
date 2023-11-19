import React, { useEffect, useState } from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import LoginImg from "../assets/Authentication/login2.jpg";
import Logo from "../assets/Authentication/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../store/actions/auth";
import { toast, ToastContainer } from "react-toastify";



const Login = ({login}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const navigate = useNavigate()

  const [formData,setFormData] = useState({
    email : "",
    password : ""
  })

  const {email,password} = formData;

  const onChange = (e) => 
    setFormData({...formData,[e.target.name]:e.target.value })

  
    const onSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await login(email, password);
        console.log(response)
        if (response.status ==200){
          navigate('/')
        }
        
      } catch (error) {
        console.error("Login failed:", error);
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

    <div className="gradient-form  bg-neutral-300 dark:bg-neutral-700 ">
       
      <div
        className={`gradient-form  ${
          isDarkMode ? "dark:bg-emerald-700" : "bg-emerald-200"
        }`}
      >
        {/* ... (Rest of your JSX) */}
      </div>
      <div className="min-h-screen flex justify-center items-center px-20 mx-auto max-w-screen-2xl ">
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
                    <form onSubmit={onSubmit}>
                      {/* Username input */}
                      <div className="mb-4">
                        <input
                          type="email"
                          value={email}
                          name="email"
                         autoComplete="off" 

                          required
                          onChange={(e) => onChange(e)}
                          className="block w-full px-4 py-2 rounded border border-neutral-400 dark:border-neutral-600 bg-transparent focus:outline-none focus:ring focus:border-primary-500 dark:focus:border-primary-500 placeholder-neutral-500 dark:placeholder-neutral-300 text-neutral-700 dark:text-neutral-300"
                          id="exampleFormControlInput1"
                          placeholder="Email"
                        />
                      </div>

                      {/* Password input */}
                      <div className="mb-4">
                        <input
                         name="password"
                         value={password}
                         autoComplete="off" 
                         onChange={(e) => onChange(e)}
                          type="password"
                          className="block w-full px-4 py-2 rounded border border-neutral-400 dark:border-neutral-600 bg-transparent focus:outline-none focus:ring focus:border-primary-500 dark:focus:border-primary-500 placeholder-neutral-500 dark:placeholder-neutral-300 text-neutral-700 dark:text-neutral-300"
                          placeholder="Password"
                        />
                      </div>

                      {/* Submit button */}
                      <div className="mb-6 text-center">
                        <button type="submit" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-10 rounded-full shadow-md transition-transform transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-300">
                          Log In
                        </button>
                      </div>
                      </form>

                      {/* Forgot password link */}
                      <div className="text-center mb-4">
                        <a
                          href="#!"
                          className="text-primary-500 hover:underline"
                        >
                          Forgot password?
                        </a>
                      </div>

                      {/* Register button */}
                      <div className="flex items-center justify-between">
                        <p className="text-neutral-800 dark:text-neutral-200">
                          Don't have an account?
                        </p>
                        <Link
                          to='/register'
                          className="px-4 py-2 bg-transparent border border-danger text-danger-600 rounded hover:bg-danger-100 hover:text-danger-700 focus:outline-none focus:border-danger-600 focus:text-danger-600 dark:border-danger-400 dark:hover:bg-danger-100 dark:hover:text-danger-700 dark:focus:border-danger-400 dark:focus:text-danger-600"
                        >
                          Register
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

export default connect(null, { login })(Login);

