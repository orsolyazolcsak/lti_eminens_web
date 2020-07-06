import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import AddBoxIcon from '@material-ui/icons/AddBox';

export default TestItem;

function TestItem(props){
    return(
        <TableRow>
            <TableCell>{props.item.id}</TableCell>
            <TableCell>{props.item.name}</TableCell>
            <TableCell><a href={'exam/new/' + props.item.id} ><AddBoxIcon></AddBoxIcon></a></TableCell>
        </TableRow>
    )
}
