import React, { useState } from "react";
import "../../style.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from "react-router-dom";

const NavbarDocuments = ({ brand }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');
  const {uuid}= useParams();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('name', name);
    formData.append('status', status);
    formData.append('type', type);

    try {
      const response = await axios.post(`http://localhost:3001/documents/${uuid}`, formData);
      console.log(response.data); // Respuesta de la API
   // Actualizar la lista después de subir el archivo exitosamente
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <header className='navbar' style={{ backgroundColor: '#014ba0' }}>
      <label htmlFor="btn-nav" className="btn-nav"><i className="fas fa-bars"></i></label>
      <input type="checkbox" id="btn-nav" />
      <div className='container'>
        <a href='#!' className='navbar-brand titlenav' style={{ color: 'white' }}>{brand}</a>
        <button className='btn btn-outline-info' type="submit" data-bs-toggle="modal" data-bs-target="#ModalAñadir">Agregar</button>
      </div>
      {/* Aqui inicia el formulario */}
      <div className='modal fade' id="ModalAñadir" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id="exampleModalLabel">Nuevo documento</h1>
              <button type="button" className='btn-close' data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className='modal-body'>
              <br />
              <form className='row g-3'>
                <div className='row'>
                  <div className='col-md-12'>
                    <input type="text" id="name" value={name} onChange={handleNameChange} className='form-control' placeholder="Nombre" />
                  </div>
                  <br />
                  <br />
                  <div className='col-md-12'>
                    <input type="text" id="status" value={status} onChange={handleStatusChange} className='form-control' placeholder="Status" />
                  </div>
                  <br />
                  <br />
                  <div className='col-md-12'>
                    <input className="form-control" type="file" onChange={handleFileChange} />
                  </div>
                  <br />
                  <br />
                  <div className='col-md-12'>
                    <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" id="type" value={type} onChange={handleTypeChange}>
                      <option selected>Selecciona un tipo de arcchivo</option>
                      <option value="Pdf">Pdf</option>
                      <option value="Imagen">Imagen</option>
                    </select>
                  </div>
                  <div className='row justify-content-start text-center mt-5'>
                    <div className='col-12'>
                      <button onClick={handleFileUpload} className='btn btn-primary'>Subir</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Aqui Termina el formulario */}
      <nav className="nav">
        <ul className="navigation">
        <div className="contenedorinf">
            <div className="circle-image2">
              <img src="https://i.pinimg.com/736x/26/b3/4b/26b34bf55623d77c5254ecdcffbc61b2.jpg" alt="Imagen" />
            </div>
            <div className="name">Yair HP</div>
            <div className="icons">
              <i className="fa fa-facebook"></i>
              <i className="fa fa-linkedin"></i>
              <i className="fa fa-instagram"></i>
            </div>
          </div>
          <li><Link to="/clients"><div className="fa fa-user"></div> Clientes</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default NavbarDocuments;
