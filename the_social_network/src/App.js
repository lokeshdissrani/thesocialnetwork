import React from 'react';
import styles from './App.module.css';
import styled from "styled-components";
import Register from "./Component/Register";
import Login from "./Component/Login";
import Dashboard from './Component/Dashboard';

const PopUP = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  padding-top: 60px;
`;
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      signUp: false,
      login:true,
    };
  }
  handlesignUp = () => {
    this.setState({
      signUp: !this.state.signUp
    });
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleLogin = (e) => {
    e.preventDefault();
    var x = localStorage.getItem("allUsers");
    var array = JSON.parse(x);
    for (var i = 0; i < array.length; i++) {
      if (
        array[i].email === this.state.email &&
        array[i].password === this.state.password
      ) {
        localStorage.setItem("current", this.state.email);
        break;
      }
    }
    this.setState({ login: !this.state.login });
  };
  handleRegister = (e) => {
    e.preventDefault();
    let user = {};
    var x = localStorage.getItem("allUsers");
    if (x == null) {
      var array = [];
    } else {
      var array = JSON.parse(x);
    }
    user.email = this.state.email;
    user.password = this.state.password;
    array.push(user);
    localStorage.setItem("allUsers", JSON.stringify(array));
  };
  
  handleLogout = () =>{
    this.setState({
      login:true
    })
  }

  render() {
    console.log(this.state);
    return (
      <div>
      {this.state.login && <div className={styles.App}>
      <Login
        state={this.state}
        signUp={this.handlesignUp}
        change={this.handleChange}
        Login={this.handleLogin}
      />
      {this.state.signUp && (
        <PopUP>
          <Register
            state={this.state}
            cancel={this.handlesignUp}
            register={this.handleRegister}
            change={this.handleChange}
          />
        </PopUP>
      )}
    </div>}
    {!this.state.login && <Dashboard logout={this.handleLogout}/>}
      </div>
    );
  }
}