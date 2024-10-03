import React, {useState, useEffect} from 'react'
import "./Dashboard.css";
import config from "../../config"
import { useDispatch, useSelector } from 'react-redux';
import {storeCategories} from "../../store/actions/categoriesAction"
import AddProduct from '../../components/Products/AddProduct';
import EditProduct from '../../components/Products/EditProduct';
import ListProduct from '../../components/Products/ProductList';


const DashboardPage = () => {
  const [name, setName] = useState("")
  const [pic, setPic] = useState("")
  const [showProductOptions, setshowProductOptions] = useState(false)
  const [showAddProductOptions, setAddProductOptions] = useState(false)
  const [showEditProductOptions, setEditProductOptions] = useState(false)
  const [showListProductOptions, setListProductOptions] = useState(false)

  const categoriesAPI = "products/categories";
  const dispatch = useDispatch();
  
  const categories = useSelector((state) => state.categoryData?.categories || []);
    useEffect(() => {
      let userName = localStorage.getItem(("name"))
      let pic = localStorage.getItem(("pic"))
      if(userName){
          setName(userName)
      }
      if(pic){
          setPic(pic)
      }
      storeCategoriesHandler();
    },[])

 
  const storeCategoriesHandler= async () => {
    let token = localStorage.getItem("access_token")

      const response = await fetch(`${config.apiBaseUrl}${categoriesAPI}`, { 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      // console.log(data, "categories");
      if(data){
        dispatch(storeCategories(data));
      }
  }

  const showProductsOption = () => {
    setshowProductOptions(!showProductOptions)
  }

  const addProductFormHandler = () => {
    setAddProductOptions(!showAddProductOptions)
    setListProductOptions(false)
    setEditProductOptions(false)
  }

  const editProductFormHandler = () => {
    setEditProductOptions(!showEditProductOptions)
    setListProductOptions(false)
    setAddProductOptions(false)
  }

  const listProductFormHandler = () => {
    setListProductOptions(!showListProductOptions)
    setEditProductOptions(false)
    setAddProductOptions(false)
  }

  return (
    <>


  <div id="sidebar">
    <h4>Dashboard</h4>
    <ul className="nav flex-column">
      <li className="nav-item">
        <a className="nav-link text-white" href="#">Dashboard</a>
      </li>
      <li className="nav-item">
        <a className="nav-link text-white" onClick={showProductsOption} href="#">Products</a>
        {
          showProductOptions && (
            <ul>
            <li onClick={addProductFormHandler}>Add Product</li>
            <li onClick={editProductFormHandler}>Edit Product</li>
            <li onClick={listProductFormHandler}>List Product</li>
          </ul>
          )
        }
       
      </li>
    </ul>
  </div>


  <div id="content">
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">Welcome! {name}</a>
      <div className="collapse navbar-collapse justify-content-end">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#">
              <img src={pic} alt="Profile" class="profile-pic" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    {
      showAddProductOptions &&(
        <AddProduct />
      )
    }
    {
      showEditProductOptions &&(
        <EditProduct />
      )
    }
    {
      showListProductOptions &&(
        <ListProduct />
      )
    }
  </div>

  </>
  )
}

export default DashboardPage
