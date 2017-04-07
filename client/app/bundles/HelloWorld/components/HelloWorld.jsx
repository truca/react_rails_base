import React, { PropTypes } from 'react';
import axios from 'axios';

const HelloWorld = React.createClass({
  getInitialState(){
    return { name: this.props.name, repositories: [] };
  },
  updateName(name){
    this.setState({ name });
    axios.get('https://api.github.com/users/' + name + '/repos')
    .then(res => {
      console.log('success', res)
      this.setState({repositories: res.data})
    })
    .catch(err => {
      console.log('err', err);
    })
  },
  render(){
    return (
      <div>
        <h3> Hello, {this.state.name}! </h3>
        <hr />
        <form >
          <label htmlFor="name"> Say hello to:</label>
          <input id="name" type="text" value={this.state.name} onChange={(e) => this.updateName(e.target.value)} />
        </form>
        <div>
          <h3>Repositorios</h3>
          <ul>
            {this.state.repositories.map(repo => {
              return <li>{repo.name}</li>
            })}
          </ul>
        </div>
      </div>
    );
  }
})

export default HelloWorld;
/*export default class HelloWorld extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired, // this is passed from the Rails view
  };

  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   * /
  constructor(props, _railsContext) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = { name: this.props.name };
  }
  updateName = (name) => {
    this.setState({ name });
  };
  render() {
    return (
      <div>
        <h3> Hello, {this.state.name}! </h3>
        <hr />
        <form >
          <label htmlFor="name"> Say hello to:</label>
          <input id="name" type="text" value={this.state.name} onChange={(e) => this.updateName(e.target.value)} />
        </form>
      </div>
    );
  }
}*/
