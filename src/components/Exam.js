import React from "react";
import ExamItem from "../ExamItem";

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
        fetch('http://localhost:8090/test/new/' + this.props.testId, {
            method: 'GET'
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
        const {error, isLoaded, items} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="exam-list">
                    <h2>{this.state.exam.name}</h2>
                    <table>
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <th>Nev</th>
                            </tr>
                            {examItems}
                        </tbody>
                    </table>
                    <a href={'start/' + this.state.exam.id} >Start</a>
                </div>
            );
        }
    }
}


export default Exam;