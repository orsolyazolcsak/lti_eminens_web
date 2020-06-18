import React from "react";

function TestItem(props){
    return(
        <tr>
            <td>{props.item.id}</td>
            <td>{props.item.name}</td>
        </tr>
    )
}

export default TestItem;