import React from 'react';

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
        console.log(typeof date1);
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
        return(
            <div>
                <button onClick={this.props.logout}>Logout</button>
                <div>
                    <form onSubmit={this.statusposting}>
	                <h1>{current}</h1>
	                <textarea onChange={this.posting} name="post"></textarea>
	                <input onChange={this.posting} name="src"></input>
                    <button type="submit">Post Status</button>
                    </form>
                </div>
            {array.length>0 && array.map((item,index)=>(
	            <div>
                    <h1>{item.creator}</h1>
                    <h5>{item.date}</h5>
	                <h3>{item.text}</h3>
	                <img src={item.src} alt="logo" width="100px" height="100px" />
	                {current in item.liked && <button onClick={()=>this.disliking(index)}>Dislike</button>}
                    {!(current in item.liked) && <button onClick={()=>this.liking(index)}>Like</button>}
                    {item.comments.length} Comments
                    <button onClick={()=>this.commentflag(index)}>Comments</button>
                    {Object.keys(item.liked).length} Likes
                    <button onClick={()=>this.likeflag(index)} >Wholiked</button>
                    <ul>{item.likeflag && Object.keys(item.liked).map((item)=>(
                        <li>{item}</li>
                    ))}</ul>
	                {item.commentflag && <div>
			                {item.comments.length>0 && item.comments.map((item)=>(
				                <div>
					                <div>{item.creator}</div>
					                <div>{item.text}</div>
				                </div>		
                    ))}
                    {current}
                    <textarea onChange={this.posting} name="comment"></textarea>
                    <button onClick={()=>this.postcommenting(index)}>Post Comment</button>
		        </div>}

            </div>))}
</div>
        )
    }
}