import React, { useState } from "react";
import "../../style.css";
import { Link } from 'react-router-dom';
import { Toast, ToastContainer } from 'react-bootstrap';
//sfc
const Navbar = ({ brand, searchTerm, setResults, setSearchTerm, results,MessageApi }) => {

    // // Aqui empieza para el Toast de mensaje
    const [showToast, setShowToast] = useState(false);

    const toggleToast = () => {
        setShowToast(!showToast);
    };
    //Aqui termina

    const handleSearch = async (event) => {
        event.preventDefault();

        if (!searchTerm) {
            console.log('Cliente no encontrado');
            setResults([]);
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/clients?page=1&limit=10&valor=' + searchTerm);
            const data = await response.json();

            if (data.data.length === 0) {
                //console.log('Usuario no encontrado');
                setResults([]);
            } else {
                setResults(data.data);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };


    return (
        <header className='navbar' style={{ backgroundColor: '#014ba0' }}>
            <label htmlFor="btn-nav" className="btn-nav"><i className="fas fa-bars"></i></label>
            <input type="checkbox" id="btn-nav" />
            <div className='container'>
                <a href='#!' className='navbar-brand titlenav' style={{ color: 'white' }}>{brand}</a>
                <form className='d-flex buscador' onSubmit={handleSearch} >
                    <input className='form-control me-2' type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search" aria-label="Search" />
                    <button className='btn btn-outline-info' type="submit" data-bs-toggle="modal" data-bs-target="#ModalBuscar">Buscar</button>
                </form>
            </div>
            <div className='modal fade' id="ModalBuscar" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className='modal-dialog modal-dialog-centered'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h1 className='modal-title fs-5' id="exampleModalLabel">Clientes en contrados</h1>
                            <button
                                type="button"
                                className='btn-close'
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className='modal-body'>
                            <div>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Apellido</th>
                                            <th>Teléfono</th>
                                            <th>Tipo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results.length > 0 ? (
                                            results.map((result) => (
                                                <tr key={result._id}>
                                                    <td>{result.name}</td>
                                                    <td>{result.lastName}</td>
                                                    <td>{result.phone}</td>
                                                    <td>{result.customerType}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={3} style={{ textAlign: 'center', color: 'red', fontSize: '25px' }}><div className='alert alert-danger' role="alert">
                                                    Cliente no encontrado
                                                </div></td>
                                            </tr>
                                        )}
                                    </tbody>

                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {MessageApi ?(
                    <div className="position-relative ms-2 notify"><span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize:"12px"}}>1+</span><a variant="primary" onClick={toggleToast} target="_blank"><i className="fa fa-bell"></i></a></div> 
                ):(
                    <div className="position-relative ms-2 notify"><a variant="primary" onClick={toggleToast} target="_blank"><i className="fa fa-bell"></i></a></div> 
                )}

                <ToastContainer className="position-fixed bottom-0 end-0 p-3">
                    <Toast show={showToast} onClose={toggleToast}>
                        <Toast.Header>
                            <img src="https://i.postimg.cc/kGZJ199h/9aa37b0f-020f-44ec-9217-00c353c61b5d.jpg" className="rounded me-2 logoMsj" alt="..." />
                            <strong className="me-auto">AscoDeCodigo</strong>
                            <small>11 mins ago</small>
                        </Toast.Header>
                        <Toast.Body> {MessageApi} </Toast.Body>
                    </Toast>
                </ToastContainer>
            </div>
            <nav className='nav'>
                <ul className='navigation'>
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
                    {/* <li><Link to="/documents"><div className="fa fa-file"></div> Documentos</Link></li> */}
                    <div className="contenedor">
                    </div>
                    <li><Link to="/"><div className="fa fa-power-off"></div> Sing out</Link></li>
                    
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;