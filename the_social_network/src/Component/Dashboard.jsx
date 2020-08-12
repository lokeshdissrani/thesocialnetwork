import React from 'react';
import styled from "styled-components";

const Card = styled.div`
    padding:10px;
    margin: 0 auto;
    height:415px;
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
    height:80px;
    & > button{
        float:right;
        padding:20px;
        width:150px;
        background:white;
        outline:none;
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
    padding:10px;
    background:white;
    color:blue;
`

const Temp = styled.div`
    float:left;
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
                <Logout><button onClick={this.props.logout}>Logout</button></Logout>
                <F>
                    <form onSubmit={this.statusposting}>
                            <Temp>
                            <Big><b>{current}</b></Big>
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
                            
                            {current in item.liked && <Newbutton onClick={()=>this.disliking(index)}>Dislike</Newbutton>}
                            {!(current in item.liked) && <Newbutton onClick={()=>this.liking(index)}>Like</Newbutton>}
                            <Big>{Object.keys(item.liked).length} Likes {item.comments.length} Comments</Big>
                        </Left>
                        <Right>
                            <button onClick={()=>this.likeflag(index)} >Wholiked</button>
                            {item.likeflag &&  <ul>{Object.keys(item.liked).map((item)=>(
                                <li>{item}</li>
                            ))}</ul>}
                            <div>
                                    {item.comments.length>0 && item.comments.map((item)=>(
                                        <div>
                                            <div><Big><b>{item.creator}</b></Big> {item.text}</div>
                                        </div>		
                            ))}
                            <Big1><b>{current}</b></Big1>
                            <textarea rows="4" cols="30" onChange={this.posting} name="comment"></textarea>
                            <button onClick={()=>this.postcommenting(index)}>Post Comment</button>
                            </div>
                        </Right>
                    </div>
                </Card>))}
            </div>
        )
    }
}