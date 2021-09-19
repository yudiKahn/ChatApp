import React from 'react';
import {Link} from 'react-router-dom';

function FourOFour() {
    return (
        <div>
            404 | Page not found <br/>
            Go back <Link to="/" style={{textDecoration:'none',color:'black'}}>Home</Link>
        </div>
    )
}

export default FourOFour;
