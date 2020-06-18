import React from "react";
import ReactDOM from 'react-dom';

function Listam(){
    return(
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ul>
    )
}

ReactDOM.render(
    <Listam/>,
    document.getElementById('root')
);

export default Listam;