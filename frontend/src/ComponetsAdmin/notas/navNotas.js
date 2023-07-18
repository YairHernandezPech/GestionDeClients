import React from "react";
import "../../style.css";
import { Link } from 'react-router-dom';
//sfc
const NavbarNotas = ({ brand, insertNote, setInsertNote }) => {


  const cambio = e => {
    setInsertNote({
      ...insertNote,
      [e.target.name]: e.target.value
    })
  }

  let { title, note } = insertNote
  const cambioSubmit = () => {
    //Validar de los datos
    if (title === '' || note === '') {
      alert('Todos los campos son obligatorios')
      return
    }
    //Consulta
    const requestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(insertNote)
    }
    fetch('http://localhost:3001/notes/insert', requestInit)
      .then(res => res.json())
      .then(res => console.log(res))

    //Reiniciar la form
    setInsertNote({
      title: '',
      note: '',
    })

  }

  return (
    <header className='navbar' style={{ backgroundColor: '#014ba0' }}>
      <label for="btn-nav" className="btn-nav"><i className="fas fa-bars"></i></label>
      <input type="checkbox" id="btn-nav" />
      <div className='container'>
        <a href='#!' className='navbar-brand titlenav' style={{ color: 'white' }}>{brand}</a>
        <button className='btn btn-outline-info' type="submit" data-bs-toggle="modal" data-bs-target="#ModalAñadir">Añadir</button>
      </div>
      {/* Aqui inicia el formulario */}
      <div className='modal fade' id="ModalAñadir" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id="exampleModalLabel">Nueva Nota</h1>
              <button type="button" className='btn-close' data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className='modal-body'>
              <br />
              <form className='row g-3' onSubmit={cambioSubmit}>
                <div className='row'>
                  <div className='col-md-12'>
                    <input name='title' onChange={cambio} type='text' id='title' className='form-control' placeholder="Título" />
                  </div>
                  <br />
                  <br />
                  <div className='col-md-12'>
                    <input name='note' onChange={cambio} type='text' id='note' className='form-control' placeholder="Nota" />
                  </div>
                  <div className='row justify-content-start text-center mt-5'>
                    <div className='col-12'>
                      <button type='submit' className='btn btn-primary'>Añadir</button>
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
          <li><Link to="/"><div className="fa fa-user"></div> Clientes</Link></li>
          <li><Link to="/documents"><div className="fa fa-file"></div> Documentos</Link></li>
          <div className="contenedor">
            <div className="circle-image">
              <img src="https://i.postimg.cc/kGZJ199h/9aa37b0f-020f-44ec-9217-00c353c61b5d.jpg" alt="Imagen" />
            </div>
            <div className="text">
              <p>AscoDeCodigo</p>
            </div>
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default NavbarNotas;