import React from 'react';
import Button from 'react-bootstrap/Button';
import book from './../assets/open-book.svg';
import money from './../assets/money-bag.svg';

class Landing extends React.Component{
    render = ()=>{
        return(
            <div class="center-div">
                <div class="padding-10">
                    <Button variant="warning" onClick={()=>this.props.changePage("photoUpload")}>
                        <img src={money} style={Styles.img1} alt="sell"/>
                        <h3 style={Styles.text}>Sell</h3>
                    </Button>
                </div>
                <div>
                    <Button variant="warning" onClick={()=>this.props.changePage("buy")}>
                        <img src={book} style={Styles.img1} alt="buy"/>
                        <h3 style={Styles.text}>Buy</h3>
                    </Button>
                </div>
            </div>
        )
    }
}

export default Landing;

const Styles={
    img1:{
        height:100,
        width:100,
        margin:10
    },
    text:{
        color:"white",
    }
}