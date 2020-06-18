import React from "react";

class Menu extends React.Component {
    constructor() {
        super();
        this.state = {
            anotherData: "Nothing",
            loading: true
        }
    }

    componentDidMount() {
        setTimeout(() => this.setState({ anotherData: "This is not nothing"}), 3000);

    }

    render() {
        console.log(this.props.data)
        return (
          <div>
              {this.props.data.map((d) => {
                  return <div key={d}>{d.name}</div>
              })}
              {this.state.anotherData}
          </div>
        );
    }
}

export default Menu;