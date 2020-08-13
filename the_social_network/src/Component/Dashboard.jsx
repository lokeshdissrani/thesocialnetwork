import React from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp,faThumbsDown, faComments} from '@fortawesome/free-solid-svg-icons'

const Card = styled.div`
    padding:10px;
    margin: 0 auto;
    height:430px;
    margin-top: 20px;
    border:1px solid red;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 70%;
    &:hover{
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
`
const Logout = styled.div`
    width:100%;
    height:50px;
    & > button{
        float:right;
        padding:20px;
        width:150px;
        background:white;
        outline:none;
        border-radius:10px;
        &:hover{
            background:red;
            color:white;
        }
    }    
`

const F = styled.div`
    margin: 0 auto;
    width:70%;
    height:100px;
    padding:10px;
    border: 1px solid black;
    
`
const Left =styled.div`
    width:60%;
    height:300px;
    padding:5px;
    float:left`


const Right = styled.div`
    width:30%;
    height:300px;
    padding:5px;
    float:left;
    
`

const Post = styled.button`
    background: green;
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
`
const Big = styled.span`
    font-size:20px;
`

const UserName = styled.span`
    font-size:50px;
    margin:10px;
`
const Big1 = styled.span`
    font-size:20px;
    color:orange;
`
const  User = styled.span`
    font-size:30px;
`
const Dating = styled.span`
    font-size:10px;
`
const Text = styled.span`
    font-size:25px;
`
const Newbutton = styled.button`
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

`
const Button = styled.button`
    padding:10px;
    background:white;
    border-radius:10px;
    width:200px;
    &:hover{
        background:olive;
        color:black;
    }
`
const LikeCom = styled.span`
    font-size:30px;
    margin-left:35px;
`

const Temp = styled.div`
    float:left;
    margin-right:35px;
`
const Logo = styled.span`
    font-size:50px;
    color:rgb(24, 119, 242);
    margin:10px;
`
export default class Dashboard extends React.Component{
    constructor(props){
        super(props)
        this.state={
            post:'',
            src:'',
            comment:'',
            data:[],
            current:'',
        }

    }
    posting=(e)=>{
        this.setState({[e.target.name]:e.target.value})
        
    }
    statusposting=(e)=>{
        e.preventDefault();
        console.log(this.state.src)
        var x=localStorage.getItem('universal_posts')
        var array;
        if(x==null){
            array=[];
        }
        else{
          array=JSON.parse(x);
        }
        var current=localStorage.getItem('current')
        var date1=new Date();
        
        var object={'creator':current,'text':this.state.post, 'src':this.state.src, liked:{},commentflag:false,likeflag:false,comments:[],'date':date1.toString()}
        array.unshift(object);
        localStorage.setItem('universal_posts',JSON.stringify(array));
        this.setState({post:'',src:'',data:[...array],current:current});

    }
    disliking=(index)=>{
        var x=localStorage.getItem('universal_posts')
        var array=JSON.parse(x);
        var current=localStorage.getItem('current')
        delete array[index].liked[current];
        localStorage.setItem('universal_posts',JSON.stringify(array));
        this.setState({post:'',src:'',data:[...array],current:current});

    }
    liking=(index)=>{
        var x=localStorage.getItem('universal_posts')
        var array=JSON.parse(x);
        var current=localStorage.getItem('current')
        array[index].liked[current]=1;
        localStorage.setItem('universal_posts',JSON.stringify(array));
        this.setState({post:'',src:'',data:[...array],current:current});

    }
    commentflag=(index)=>{
        var x=localStorage.getItem('universal_posts')
        var array=JSON.parse(x);
        array[index].commentflag=!array[index].commentflag;
        localStorage.setItem('universal_posts',JSON.stringify(array));
        this.setState({post:'',src:'',data:[...array]});
    }
    likeflag=(index)=>{
        var x=localStorage.getItem('universal_posts')
        var array=JSON.parse(x);
        array[index].likeflag=!array[index].likeflag;
        localStorage.setItem('universal_posts',JSON.stringify(array));
        this.setState({post:'',src:'',data:[...array]});
    }
    postcommenting=(index)=>{
        var x=localStorage.getItem('universal_posts')
        var array=JSON.parse(x);
        var current=localStorage.getItem('current')
        var object={'creator':current,'text':this.state.comment}
        array[index].comments.push(object);
        localStorage.setItem('universal_posts',JSON.stringify(array));
        this.setState({comment:'',data:[...array],current:current});
    }
    componentDidMount(){
        var x=localStorage.getItem('universal_posts');
        
        var array;
        if(x==null){
            array=[];
        }
        else{
          array=JSON.parse(x);
        }
        
        var current=localStorage.getItem('current');
        for(var i=0;i<array.length;i++){
            array[i].commentflag=false;
            array[i].likeflag=false;
        }
        this.setState({data:[...array],current:current})
    }
    render(){
        var array=[...this.state.data];
        var current=this.state.current;
        console.log(array);
        console.log(this.state.src);
        return(
            <div>
                <div>
                    <Logo><b>The Social Network</b></Logo>
                    <Logout><button onClick={this.props.logout}>Logout</button></Logout>
                </div>
                <F>
                    <form onSubmit={this.statusposting}>
                            <Temp>
                            <UserName><b>{current}</b></UserName>
                            </Temp>
                            <Temp>
                            <textarea rows="4" cols="50" onChange={this.posting} name="post" placeholder="Whats on your mind?"></textarea><br></br>
                            <input onChange={this.posting} name="src" placeholder="Enter Image src here"></input>
                            </Temp>
                            <Temp>
                            <Post type="submit">Post Status</Post>
                            </Temp>
                    </form>
                </F>
                {array.length>0 && array.map((item,index)=>(
                <Card>
                    <div>
                        <Left>
                            <User>{item.creator}</User><br></br>
                            <Dating>{item.date}</Dating><br></br>
                            <Text>{item.text}</Text><br></br>
                            <img src={item.src} width="90%" height="90%" alt="logo" />
                            <br></br>
                            
                            {current in item.liked && <Newbutton onClick={()=>this.disliking(index)}><FontAwesomeIcon icon={faThumbsDown} /></Newbutton>}
                            {!(current in item.liked) && <Newbutton onClick={()=>this.liking(index)}><FontAwesomeIcon icon={faThumbsUp} /></Newbutton>}
                            <LikeCom>{Object.keys(item.liked).length} <FontAwesomeIcon icon={faThumbsUp} /> Likes</LikeCom> <LikeCom> {item.comments.length} <FontAwesomeIcon icon={faComments} /> Comments</LikeCom>
                        </Left>
                        <Right>
                            <Button onClick={()=>this.likeflag(index)} >Wholiked</Button>
                            {item.likeflag &&  <ul>{Object.keys(item.liked).map((item)=>(
                                <li>{item}</li>
                            ))}</ul>}
                            <div>
                                    {item.comments.length>0 && item.comments.map((item)=>(
                                        <div>
                                            <div style={{border:"1px solid black"}}><Big style={{color:"darkgoldenrod"}}><b>{item.creator}</b></Big> {item.text}</div>
                                        </div>		
                            ))}
                            <Big1><b>{current}</b></Big1>
                            <textarea rows="1" cols="55" onChange={this.posting} name="comment"></textarea>
                            <Button onClick={()=>this.postcommenting(index)}>Post Comment</Button>
                            </div>
                        </Right>
                    </div>
                </Card>))}
            </div>
        )
    }
}