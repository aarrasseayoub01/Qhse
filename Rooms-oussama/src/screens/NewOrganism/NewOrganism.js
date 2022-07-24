import React, { useRef, useContext } from "react";
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import {Button} from 'react-bootstrap';
import { AuthContext } from "../../Context/authContext";

export default function NewOrganism() {
    const name = useRef();
    const site_num = useRef();
    const creation_time = useRef();
    const domaines = useRef();
    const tel = useRef();
    const adresse = useRef();
    const carte = useRef();
    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const userOrganism= async (e)=>{
        e.preventDefault();
        const organism = {user:user._id,name:name.current.value, site_num:site_num.current.value,creation_time:creation_time.current.value,domaines:domaines.current.value,tel:parseInt(tel.current.value),Adresse:adresse.current.value,Carte:carte.current.value}
        try{
            await axios.post("http://localhost:5000/api/organism/create",organism);
            navigate("/main");

        }catch(err){
                console.log(err)        
        }
    }
   
    return(
        <main className="jumbotron vertical-center new-organism-main" >
            <div className="container p-5 rounded">
            <div className="row">
                <div className=" col-9 col-sm-12 col-md-5 col-lg-5 d-flex b justify-content-center align-items-center row">
                    <img className="col-12" src="https://media.istockphoto.com/photos/imge-of-mint-picture-id619514634?k=20&m=619514634&s=612x612&w=0&h=0qd6aFtslmii-nfCiBxxIBQmAOqVVwm_iRq_vwYLAWw=" height="328" width="189"></img>
                    <h1 className="text-prime">Improve Your Efficiency and Productivity</h1>
                </div>
                <div className="col-9 col-sm-12 col-md-4 col-lg-4 register-a" style={{maxWidth: "fit-content"}}> 
                    <h1 className="text-prime pb-5">Add New Company</h1>
                    <form className="form-group ">
                        <input className="form-control m-2" placeholder="Company Name" ref={name}/>
                        <input className="form-control m-2" placeholder="Sites" ref={site_num} />
                        <input className="form-control m-2" type="date" placeholder="Creation Time" ref={creation_time} />
                        <input className="form-control m-2" placeholder="Domaine" ref={domaines} />
                        <input className="form-control m-2" placeholder="Tel" ref={tel} />
                        <input className="form-control m-2" placeholder="Adresse" ref={adresse} />
                        <input className="form-control m-2" placeholder="Location" ref={carte} />
                        <div className="d-flex justify-content-end m-2">
                        <Button className="bg-prime" onClick={userOrganism} >Enregister</Button>
                        </div>
                    </form>
                    
                </div>
            </div>
            </div>
        </main>
    )
}