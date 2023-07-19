import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const UserList = ({ users, setListupdate, clientValues, setClientValues, currentPage, setCurrentPage, totalPages, setMessageApi }) => {
  const [emailError, setEmailError] = useState('');

  // Función para manejar los cambios en los campos de cada fila
  const handleChange = (e, clientId) => {
    const { name, value } = e.target;
    setClientValues((prevValues) => ({
      ...prevValues,
      [clientId]: {
        ...prevValues[clientId],
        [name]: value,
      },
    }));
  };

  //-----------------------Eliminar---------------------
  const eliminarUser = _id => {
    const requestInit = {
      method: 'DELETE'
    };
    fetch('http://localhost:3001/clients/delete/' + _id, requestInit)
      .then(res => res.json())
      .then(res => {
        //console.log(res);
        setMessageApi('Se ha eliminado un cliente');
      });
    setListupdate(true);
    Swal.fire({ icon: 'error', title: 'Cliente Eliminado' });
  };

  //-----------------------Actualizar---------------------
  const actualizarUser = (_id) => {
    const clientUpdate = clientValues[_id];
    if (!clientUpdate || clientUpdate.name === '' || clientUpdate.lastName === '' || clientUpdate.address === '' || clientUpdate.phone === '' || clientUpdate.age === '' || clientUpdate.email === '' || clientUpdate.customerType === '') {
      Swal.fire({ icon: 'warning', title: 'Favor de acompletar todos los campos' });
      return;
    }

    const requestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clientUpdate),
    };

    fetch('http://localhost:3001/clients/update/' + _id, requestInit)
      .then(res => res.json())
      .then(res => {
        //console.log(res);
        setMessageApi('Se ha actualizado un cliente');
      });

    setListupdate(true);
    Swal.fire({ icon: 'success', title: 'Cliente Actualizado' });
  };

  // Verificar si users es undefined
  if (!users) {
    return null;
  }

  return (
    <div className='container text-center'>
      <div className='row align-items-start'>
        <main className='container' role='main'>
          <div className='row'>
            <div className='col-12'>
              <div className='table-responsive'>
                <table className='table table-striped'>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Apéllido</th>
                      <th>Teléfono</th>
                      <th>Edad</th>
                      <th>Email</th>
                      <th>Tipo</th>
                      <th>Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.lastName}</td>
                        <td>{user.phone}</td>
                        <td>{user.age}</td>
                        <td>{user.email}</td>
                        <td>{user.customerType}</td>
                        <td>{user.createdAT.substring(0, 10)}</td>
                        <td>
                          <div className='mb-3'>
                            <button onClick={() => eliminarUser(user._id)} className='btn btn-danger fa fa-trash'></button>
                          </div>
                        </td>
                        <td>
                          <div className='mb-3'>
                            <button className='btn btn-warning  fa fa-pencil' data-bs-toggle='modal' data-bs-target={`#ModalActualizar-${user._id}`}></button>
                          </div>
                        </td>
                        <td>
                          {user.customerType === "Candidato" && (
                            <div className='mb-3'>
                              <Link to="/notes" className='btn btn-info fa fa-sticky-note-o'></Link>
                            </div>
                          )}
                        </td>
                        {/* Aqui inicia el formulario */}
                        <div className='modal fade' id={`ModalActualizar-${user._id}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div className='modal-dialog'>
                            <div className='modal-content'>
                              <div className='modal-header'>
                                <h1 className='modal-title fs-5' id="exampleModalLabel">Actualizar el cliente</h1>
                                <button type="button" className='btn-close' data-bs-dismiss="modal" aria-label="Close" onClick={() => actualizarUser(user._id)}></button>
                              </div>
                              <div className='modal-body'>
                                <br />
                                <form className='row g-3'>
                                  <div className='row'>
                                    <div className='col-md-12'>
                                      <input name='name' onChange={(e) => handleChange(e, user._id)} type='text' id='name' className='form-control' placeholder="Nombre" />
                                    </div>
                                    <br />
                                    <br />
                                    <div className='col-md-12'>
                                      <input name='lastName' onChange={(e) => handleChange(e, user._id)} type='text' id='lastName' className='form-control' placeholder="Apéllido" />
                                    </div>
                                    <br />
                                    <br />
                                    <div className='col-md-12'>
                                      <input name='address' onChange={(e) => handleChange(e, user._id)} type='text' id='address' className='form-control' placeholder="Dirección" />
                                    </div>
                                    <br />
                                    <br />
                                    <div className='col-md-12'>
                                      <input name='phone' onChange={(e) => handleChange(e, user._id)} type='text' id='phone' className='form-control' placeholder="Teléfono" />
                                    </div>
                                    <br />
                                    <br />
                                    <div className='col-md-12'>
                                      <input name='age' onChange={(e) => handleChange(e, user._id)} type='number' id='age' className='form-control' placeholder="Edad" />
                                    </div>
                                    <br />
                                    <br />
                                    <div className='col-md-12'>
                                      <input name='email' onChange={(e) => {
                                        handleChange(e, user._id);
                                        setEmailError('');
                                        if (e.target.value.trim() !== '' && !validateEmail(e.target.value.trim())) {
                                          setEmailError('Por favor, ingresa un correo electrónico válido');
                                        }
                                      }} type='text' id='email' className='form-control' placeholder="Email" />
                                      {emailError && <p className="text-danger">{emailError}</p>}
                                    </div>
                                    <br />
                                    <br />
                                    <div className='mb-3'>
                                      <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" name='customerType' onChange={(e) => handleChange(e, user._id)} id='customerType'>
                                        <option value="" selected>Selecciona un tipo de cliente</option>
                                        <option value="Candidato">Candidato</option>
                                        <option value="Estudiante">Estudiante</option>
                                      </select>
                                    </div>
                                    <div className='row justify-content-start text-center mt-5'>
                                      <div className='col-12'>
                                        <button type='submit' className='btn btn-primary' onClick={() => actualizarUser(user._id)} >Actualizar</button>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Aqui Termina el formulario */}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{marginTop:"60px"}}></div>
              </div>
            </div>
          </div>
          <div className='row pagination'>
            <div className='col-12'>
              <nav>
                <ul className='pagination justify-content-center'>
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                      className='page-link'
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Anterior
                    </button>
                  </li>
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                      className='page-link'
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Siguiente
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

function validateEmail(email) {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
}

export default UserList;
