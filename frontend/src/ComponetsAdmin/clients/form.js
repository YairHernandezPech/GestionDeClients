import React, { useState } from 'react';
import "../../style.css";

const Form = ({ insertClient, setInsertClient,setMessageApi }) => {
  const [emailError, setEmailError] = useState('');

  const cambio = e => {
    setInsertClient({
      ...insertClient,
      [e.target.name]: e.target.value
    });

    if (e.target.name === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailPattern.test(e.target.value);

      if (!isValidEmail) {
        setEmailError('Por favor, ingresa un correo electrónico válido');
      } else {
        setEmailError('');
      }
    }
  };

  let { name, lastName, address, phone, age, email, customerType } = insertClient;

  const cambioSubmit = () => {
    // Validar los datos
    if (name === '' || lastName === '' || address === '' || phone === '' || age === '' || email === '' || customerType === '') {
      alert('Todos los campos son obligatorios');
      return;
    }

    // Consulta
    const requestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(insertClient)
    };

    fetch('http://localhost:3001/clients/insert', requestInit)
      .then(res => res.json())
      .then(res => {
        //console.log(res);
        setMessageApi('Se ha agregado un cliente');
      });

    // Reiniciar el formulario
    setInsertClient({
      name: '',
      lastName: '',
      address: '',
      phone: '',
      age: '',
      email: '',
      customerType: ''
    });
  };

  return (
    <div className='container'>
      <div className='div'>
        <div className='row'>
          <div className='col-7'>
            <h2 className='titleone'>Lista de Clientes</h2>
          </div>
          <div className='col-5' style={{ textAlign: 'center' }}>
            <button type="button" className='btn btn-outline-success new' data-bs-toggle="modal" data-bs-target="#ModalAñadir">Añadir</button>
          </div>
          {/* Aquí inicia el formulario */}
          <div className='modal fade' id="ModalAñadir" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h1 className='modal-title fs-5' id="exampleModalLabel">Añadir un cliente</h1>
                  <button type="button" className='btn-close' data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className='modal-body'>
                  <br />
                  <form className='row g-3' onSubmit={cambioSubmit}>
                    <div className='row'>
                      <div className='col-md-12'>
                        <input name='name' onChange={cambio} type='text' id='name' className='form-control' placeholder="Nombre" />
                      </div>
                      <br />
                      <br />
                      <div className='col-md-12'>
                        <input name='lastName' onChange={cambio} type='text' id='lastName' className='form-control' placeholder="Apellido" />
                      </div>
                      <br />
                      <br />
                      <div className='col-md-12'>
                        <input name='address' onChange={cambio} type='text' id='address' className='form-control' placeholder="Dirección" />
                      </div>
                      <br />
                      <br />
                      <div className='col-md-12'>
                        <input name='phone' onChange={cambio} type='text' id='phone' className='form-control' placeholder="Teléfono" />
                      </div>
                      <br />
                      <br />
                      <div className='col-md-12'>
                        <input name='age' onChange={cambio} type='number' id='age' className='form-control' placeholder="Edad" />
                      </div>
                      <br />
                      <br />
                      <div className='col-md-12'>
                        <input name='email' onChange={cambio} type='text' id='email' className='form-control' placeholder="Email" />
                        {emailError && <p className="text-danger">{emailError}</p>}
                      </div>
                      <br />
                      <br />
                      <div className='mb-3'>
                        <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" name='customerType' onChange={cambio} id='customerType'>
                          <option value="" selected>Selecciona un tipo de cliente</option>
                          <option value="Candidato">Candidato</option>
                          <option value="Estudiante">Estudiante</option>
                        </select>
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
          {/* Aquí termina el formulario */}
        </div>
      </div>
    </div>
  );
};

export default Form;
