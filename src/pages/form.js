import React from 'react';
import {Input,Button} from 'semantic-ui-react';
import {addBook} from './../utils/db';

import IPFS  from 'ipfs';
const ipfsOptions = {
    EXPERIMENTAL: {
      pubsub: true
    }
  }

class Landing extends React.Component{

    state={
        title:"",
        author:"",
        price:""
    }

    addNewBook = async ()=>{
        console.log("adding new user")
        // Create IPFS instance
        const ipfs = new IPFS(ipfsOptions);
        ipfs.on('error', (e) => console.error(e))
        ipfs.on('ready', async () => {
            console.log(this.props.photo)
            await addBook({
                username:this.props.username,
                phone:this.props.phone,
                title:this.state.title,
                author:this.state.author,
                price:this.props.price,
                photo:this.props.photo
            },ipfs)
            // console.log("added new user")
            this.props.changePage("landing");
        })
    }

    handleProceed = ()=>{
        this.addNewBook();
    }

    handleInput = (type,input)=>{
        if(type==="title"){
            // console.log(this.state.title)
            this.setState({
                title:input
            })
        }
        else if(type==="author"){
            this.setState({
                author:input
            })
        }
        else if(type==="price"){
            this.setState({
                price:input
            })
        }
    }

    render = ()=>{
        return(
            <div>
                <div className="margin">
                    <h5>Enter the title:</h5>
                    <Input onChange={(e)=>this.handleInput("title",e.target.value)}/>
                </div>
                <div>
                    <h5>Enter the author:</h5>
                    <Input onChange={(e)=>this.handleInput("author",e.target.value)}/>
                </div>
                <div>
                    <h5>Enter the price:</h5>
                    <Input onChange={(e)=>this.handleInput("price",e.target.value)}/>
                </div>
                <Button color='orange' onClick={()=>{this.handleProceed()}}>Proceed</Button>
            </div>
        )
    }
}

export default Landing;