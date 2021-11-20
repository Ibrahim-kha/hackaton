import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
class App extends Component {
  constructor(){
    super();
    this.state={
      pictures:[],
      search:"starti",
      change:""
    };
    this.handle=this.handle.bind(this);
    this.showing=this.showing.bind(this);
    this.handleChange=this.handleChange.bind(this);
  }
  handle=()=>  {
    this.setState({search:this.state.change});
  }
  handleChange=(e)=>{
    this.setState({change:e.target.value});
  }
  showing=(show)=>{
    console.log(show);
    if(show!="starti")
    fetch('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=29afee6c3c9f14022ab2eb8a628f7a59&tags='+show+'&format=json&nojsoncallback=1')
    .then(function(res){
      return res.json();
    })
    .then(function(j){
      let picArray=j.photos.photo.map((pic)=>{
      var path='https://farm'+pic.farm+'.staticflickr.com/'+pic.server+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';      
      return (
        <img width="400px" height="300px" src={path}></img>
      )
      })
      this.setState({pictures:picArray});
    }.bind(this))
  }
  componentDidUpdate(prev,pres){
    //console.log(this.state.search);
    this.showing(this.state.search);
  }
  componentDidMount(){
    fetch('https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=ed60bc08152c27aab9c70759062b88d5&format=json&nojsoncallback=1')
    .then(function(res){
      return res.json();
    })
    .then(function(j){
      let picArray=j.photos.photo.map((pic)=>{
      var path='https://farm'+pic.farm+'.staticflickr.com/'+pic.server+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';      
      return (
        <img width="200px" height="300px" src={path}></img>
      )
      })
      this.setState({pictures:picArray});
    }.bind(this))
  }
  render(){
  return (
    <div className="App">
      <div   style={{backgroundColor:"black",height:"90px",width:"900px",margin:"auto"}}><input className="searchInput" onChange={this.handleChange} style={{marginTop:"50px"}}></input><buuton style={{backgroundColor:"white", margin:"10px" ,height :"50px",cursor:"pointer"}} onClick={()=>this.handle()}>Click</buuton></div>
      <div className="App" style={{width:"900px",margin:"auto",marginTop:"30px"}}>{this.state.pictures}</div>
    </div>
  );
    }
}

export default App;
