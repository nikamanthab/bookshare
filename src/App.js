import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Landing from './pages/landing'
import Buy from './pages/buy'
import PhotoUpload from './pages/photoUpload'
import Form from './pages/form'
import Login from './pages/login'
import 'bootstrap/dist/css/bootstrap.min.css'
import './all.css'
import firebase from 'firebase';


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB_2RnldFiNWkAiMKSbVYeHzi4bXGhI6nY",
  authDomain: "n4bookshare.firebaseapp.com",
  databaseURL: "https://n4bookshare.firebaseio.com",
  projectId: "n4bookshare",
  storageBucket: "",
  messagingSenderId: "518519623399",
  appId: "1:518519623399:web:b1b8f886c1f2c484"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class App extends React.Component {

  state = {
    page:"login",
    username:"",
    photo:"",
    phone:null
  }

  handlesetState = (obj)=>{
    this.setState(obj)
  }

  changePage = (page)=>{
    this.setState({page});
  }

  render = ()=>{ 
    
    let pageprepare = <div></div>
    if(this.state.page === "landing"){
      pageprepare = <Landing changePage={this.changePage}/>
    }
    else if(this.state.page === "login"){
      pageprepare = <Login 
        photo={this.state.photo}
        username={this.state.username}
        phone={this.state.phone}
        handlesetState = {this.handlesetState}
        changePage={this.changePage}/>
    }
    else if(this.state.page === "buy"){
      pageprepare = <Buy changePage={this.changePage}/>
    }
    else if(this.state.page === "photoUpload"){
      pageprepare = <PhotoUpload changePage={this.changePage}/>
    } 
    else if(this.state.page === "form"){
      pageprepare = <Form changePage={this.changePage}/>
    }


    return (
      <div className="App">
        {pageprepare}
      </div>
  );
  }
}

export default App;
