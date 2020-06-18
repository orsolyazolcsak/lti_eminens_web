import React from "react";
import TestItem from "./TestItem";
import './Test.css'

class Test extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            test: [],
            isLoaded: false,
            error:null
        }
    }

    componentDidMount() {
        fetch("http://localhost:8090/test", {
            method: 'GET'
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        test: result
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

    render(){
        const testItems = this.state.test.map(item => <TestItem key={item.id} item={item}/>);

        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="test-list">
                    <table>
                        <tr>
                            <th>Id</th>
                            <th>Nev</th>
                        </tr>
                            {testItems}
                    </table>

                </div>
            );
        }
    }

}

export default Test;