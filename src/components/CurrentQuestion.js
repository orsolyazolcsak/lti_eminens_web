import React from "react";

class CurrentQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            problem: {id: null,
                question: null,
                answers: []},
            answer: null,
            questionFetcher: null,
            lastSubmittedAnswer: {
                answer: null,
                correct: false,
                examId: null,
                problemId: null,
                user: null
            },
            examEnded: false,
            numberOfCorrectAnswers: 0,
            isLoaded: false,
            error: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        console.log(event);
        this.setState({answer: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("submitting answer ", this.state.answer, "for question", this.state.problem);
        // this.submitAnswer().then(r => console.log("result returned from submitAnswer", r));
        let data = {
            examId: this.props.examId,
            problemId: this.state.problem.id,
            answer: this.state.answer,
            user: "TestStudent"
        };
        console.log(data);
        fetch('http://localhost:8090/exam/currentQuestion/' + this.props.examId, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log('Result of submitted answer: ', result);
                    this.setState({
                        isLoaded: true,
                        lastSubmittedAnswer: result
                    });
                    if (!this.state.lastSubmittedAnswer.correct) {
                        this.setState({
                            examEnded: true
                        })
                    }
                    if (!this.state.examEnded && this.state.lastSubmittedAnswer.correct) {
                        this.setState({
                                numberOfCorrectAnswers: this.state.numberOfCorrectAnswers + 1
                            }
                        )
                    }

                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    componentDidMount() {
           this.setState( {questionFetcher: setInterval(() => this.fetchCurrentQuestion(), 5000)});
    }

    componentWillUnmount() {
        clearInterval(this.state.questionFetcher);
    }

    async fetchCurrentQuestion() {
        fetch('http://localhost:8090/exam/currentQuestion/' + this.props.examId, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log('Result: ', result);
                    this.setState({
                        isLoaded: true,
                        exam: result,
                        problem: result
                    });
                    console.log("this.state", this.state);
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    render() {

        const {error, isLoaded} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            if (this.state.problem.answers == null && !this.state.examEnded) {
                    this.setState({
                        examEnded: true
                    })
            }
            // TODO watcher users should be able to see all questions even if they answer incorrectly
            if (this.state.examEnded) {
                return (<h2>A vizsga veget ert. Helyes valaszok szama: {this.state.numberOfCorrectAnswers} a 9-bol</h2>)
            }
            if (this.state.problem.id === this.state.lastSubmittedAnswer.problemId) {
                return (<h2>Helyes valasz. Kerjuk varjon a kovetkezo kerdesre.</h2>)
            }
            return (
                <div className="exam-list">
                    <h2>{this.state.problem.question}</h2>
                    <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                        <table>

                            <tbody>
                            <tr>
                                <td>
                                    <input type="radio" id="answer0" name="answer" value={this.state.problem.answers[0]}
                                           checked={this.state.answer === this.state.problem.answers[0]} readOnly/>
                                    <label htmlFor="answer0">{this.state.problem.answers[0]}</label>
                                </td>
                                <td>
                                    <input type="radio" id="answer1" name="answer" value={this.state.problem.answers[1]}
                                           checked={this.state.answer === this.state.problem.answers[1]} readOnly/>
                                    <label htmlFor="answer1">{this.state.problem.answers[1]}</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="radio" id="answer2" name="answer" value={this.state.problem.answers[2]}
                                           checked={this.state.answer === this.state.problem.answers[2]} readOnly/>
                                    <label htmlFor="answer2">{this.state.problem.answers[2]}</label>
                                </td>
                                <td>
                                    <input type="radio" id="answer3" name="answer" value={this.state.problem.answers[3]}
                                           checked={this.state.answer === this.state.problem.answers[3]} readOnly/>
                                    <label htmlFor="answer3">{this.state.problem.answers[3]}</label>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <input type="Submit" value="Küldés" readOnly/>
                    </form>
                </div>
            );
        }
    }
}


export default CurrentQuestion;