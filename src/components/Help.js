import React from "react";
import LoginService from "../LoginService";

class Help extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            usedFiftyFifty: false,
            usedAskTheAudience: false,
            usedCallAFriend: false,
            askTheAudienceDao: null,
            askedTheAudienceForProblemId: null,
            isLoaded: false,
            error: null
        };
        this.fiftyFifty = this.fiftyFifty.bind(this);
        this.askTheAudience = this.askTheAudience.bind(this);
    }

    fiftyFifty(){
        fetch('http://localhost:8090/exam/currentQuestion/'+this.props.examId+'/fiftyFifty',{
            method: 'POST',
            headers: {authorization: LoginService.getToken(),
                "Content-Type": "application/json"},
            body: JSON.stringify(this.props.problemDao)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log('FiftyFifty help result: ', result);
                    this.props.fiftyFiftyCallback(result);
                    this.setState({
                        usedFiftyFifty: true,
                        isLoaded: true,
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
    askTheAudience() {
        fetch('http://localhost:8090/exam/currentQuestion/'+this.props.examId+'/askTheAudience',{
            method: 'POST',
            headers: {authorization: LoginService.getToken(),
                "Content-Type": "application/json"},
            body: JSON.stringify(this.props.problemDao)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log('AskTheAudience help result: ', result);
                    this.setState({
                        askTheAudienceDao: result,
                        usedAskTheAudience: true,
                        askedTheAudienceForProblemId: this.props.problemDao.id,
                        isLoaded: true,
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
    render(){

        if (this.state.error) {
            return <div>Error: {this.state.error.message}</div>;
        }
        return(
            <div>
                <button onClick={this.fiftyFifty}>
                    50/50
                </button>
                <button onClick={this.askTheAudience}>közönség segítség</button>
                <button>telefonos segítség</button>
            if (this.state.askedTheAudienceForProblemId === this.props.problemDao.id) {
                <div hidden={this.state.askedTheAudienceForProblemId !== this.props.problemDao.id}>
                    <h2>Kozonseg segitsege:</h2>
                    <p>{JSON.stringify(this.state.askTheAudienceDao)}</p>
                </div>
            }
            </div>
        )
    }

}

export default Help;