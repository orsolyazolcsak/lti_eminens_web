import React from "react";

export default TestItem;

function TestItem(props){
    return(
        <tr>
            <td>{props.item.id}</td>
            <td>{props.item.name}</td>
            <td><a href={'exam/new/' + props.item.id} >Új vizsga generálása</a></td>
        </tr>
    )
}
