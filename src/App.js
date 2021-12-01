import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import { useState } from 'react';

class App extends Component {
  constructor(){
    super();
    this.state={
      pictures:[],
      search:"starti",
      userSearch:[],
      change:"",
      new:0
    };
    this.handle=this.handle.bind(this);
    this.showing=this.showing.bind(this);
    this.handleChange=this.handleChange.bind(this);
   
  }
  handle=()=>  {
    this.setState({search:this.state.change});
    
    this.setState({pictures:[]});
    var val=this.state.change;
    this.setState({new:1})
    this.setState({userSearch:[...this.state.userSearch,val]});
  }
  handleChange=(e)=>{
   
    this.setState({new:0});
    this.setState({change:e.target.value});
  }
  showing=(show)=>{
    if(show!="starti"){  
    fetch('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=29afee6c3c9f14022ab2eb8a628f7a59&tags='+show+'&format=json&nojsoncallback=1')
    .then(function(res){
      return res.json();
    })
    .then(function(j){
      
      let picArray=j.photos.photo.map((pic)=>{
      var path='https://farm'+pic.farm+'.staticflickr.com/'+pic.server+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';      
      
      return path;
       // <img width="400px" height="300px" src={path} style={{cursor:"pointer"}}></img>
      
      })
      this.setState({pictures:picArray});
    }.bind(this))
  }
  
  }
  componentDidUpdate(){
 
    if(this.state.new==1){
    this.showing(this.state.search);
    }
  }
  componentDidMount(){
    fetch('https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=ed60bc08152c27aab9c70759062b88d5&format=json&nojsoncallback=1')
    .then(function(res){
      return res.json();
    })
    .then(function(j){
      let picArray=j.photos.photo.map((pic)=>{
      var path='https://farm'+pic.farm+'.staticflickr.com/'+pic.server+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';      
      
      return path;/*(
        <img width="200px" height="300px" src={path} style={{cursor:"pointer"}} ></img>
      )*/
      })
      this.setState({pictures:picArray});
    }.bind(this))
  }
  render(){
   
  return (
    <div className="App">
      <div   style={{backgroundColor:"black",height:"90px",width:"900px",margin:"auto",position:"sticky",top:"0px"}}><input className="searchInput" /*onFocus={this.showSug}*/ onChange={this.handleChange} style={{marginTop:"50px"}} id="data" list="dataList" type="text" /><datalist id="dataList">{this.state.userSearch.map((o)=>(
   <option key={o}>{o}</option>
      ))}</datalist><button style={{backgroundColor:"white" ,height :"23px",cursor:"pointer"}} onClick={this.handle}>Search</button></div>
      <Show pic={this.state.pictures}  />
    </div>
  );
  
    }
}
function  Show(props) {
 const [showphoto,setShowphoto]=useState(-1);

  function  set(pa) {
    setShowphoto(pa);
    
  }
    var phot=props.pic;
    if(showphoto==-1){
      return (<div className="App" style={{width:"900px",margin:"auto",marginTop:"30px"}}>{phot.map((val,key)=>{
        return (<img width="200px" height="300px" src={val} style={{cursor:"pointer"}} onClick={()=>set(key)}></img>)
      })}</div>)
    }
    else if(showphoto!=-1) {
      //console.log(showphoto);
      return (<div className="App" style={{width:"900px",margin:"auto",marginTop:"30px"}}>
        {phot.map((val,key)=>{
          if(key===showphoto){
        return (<img width="200px" height="300px" src={val} style={{cursor:"pointer"}} onClick={()=>setShowphoto(-1)}></img>)
    }})}
      </div>)
    }
    
  
}
export default App;
