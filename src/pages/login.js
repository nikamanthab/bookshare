import React from 'react';
import {Button} from 'react-bootstrap';
import * as firebase from 'firebase';
import 'firebase/firebase-auth';
import {addUser, getAllUser} from './../utils/db';
import OrbitDB from 'orbit-db';
import logo from './../assets/mainpagelogo.png';
import {Input} from 'semantic-ui-react';
import IPFS  from 'ipfs';
const ipfsOptions = {
    EXPERIMENTAL: {
      pubsub: true
    }
  }
  

class Login extends React.Component{
    state={
        loggedIn:false,
        newAccount:false,
        msg:""
    }

    
    
    handleSignIn = ()=>{
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(async(result)=> {
            var token = result.credential.accessToken;
            var user = result.user;
            console.log(user);

            const ipfs = new IPFS(ipfsOptions);
            ipfs.on('error', (e) => console.error(e))
            ipfs.on('ready', async () => {
                let allusers = await getAllUser(ipfs);
                console.log(allusers);
                let newFlag = true;
                for(let ele in allusers){
                    console.log(ele);
                    if(user.displayName == allusers[ele].username){
                        newFlag = false
                    }
                }
                console.log(newFlag);
                this.setState({
                    newAccount:newFlag
                })
                
            })

            

            // addUser({
            //     username:user.displayName,
            //     phone: 9840740948
            // })

            this.setState({
                loggedIn:true,
                
            },()=>{
                this.props.handlesetState({
                    username:user.displayName,
                    photo:user.photoURL
                })
            })
          }).catch(function(error) {
            console.log(error);
          });
    }

    handleGo = ()=>{
        this.props.changePage("landing")
    }

    removeAll = ()=>{
        
        const ipfs = new IPFS(ipfsOptions);
        ipfs.on('error', (e) => console.error(e))
        ipfs.on('ready', async () => {
                const orbitdb = await OrbitDB.createInstance(ipfs)
                const db = await orbitdb.feed('n4users1')
                console.log(db);
                await db.load()

                // Query
                const result = await db.iterator({ limit: -1 }).collect()
                console.log(result)

                for(let e of result){
                    console.log("removing:",e)
                    await db.remove(e.hash)
                }
                
            })
    }

    addNewUser = async ()=>{
        console.log("adding new user")
        // Create IPFS instance
        const ipfs = new IPFS(ipfsOptions);
        ipfs.on('error', (e) => console.error(e))
        ipfs.on('ready', async () => {
            await addUser({
                username:this.props.username,
                phone:this.props.phone,
                photo:this.props.photo
            },ipfs)
            console.log("added new user")
            this.props.changePage("landing");
        })
    }

    handleInputChange = (e)=>{
        this.props.handlesetState({
            phone:e.target.value
        })
    }

    render = ()=>{

        let phoneIn = <div>
            <Button onClick={this.handleGo}>></Button>
        </div>

        if(this.state.newAccount == true){
            phoneIn = (
                <div>
                    <Input type="number" value={this.props.phone} onChange={this.handleInputChange}/>
                    <Button onClick={this.addNewUser}>Submit</Button>
                </div>
            )
        }

        let content = <div></div>
        if(this.state.loggedIn == false){
            content = (
                <div>
                <div className="login-btn">
                    <Button onClick={this.handleSignIn}>Login</Button>
                </div>
                <div className="login-btn">
                <img style={{width:100,height:100}} src={logo} alt="nitin"/>
                </div>
                </div>
            )
        }
        else{
            content = (
            <div >
                <div className="login-btn">
                    <h1>{"Hi ,"+this.props.username}</h1>
                </div>
                <div className="profile-btn">
                    <img alt="photo" className="profilepic center-div" src={this.props.photo}/>    
                </div>
                <div className="login-btn">
                    {phoneIn}
                </div>
            </div>
            )
        }
        return(
            <div>
                <Button onClick={this.removeAll}>removeallusers</Button>
                {content}
            </div>
        )
    }
}

export default Login;