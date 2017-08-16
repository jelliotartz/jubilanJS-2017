import React, { Component } from 'react';

class Hello extends Component {
  constructor(props) {
    super(props);
    this.state = {
      greeting: 'Hiya'
    };
  }

  render() {
    return (
      <div className="hello">
        <h1>{this.state.greeting}</h1>
        <h2>{this.props.friend}</h2>
        <p>Congratulations! You created a React Component!</p>
      </div>
    );
  }
}

Hello.defaultProps = {
  friend: 'Bud :)'
}

export default Hello;
