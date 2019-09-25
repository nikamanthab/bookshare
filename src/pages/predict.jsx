import React from 'react';
import { model } from '@tensorflow/tfjs';
import * as tf from '@tensorflow/tfjs';
import CLASSES from './../assets/model/classes';
import modelfile from './../assets/model/model.json';
import {Button} from 'semantic-ui-react';
// import image from './images/test.jpg';
class Predict extends React.Component{

    state = {
        image:"",
        prediction:""
    }

    constructor(props) {
        super(props);
        this.myimg = React.createRef();
      }

    componentDidMount = ()=>{
        // console.log(modelfile)
        (async ()=>{
            let model = await tf.loadLayersModel('http://127.0.0.1:5000/model.json');
            this.setState({model:model},()=>{
                console.log("model loaded")
                alert("model loaded")
            })
        })();
    }

    handleImageUpload = (eve)=>{
        console.log(eve.target.files[0]);
        let file = eve.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ()=>{
            let dataURL = reader.result;
            console.log(dataURL);
            this.setState({
                image:dataURL
            })
        }
    }

    handlePredict = async (eve)=>{
        let tensor = tf.browser.fromPixels(this.myimg.current)
        .resizeNearestNeighbor([64,64])
        .toFloat()
        .expandDims();
        console.log(tensor);
        console.log(this.state.model);
        let predictions = await this.state.model.predict(tensor).data();
        let pred;
        if(predictions[0]==1)
            pred = "book"
        else 
            pred = "badbook"
        console.log(pred);
        this.setState({prediction:pred});
    }

    handleProceed = ()=>{
        if(this.state.prediction == "book"){
            this.props.changePage('form')
        }
        else{
            alert("upload a good book!");
        }
    }

    render = ()=>{
        return(
        <div>
            <input type="file" onChange={this.handleImageUpload}/>
            <button onClick={this.handlePredict}>predict</button>
            <div className="result">{this.state.prediction}</div>
            <img onClick={this.handlePredict} ref={this.myimg} src={this.state.image} alt="img not loaded" style={{width:300}}></img>
            <Button color='orange' onClick={()=>{this.handleProceed()}}>Proceed</Button>
        </div>
        )
    }
}

export default Predict;