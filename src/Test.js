import React from "react";
import TestItem from "./TestItem";
import './Test.css';
import LoginService from "./LoginService";

class Test extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            test: [],
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
        fetch("http://localhost:8090/test", config)
            .then(res => {
                res.json()
                    .then(
                        (result) => {
                            console.log("resultTest.js get /test from backend", result);
                            this.setState({
                                isLoaded: true,
                                test: result
                            });
                        },
                        (error) => {
                            this.setState({
                                isLoaded: true,
                                error: error
                            });
                        }
                    )

            }, error => {
                this.setState({
                    isLoaded: true,
                    error: error
                });
            })
    }

    render() {
        const testItems = this.state.test.map(item => <TestItem key={item.id} item={item}/>);

        const {error, isLoaded} = this.state;
        if (error) {
            return <div>Error: {error.message}.</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="test-list">
                    <table>
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <th>Nev</th>
                            </tr>
                            {testItems}
                        </tbody>
                    </table>

                </div>
            );
        }
    }

}

export default Test;