import React, {useState, useEffect} from 'react'
import "./Dashboard.css";
import config from "../../config"
import { useDispatch, useSelector } from 'react-redux';
import {storeCategories} from "../../store/actions/categoriesAction"
import AddProduct from '../../components/Products/AddProduct';
// import EditProduct from '../../components/Products/EditProduct';
import ListProduct from '../../components/Products/ProductList';
import ReportList from "../../components/Products/ReportList";
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const DashboardPage = () => {
  const [name, setName] = useState("")
  const [pic, setPic] = useState("")
  const [showProductOptions, setshowProductOptions] = useState(false)
  const [showAddProductOptions, setAddProductOptions] = useState(false)
  const [showEditProductOptions, setEditProductOptions] = useState(false)
  const [showListProductOptions, setListProductOptions] = useState(false)
  const [showReportList, setshowReportList] = useState(false)
  const navigate = useNavigate();

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
    setshowReportList(false)
  }

  const editProductFormHandler = () => {
    setEditProductOptions(!showEditProductOptions)
    setListProductOptions(false)
    setAddProductOptions(false)
    setshowReportList(false)
  }

  const listProductFormHandler = () => {
  navigate('/dashboard/products')
//    setListProductOptions(!showListProductOptions)
//    setEditProductOptions(false)
//    setAddProductOptions(false)
//    setshowReportList(false)
  }

  const showReportListHandler = () => {
    setshowReportList(!showReportList)
    setEditProductOptions(false)
    setAddProductOptions(false)
    setListProductOptions(false)
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
            <ul className="dashboard-li">
            <li className="dashboard-li" onClick={addProductFormHandler}>Add Product</li>
            {/* <li onClick={editProductFormHandler}>Edit Product</li> */}
            <li className="dashboard-li" onClick={listProductFormHandler}>List Product</li>
            <li className="dashboard-li" onClick={showReportListHandler}>Report List</li>
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
          <li className="nav-item ">
            <a className="nav-link dashboard-li " href="#">
              <img src={pic} alt="Profile" className="profile-pic" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    <div className="content">
        {/* Outlet is where the page-specific content will be rendered */}
        <Outlet />
      </div>
    {
      showAddProductOptions &&(
        <AddProduct />
      )
    }
    {/* {
      showEditProductOptions &&(
        <EditProduct />
      )
    } */}
    {
      showListProductOptions &&(
        <ListProduct />
      )
    }
     {
            showReportList &&(
            <ReportList />
    )
    }
  </div>

  </>
  )
}

export default DashboardPage
