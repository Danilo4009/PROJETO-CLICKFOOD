import React from 'react';
import { Link } from 'react-router-dom'

import { AreaHeader } from './styled';

function Header(props){
    return (
       <AreaHeader>
            <div className="container">
                <div className="logo">
                    <img src="../../../ClickFood.png"/>
                </div>

                <nav>
                    <ul>
                        <li><Link to="/">Início</Link></li>
                        <li><Link to="/restaurantes">Restaurantes</Link></li>
                    </ul>

                    <div className="avatar">
                        <label>Endereço</label>
                        <img src={props.user.avatar} />
                        <label>{props.user.name}</label>
                    </div>
                </nav>
            </div>
       </AreaHeader>
    );
}

export default Header;