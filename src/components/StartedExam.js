import React from "react";
import LoginService from "../LoginService";

class StartedExam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exam: {},
            isLoaded: false,
            error: null
        }
    }

    componentDidMount() {
        console.log(LoginService.getToken());
        let config = {
            method: 'GET',
            headers: {authorization: LoginService.getToken()}
        };
        console.log(config);
        fetch("http://localhost:8090/exam/start/" + this.props.examId, config)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("result", result);
                    this.setState({
                        exam: result,
                        isLoaded: true
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error
                    });
                }
            )

    }

    render() {
        return (
            <div>
                <p>{this.state.exam.startTime == null ? "Vizsga inditasa sikertelen" : "A vizsga elindult ekkor: " + this.state.exam.startTime}</p>
                <a href={"/exam/currentQuestion/" + this.props.examId}>Current question</a>
            </div>)
    }
}

export default StartedExam