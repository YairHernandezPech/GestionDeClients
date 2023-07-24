import { Fragment, useEffect, useState } from "react";
import Navbar from "./ComponetsAdmin/clients/Navbar";
import UserList from "./ComponetsAdmin/clients/table";
import Form from "./ComponetsAdmin/clients/form";


const AppClients = ({MessageApi,setMessageApi}) => {

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
  useEffect(() => {
    const getUsers = () => {
      fetch(`http://localhost:3001/clients?page=${currentPage}&limit=6`)
        .then(res => res.json())
        .then(res => {
          //console.log(res);
          setUsers(res.data);
          setTotalPages(res.totalPages);
        });
    }

    getUsers();
    setListupdate(false);
  }, [currentPage, listupdate]);
  return (
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
  );

};

export default AppClients;