import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./component/Header.js";
import  { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { setProductData } from "./redux/productSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch()
  const productData = useSelector( state =>(state.product))
  
  useEffect(() => {
    // Function to fetch data from an API or perform other side effects
    (
      async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}/product`);
          const data = await response.json();
          console.log("data",data)
          dispatch(setProductData(data))
          // setData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    )()
    }, [])

    console.log("product data",productData)
  return (
    <>
    <Toaster/>
      <div>
        <Header />
        <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
