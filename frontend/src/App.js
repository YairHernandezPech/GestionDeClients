import { Fragment, useEffect, useState } from "react";
import Navbar from "./ComponetsAdmin/clients/Navbar";
import UserList from "./ComponetsAdmin/clients/table";
import Form from "./ComponetsAdmin/clients/form";
import AppNotes from "./AppNotas";
import AppDocuments from "./AppDocuments";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  // Clientes
  const [insertClient, setInsertClient] = useState({
    name: '',
    lastName: '',
    address: '',
    phone: '',
    age: '',
    email: '',
    customerType: ''
  });

  const [users, setUsers] = useState([]);
  const [listupdate, setListupdate] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  // Actualizar
  const [clientValues, setClientValues] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
//Mensaje
const [MessageApi, setMessageApi] = useState('');
  useEffect(() => {
    const getUsers = () => {
      fetch(`http://localhost:3001/clients?page=${currentPage}&limit=6`)
        .then(res => res.json())
        .then(res => {
          console.log(res); // Verificar la respuesta de la API
          setUsers(res); // Corregir esta línea
          setTotalPages(res.totalPages);
        });
    }
  
    getUsers();
    setListupdate(false);
  }, [currentPage, listupdate]);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Fragment>
              <Navbar brand="Welcome Admin" searchTerm={searchTerm} setResults={setResults} setSearchTerm={setSearchTerm} results={results} MessageApi={MessageApi}></Navbar>
              <div className='container'>
                <div className='row'>
                  <div className='col-14'>
                    <br />
                    <Form insertClient={insertClient} setInsertClient={setInsertClient} setMessageApi={setMessageApi}></Form>
                    <br />
                    <UserList users={users} setListupdate={setListupdate} clientValues={clientValues} setClientValues={setClientValues} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} setMessageApi={setMessageApi}></UserList>
                  </div>
                </div>
              </div>
            </Fragment>
          }
        />
        <Route path="/notes" element={<AppNotes setMessageApi={setMessageApi}/>} />
        <Route path="/documents" element={<AppDocuments setMessageApi={setMessageApi}/>} />
      </Routes>
    </Router>
  );
}

export default App;
