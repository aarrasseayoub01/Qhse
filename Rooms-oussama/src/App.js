import React, { useContext } from "react"
import Login from "./screens/Login/Login"
import Register from "./screens/Register/Register"
import Navbar from "./components/Navbar/Navbar"
import NewOrganism from "./screens/NewOrganism/NewOrganism"
import Organism from "./screens/Organism/Organism"
import Fournisseurs from "./screens/Fournisseurs/Fournisseurs"
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { AuthContext } from "./Context/authContext";
import Organisms from "./screens/Organisms/Organisms";
import Products from "./screens/Products/Products";
import "./App.css"
import NewProduct from "./screens/NewProduct/NewProduct"
import Product from "./screens/Product/Product"
import Personnels from "./screens/Personnels/Personnels"
import Personnel from "./screens/Personnel/Personnel"
export default function App() {
  const {user, org} = useContext(AuthContext);
  function HandleOrganism() {
    let {id} = useParams();
    return (
      <Organism orgId={id} /> 
    )
  }
  function HandleProduct() {
    let {id} = useParams();
    let {isEdit} = useParams();
    return (
      <Product productId={id} isEdit={isEdit} /> 
    )
  }
  function HandlePersonnel() {
    let {id} = useParams();
    return (
      <Personnel personId={id} /> 
    )
  }

    return(
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
          <Route path="/login" element={org?<Organism/>:(user?<Organisms />:<Login />)} />
          <Route path="/register" element={org?<Organism/>:(user?<Organisms />:<Register />)} />
          <Route path="/main" element={org?<Organism orgId={org._id}/>:(user?<Organisms />:<Login />)} />
          <Route path="/" element={(user?<Organisms />:<Login />)} />
          <Route path="/new-organism" element={org?<Organism />:(user?<NewOrganism />:<Login />)} />
          <Route path="/organism/:id" element={org?<HandleOrganism />:(user?<Organisms/>:<Login />)} />
          <Route path="/new-product" element={org?<NewProduct />:(user?<Organisms/>:<Login />)} />
          <Route path="/products" element={org?<Products />:(user?<Organisms />:<Login />)} />
          <Route path="/product/:id/:isEdit" element={org?<HandleProduct />:(user?<Organisms />:<Login />)} />
          <Route path="/product/:id" element={org?<HandleProduct />:(user?<Organisms />:<Login />)} />
          <Route path="/fournisseurs" element={org?<Fournisseurs />:(user?<Organisms />:<Login />)} />
          <Route path="/personnel" element={org?<Personnels />:(user?<Organisms />:<Login />)} />
          <Route path="/personnel/:id" element={org?<HandlePersonnel />:(user?<Organisms />:<Login />)} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
        
    )
}
