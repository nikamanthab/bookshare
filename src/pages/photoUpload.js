import React from 'react';
import Predict from './predict';
import BarCode from './barcode';

class Landing extends React.Component{
    render = ()=>{
        return(
            <div>
                {/* <BarCode/> */}
                <Predict changePage={this.props.changePage}/>
            </div>
        )
    }
}

export default Landing;