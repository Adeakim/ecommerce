import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginSignupAnimation from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import {imagetoBase64} from '../utility/imagetoBase64'
import toast from "react-hot-toast";



const Signup = () => {
  const navigate = useNavigate()
  

  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: ""
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

  // console.log(data);
  console.log(process.env.REACT_APP_BASE_URL)
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const {firstName,email, password, confirmPassword} = data
    if (firstName && email && password && confirmPassword){
      if (password === confirmPassword){
        const fetchData = await fetch(`${process.env.REACT_APP_BASE_URL}/signup`,{
          method: "POST",
          headers: {
            "Content-type":"application/json",
          },
          body: JSON.stringify(data)
        })
        const response = await fetchData.json()
        console.log(response)

        toast(response.message)
        if (response.alert === true){
             navigate("/login")
        }
       
      }
      else{
        alert("password and confirm password must be the same")
      }
    }
    else{
      alert("Please enter the required fields")
    }
    
  }
  const handleUploadImage = async(e) => {
    // console.log(e.target.files[0])
    const data = await imagetoBase64(e.target.files[0])
    // console.log(data)
    setData((prev)=> {
      return (
        {
          ...prev,
          image: data
        }
      )
     
    })
  }
  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
        {/* <h1 className="text-center text-2xl font-bold">Sign up</h1> */}
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative  ">
          <label htmlFor="profileImage">
          <img src={data.image ? data.image :loginSignupAnimation} alt="" className="w-full h-full"/>
          <div className="absolute bottom-0 h-1/3 bg-slate-400 w-full opacity-50 text-center cursor-pointer">
            <p className="text-sm p-1">Upload</p>
          </div>
          <input type="file" id="profileImage" accept="image/*" className="hidden" onChange={handleUploadImage}/>
          </label>
        </div>
        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type={"text"}
            id="firstName"
            name="firstName"
            value={data.firstName}
            onChange={handleChange}
            className=" mt-1 mb-2 w-full px-2 py-1 bg-slate-200 rounded focus-within:outline-red-300"
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type={"text"}
            id="lastName"
            name="lastName"
            value={data.lastName}
            onChange={handleChange}
            className=" mt-1 mb-2 w-full px-2 py-1 bg-slate-200 rounded focus-within:outline-red-300"
          />

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
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type={"text"}
            id="confirmPassword"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={handleChange}
            className=" mt-1 mb-2 focus-within:outline focus-within:outline-red-300 w-full px-2 py-1 bg-slate-200 rounded"
          />

          <button
            type="submit"
            className="w-full max-w-[150px] mx-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium py-1 rounded-full mt-4"
          >
            Signup
          </button>
        </form>
        <p className="text-left text-sm mt-2">
          Already have an account ?{" "}
          <Link to={"/login"} className="text-red-600 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
