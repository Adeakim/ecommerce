import React, { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { imagetoBase64 } from "../utility/imagetoBase64";
import { toast } from "react-hot-toast";


const NewProduct = () => {
const [data, setData] = useState({
  name: "",
  image: "",
  description: "",
  category: "",
  price: ""
})
console.log(data)

  const uploadImage = async(e) => {
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
  };
  const handleChange = (e) => {
    const {name, value} = e.target
    setData(prev=>{
      return {
        ...prev,
        [name] : value
      }
   
    })

  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(data)
    const fetchData = await fetch(`${process.env.REACT_APP_BASE_URL}/product`,{
      method: "POST",
      headers: {
        "Content-type":"application/json",
      },
      body: JSON.stringify(data)
    })
    const response = await fetchData.json()
    console.log(response)
    if (response.alert===true){
      toast("uploaded successfully")
    }else{
      toast(response.message)
    }
  }

  return (
    <div className="p-4">
      <form className="m-auto w-full max-w-md shadow flex flex-col p-3 bg-white" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type={"text"} id="name" name="name" className="bg-slate-200 p-1 my-1" value={data.name} onChange={handleChange}/>

        <label htmlFor="category">Category</label>
        <select className="bg-slate-200 p-1 my-1" id="category" name="category" value={data.category} onChange={handleChange}>

          <option value={"others"}>Select Category</option>
          <option value={"fruits"}>Fruits</option>
          <option  value={"vegetable"}>Vegetable</option>
          <option  value={"icecream"}>Ice Cream</option>
          <option  value={"dosa"}>Dosa</option>
          <option value={"pizza"}>Piza</option>
          <option  value={"cake"}>Cake</option>
          <option  value={"rice"}>Rice</option>
          <option  value={"burger"}>Burger</option>
        </select>
        <label htmlFor="image">Image
        <div className="h-40 w-full bg-slate-200 rounded flex items-center justify-center cursor-pointer">
          {
            data.image ?  <img src={data.image} alt="" className="h-full" /> : <span className="text-4xl">
            <BsCloudUpload />
          </span>
          }
         
          
          <input type="file" id="image" accept="image/*" name="image" className="hidden " onChange={uploadImage}/>
        </div>
        </label>

        <label htmlFor="price">Price</label>
        <input type={"text"} id="price" name="price" className="bg-slate-200 p-1 my-1"   value={data.price} onChange={handleChange}/>

        <label htmlFor="description">Description</label>
        <textarea
          rows={3}
          id="description"
          name="description"
          value={data.description}
          onChange={handleChange}
          className="bg-slate-200 p-1 my-1 resize-none"
        />

        <button
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white text-large font-medium drop-shadow my-2"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
