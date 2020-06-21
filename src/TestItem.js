import React from "react";

function TestItem(props){
    return(
        <tr>
            <td>{props.item.id}</td>
            <td>{props.item.name}</td>
            <td><a href={'exam/new/' + props.item.id}>Új vizsga generlása</a></td>
        </tr>
    )
}

export default TestItem;