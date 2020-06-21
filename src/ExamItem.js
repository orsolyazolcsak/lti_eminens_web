import React from "react";

function ExamItem(props){
    return(
        <tr>
            <td>{props.item.id}</td>
            <td>{props.item.question}</td>
        </tr>
    )
}

export default ExamItem;