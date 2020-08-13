import React from "react";
import styled from "styled-components";

const Content = styled.div`
  background-color: #fefefe;
  margin: 5% auto 15% auto;
  border: 1px solid #888;
  width: 400px;
  height: 80%;
  text-align: center;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  font-family: sans-serif;
  border-radius: 5px;
`;

const Success = styled.button`
  background: green;
  color: white;
  font-size: 20px;
  padding: 10px;
  width: 200px;
  border: none;
  border-radius: 8px;
  outline: none;
  &:hover {
    background: cyan;
    color: black;
    cursor: pointer;
  }
`;

const Cancel = styled.button`
  background: white;
  position: relative;
  left: 40%;
  color: black;
  font-size: 20px;
  padding: 10px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  outline: none;
  &:hover {
    color: black;
    cursor: pointer;
    background: red;
  }
`;
export default class Register extends React.Component {
  render() {
    return (
      
        <Content>
          <Cancel onClick={this.props.cancel}>X</Cancel>
          <h3>Sign Up</h3>
          <p>It's quick and easy.</p>
          <form onSubmit={this.props.register}>
            <div>
              <div>
                <Input
                  name="fname"
                  type="text"
                  placeholder="First name"
                  value={this.props.state.fname}
                  onChange={this.props.change}
                />
              </div>
              <div>
                <Input
                  name="lname"
                  type="text"
                  placeholder="Last name"
                  value={this.props.state.lname}
                  onChange={this.props.change}
                />
              </div>
            </div>
            <div>
              <Input
                name="email"
                type="email"
                placeholder="Enter email address"
                value={this.props.state.email}
                onChange={this.props.change}
              />
            </div>
            <div>
              <Input
                name="password"
                type="password"
                placeholder="New password"
                value={this.props.state.password}
                onChange={this.props.change}
              />
            </div>
            <div>
              <Success name="register">Register</Success>
            </div>
          </form>
        </Content>
      
    );
  }
}
