import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  text-align: center;
  margin-top: 20%;
`;

const Head = styled.div`
  flex: 1;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  font-family: sans-serif;
  border-radius: 5px;
`;

const Success = styled.button`
  background: rgb(24, 119, 242);
  color: white;
  font-size: 20px;
  padding: 10px;
  width: 200px;
  border: none;
  border-radius: 8px;
  outline: none;
  &:hover {
    color: black;
    cursor: pointer;
  }
`;

const New = styled.button`
  background: green;
  color: white;
  font-size: 17px;
  padding: 10px;
  margin: 10px;
  width: 200px;
  border: none;
  border-radius: 8px;
  outline: none;
  &:hover {
    background: greenyellow;
    color: black;
    cursor: pointer;
  }
`;
export default class Login extends React.Component {
  render() {
    return (
    
        <Container>
          <Head>
            <h1 style={{ color: "rgb(24, 119, 242)" }}>The Social Network</h1>
            <p>Let's connect and share our lives with the people.</p>
          </Head>
          <Head>
            <form onSubmit={this.props.Login}>
              <div>
                <Input
                  name="email"
                  type="text"
                  placeholder="Enter email address"
                  value={this.props.state.emailL}
                  onChange={this.props.change}
                />
              </div>
              <div>
                <Input
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  value={this.props.state.passwordL}
                  onChange={this.props.change}
                />
              </div>
              <div>
                <Success name="login">Login</Success>
              </div>
            </form>
            <div>
              <New name="signUP" onClick={this.props.signUp}>
                Create New Account
              </New>
            </div>
          </Head>
        </Container>
      
    );
  }
}
