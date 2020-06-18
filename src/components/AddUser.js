import React from "react";

function AddUser(){
    return(
        <form>
            <label>
                Name:
                <input type="text" name="name" />
            </label>
            <input type="submit" value="Submit" />
        </form>
        )
}
export default AddUser;