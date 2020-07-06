import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

function ExamItem(props) {
    return (

        <TableRow>
            <TableCell>{props.item.id}</TableCell>
            <TableCell>{props.item.question}</TableCell>
        </TableRow>

    )
}

export default ExamItem;