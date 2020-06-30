import React from "react";
import LoginService from "../LoginService";

class Help extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usedFiftyFifty: false,
            usedAskTheAudience: false,
            usedCallAFriend: false,
            askTheAudienceDao: null,
            phoneAFriendResponse: [],
            phoneAFriendResponseSingleAnswer: null,
            askedTheAudienceForProblemId: null,
            phonedAFriendForProblemId: null,
            selectValue: null,
            isLoaded: false,
            error: null
        };
        this.fiftyFifty = this.fiftyFifty.bind(this);
        this.askTheAudience = this.askTheAudience.bind(this);
        this.phoneAFriend = this.phoneAFriend.bind(this);
        this.watcherSelected = this.watcherSelected.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        this.setState({selectValue: e.target.value});
        console.log(e.target.value);
    }
    watcherSelected(event){
        event.preventDefault();
        fetch('http://localhost:8090/exam/currentQuestion/' + this.props.examId + '/phoneAFriend/' + this.state.selectValue, {
            method: 'POST',
            headers: {
                authorization: LoginService.getToken(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.props.problemDao)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log('PhoneAFriend help result: ', result);
                    this.setState({
                        phoneAFriendResponseSingleAnswer: result,
                        usedPhoneAFriend: true,
                        phonedAFriendForProblemId: this.props.problemDao.id,
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

    fiftyFifty() {
        fetch('http://localhost:8090/exam/currentQuestion/' + this.props.examId + '/fiftyFifty', {
            method: 'POST',
            headers: {
                authorization: LoginService.getToken(),
                "Content-Type": "application/json"
            },
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
        fetch('http://localhost:8090/exam/currentQuestion/' + this.props.examId + '/askTheAudience', {
            method: 'POST',
            headers: {
                authorization: LoginService.getToken(),
                "Content-Type": "application/json"
            },
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

    phoneAFriend() {
        fetch('http://localhost:8090/exam/currentQuestion/' + this.props.examId + '/phoneAFriendGetWatchers', {
            method: 'POST',
            headers: {
                authorization: LoginService.getToken(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.props.problemDao)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log('PhoneAFriend help result: ', result);
                    this.setState({
                        phoneAFriendResponse: result,
                        usedPhoneAFriend: true,
                        phonedAFriendForProblemId: this.props.problemDao.id,
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

    render() {

        if (this.state.error) {
            return <div>Error: {this.state.error.message}</div>;
        }
        const watchers = [];
        watchers.push(<option key={9999} value="Choose">Choose</option>)
        for (const [index, value] of this.state.phoneAFriendResponse.entries()) {
            watchers.push(<option key={index} value={value}>{value}</option>)
        }

        return (
            <div>
                <button onClick={this.fiftyFifty}>
                    50/50
                </button>
                <button onClick={this.askTheAudience}>közönség segítség</button>
                <button onClick={this.phoneAFriend}>telefonos segítség</button>
                if (this.state.askedTheAudienceForProblemId === this.props.problemDao.id) {
                <div hidden={this.state.askedTheAudienceForProblemId !== this.props.problemDao.id}>
                    <h2>Közönség segítsége:</h2>
                    <p>{JSON.stringify(this.state.askTheAudienceDao)}</p>
                </div>
            }
                if (this.state.phonedAFriendForProblemId === this.props.problemDao.id) {
                <div hidden={this.state.phonedAFriendForProblemId !== this.props.problemDao.id}>
                    <h2>Telefonos segítség:</h2>
                    <p>Válassz egy diákot a legördülő listából, akinek a válaszát látni szeretnéd</p>
                    <form onSubmit={this.watcherSelected}>
                        <label htmlFor="watchers">Choose a watcher:</label>
                        <select name="watchers" id="watchers" value={this.state.selectValue} onChange={this.handleChange}>
                            {watchers}
                        </select>
                        <br/><br/>
                        <input type="submit" value="Submit"/>
                    </form>
                    {this.state.phoneAFriendResponseSingleAnswer == null ? "" : this.state.phoneAFriendResponseSingleAnswer}
                </div>
            }
            </div>
        )
    }

}

export default Help;