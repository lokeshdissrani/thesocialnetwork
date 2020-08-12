import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  text-align: center;
  margin-top: 15%;
`;

const Head = styled.div`
  flex: 2;
`;

const Card = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 70%;
    &:hover{
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
`
const Input = styled.input`
  padding: 10px;
  margin: 10px;
  font-family: sans-serif;
  border-radius: 5px;
  font-size:larger;
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
            <h1 style={{ color: "rgb(24, 119, 242)" ,fontSize:"50px"}}>The Social Network</h1>
            <p style={{fontSize:"30px"}}>Let's connect and share<br></br> our lives with the people.</p>
          </Head>
          <Head>
            <Card>
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
          </Card>
          </Head>
        </Container>
      
    );
  }
}
