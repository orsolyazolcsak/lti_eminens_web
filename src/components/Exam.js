import React from "react";
import ExamItem from "../ExamItem";
import LoginService from "../LoginService";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Button from "@material-ui/core/Button";

class Exam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exam: {},
            problems: [],
            isLoaded: false,
            error: null
        }
    }

    componentDidMount() {
        console.log("loginservice.getToken", LoginService.getToken());
        fetch('http://localhost:8090/test/new/' + this.props.testId, {
            method: 'GET',
            headers: {authorization: LoginService.getToken()}
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log('Result: ', result);
                    this.setState({
                        isLoaded: true,
                        exam: result,
                        problems: result.problems
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const examItems = this.state.problems.map(item => <ExamItem key={item.id} item={item}/>);
        const {error, isLoaded} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="exam-list">
                    <TableContainer component={Paper}>
                        <Table aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell>Név</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {examItems}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <br/>
                    <Button variant="contained" color="secondary" href='/test'>
                        Vissza
                    </Button>
                    <Button variant="contained" color="primary" href={'start/' + this.state.exam.id}  className="startExamButton">
                        Vizsga indítása
                    </Button>
                </div>

            );
        }
    }
}


export default Exam;