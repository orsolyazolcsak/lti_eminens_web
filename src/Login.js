import React from "react";
import LoginService from "./LoginService";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            error: null,
            isLoaded: true,
            authResponseMessage: null,
            isUserLoggedIn: false,
            user: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);

    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    loginClicked(event) {
        event.preventDefault();
        fetch("http://localhost:8090/login", {
            method: 'POST',
            headers: {authorization: LoginService.createBasicAuthToken(this.state.username, this.state.password)}
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("result of auth request", result);
                    this.setState({
                        isLoaded: true,
                        authResponseMessage: result.message,
                        isUserLoggedIn: true
                    });
                    if (result.message === "sikeresen bejelentkeztél.") {
                        console.log("cool");
                        LoginService.registerSuccessfulLogin(this.state.username);
                    }
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        isUserLoggedIn: false,
                        error
                    });
                }
            )
    }

    componentDidMount() {
    }

    render() {

        const {error, isLoaded} = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            if (this.state.authResponseMessage != null) {
                return (<h2>{this.state.username} {this.state.authResponseMessage}</h2>)
            }
            return (
                <div style={{display: 'flex',  justifyContent:'center'}}>
                    <form onSubmit={this.loginClicked}>
                        Felhasználónév<br/>
                        <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                        <br/>Jelszó<br/>
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange}
                               required/><br/><br/>
                        <input type="submit" value="Bejelentkezés"/>
                    </form>
                </div>
            );
        }
    }
}

export default Login;