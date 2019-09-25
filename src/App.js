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
import 'semantic-ui-css/semantic.min.css'




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
    username:"Nitin Nikamanth",
    photo:"https://lh3.googleusercontent.com/a-/AAuE7mA7fTPD05uyYGOMnVmw6UTZwx0CydIqRvCRXT9AsQ" ,//""
    phone:"9840740948" //null
  }

  handlesetState = (obj)=>{
    this.setState(obj)
  }

  changePage = (page)=>{
    console.log("page:",page);
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
      pageprepare = <Buy 
        username={this.state.username}
        changePage={this.changePage}/>
    }
    else if(this.state.page === "photoUpload"){
      pageprepare = <PhotoUpload changePage={this.changePage}/>
    } 
    else if(this.state.page === "form"){
      pageprepare = <Form 
          changePage={this.changePage}
          username={this.state.username}
          phone={this.state.phone}
          photo={this.state.photo}
        />
    }


    return (
      <div className="App">
        {pageprepare}
      </div>
  );
  }
}

export default App;
