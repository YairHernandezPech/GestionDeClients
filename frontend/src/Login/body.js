import React from 'react';
import { Link } from 'react-router-dom';

const Body = () => {
    return ( 
        <div>
        <h1>Pagina de inicio xd </h1>
        <li><Link to="/clients"><div className="fa fa-user"></div> Clientes</Link></li>
        </div>

     );
}
 
export default Body;