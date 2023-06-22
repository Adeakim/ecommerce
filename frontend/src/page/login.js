import React, { useState } from "react";
import { Link} from "react-router-dom";
import loginSignupAnimation from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux"
import { loginRedux } from "../redux/userSlice";



const Login = () => {
  const navigate = useNavigate()
  const userData = useSelector(state => state)
  const dispatch = useDispatch()
  console.log(userData.user)
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  console.log(data);
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    if (email && password) {
      const fetchData = await fetch(`${process.env.REACT_APP_BASE_URL}/login`,{
        method: "POST",
        headers: {
          "Content-type":"application/json",
        },
        body: JSON.stringify(data)
      })
      const response = await fetchData.json()
      console.log(response)

      toast(response.message)
      if (response.alert){
        dispatch(loginRedux(response))
        setTimeout(()=>{
          navigate("/")
        }, 1000)
        
      }
      console.log(userData)
        // alert("success");
      }
     else {
      alert("Please enter the required fields");
    }
  };
  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
        {/* <h1 className="text-center text-2xl font-bold">Sign up</h1> */}
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto ">
          <img src={loginSignupAnimation} alt="" />
        </div>
        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type={"text"}
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className=" mt-1 mb-2 w-full px-2 py-1 bg-slate-200 rounded focus-within:outline-red-300"
          />

          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1 mt-1 mb-2 bg-slate-200 rounded focus-within:outline focus-within:outline-red-300 ">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="  w-full  bg-slate-200 border-none outline-none "
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full max-w-[150px] mx-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium py-1 rounded-full mt-4"
          >
            Login
          </button>
        </form>
        <p className="text-left text-sm mt-2">
         Don't have an account ?{" "}
          <Link to={"/signup"} className="text-red-600 underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
