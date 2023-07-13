import { Fragment, useEffect, useState } from "react";
import Navbar from "./ComponetsAdmin/clients/Navbar";
import UserList from "./ComponetsAdmin/clients/table";
import Form from "./ComponetsAdmin/clients/form";
import AppNotes from "./AppNotas";
import AppDocuments from "./AppDocuments";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  //Clientes
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
  //Actualizar
  const [clientValues, setClientValues] = useState({});

  useEffect(() => {
    const getUsers = () => {
      fetch('http://localhost:3001/clients?page=1&limit=7')
        .then(res => res.json())
        .then(res => setUsers(res));
    }
    getUsers();
    setListupdate(false);
  }, [listupdate]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Fragment>
              <Navbar brand="Welcome Admin" searchTerm={searchTerm} setResults={setResults} setSearchTerm={setSearchTerm} results={results}></Navbar>
              <div className='container'>
                <div className='row'>
                  <div className='col-14'>
                    <br />
                    <Form insertClient={insertClient} setInsertClient={setInsertClient}></Form>
                    <br />
                    <UserList users={users} setListupdate={setListupdate} clientValues={clientValues} setClientValues={setClientValues}></UserList>
                  </div>
                </div>
              </div>
            </Fragment>
          }
        />
        <Route path="/notes" element={<AppNotes/>} />
        <Route path="/documents" element={<AppDocuments/>} />
      </Routes>
    </Router>
  );
}


export default App;
