import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap';
import { AiFillCamera } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import { AuthContext } from '../../Context/authContext';
import Personnels from '../../components/Personnels/Personnel';

const Personnel = () => {
  const nom = useRef();
  const prenom = useRef();
  const naissance = useRef();
  const cin = useRef();
  const metier = useRef();
  const zone_affecte = useRef();
  const photo = useRef();
  
  const { user } = useContext(AuthContext);

  const [persons, setPersons] = useState();
  const [picture, setPicture] = useState('');

  const handleUpload = async (e) => {
    const pic=e.target.files[0];
    const data = new FormData();
    const fileName = Date.now() + pic.name;
    data.append("name", fileName);
    data.append("file", pic);
    try {
        await axios.post("http://localhost:5000/api/upload/image", data);
    } catch (err) {}
    setPicture(fileName)
  }
  function deleteImage() {
    setPicture('')
  }
  const submitPersonnel = async() => {
    try{
      const personnel = {
          nom: nom.current.value, 
          prenom: prenom.current.value, 
          naissance: naissance.current.value, 
          cin: cin.current.value,
          metier: metier.current.value,
          zone_affecte: zone_affecte.current.value,
          photo: picture
      }
      await axios.post("http://localhost:5000/api/personnel/create", personnel);
      setPersons(prev=>[...prev, personnel])
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    const fetchPersons = async () => {
      if (user) {
        const res = await axios.get("http://localhost:5000/api/personnel/a/" + user._id);
        setPersons(res.data);
      }
    };
    fetchPersons();
  }, [user._id]);

  const personnels = persons && persons.map((x, i) =>{
    return(
      <Personnels
        num={i+1}
        key={x._id}
        Person={x}
        // handleClick={handleClick}
      />
    )
  });

  return (
    <main className="background vertical-center new-organism-main" >
        <div className="container p-5 rounded">
            <div className="row">
                <div className=" col-9 col-sm-12 col-md-5 col-lg-6 d-flex b justify-content-center align-items-center row">
                  <h1>Liste des Personnels</h1>
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th className="text-center" scope="col-4">Nom</th>
                        <th className="text-center" scope="col-4">Prénom</th>
                        <th className="text-center" scope="col-4">Date de Naissance</th>
                        <th className="text-center" scope="col-4">CIN</th>
                        <th className="text-center" scope="col-4">Métier</th>
                        <th className="text-center" scope="col-4">Zone affecté</th>
                      </tr>
                    </thead>
                    <tbody>
                      {personnels}
                    </tbody>
                  </table>
                </div>
                <div className="col-9 col-sm-12 col-md-4 col-lg-3 register-a" style={{maxWidth: "fit-content"}}>
                    <h1 className="text-prime pb-5">Ajouter un Fournisseur</h1>
                    <form className="form-group">
                        <input className="form-control m-2" placeholder="Nom" ref={nom}/>
                        <input className="form-control m-2" placeholder="Prénom" ref={prenom} />
                        <div className="form-control m-2 col-12 col-sm-6 col-md-4 col-lg-4 d-flex justify-content-center align-items-center" >
                            {picture!==''
                            ? (<div className="d-flex flex-column align-items-center">
                                <div className="image-wrap">
                                    <img className="col-9" id="outlined-name" src={"http://localhost:5000/images/"+picture} name="photos" />
                                    <FaTimes className='close' onClick={deleteImage} />
                                </div>
                            </div>
                            )
                          : <b className='m-2'>Uploader une photo</b>}
                            <Button className="col-4">
                                <label variant="contained" component="label">
                                    <AiFillCamera />
                                    <input hidden accept="image/*" type="file" onChange={(e) => handleUpload(e)} ref={photo} />
                                </label>
                            </Button>
                        </div>
                        <input className="form-control m-2" type="date" placeholder="Date de Naissance" ref={naissance} />
                        <input className="form-control m-2" placeholder="CIN" ref={cin} />
                        <input className="form-control m-2" placeholder="Métier" ref={metier} />
                        <input className="form-control m-2" placeholder="Zone affecté" ref={zone_affecte} />
                        <div className="d-flex justify-content-end m-2">
                        <Button className="bg-prime" onClick={submitPersonnel}>Enregister</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
  )
}

export default Personnel