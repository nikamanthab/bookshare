import React from 'react';
import {getAllBooks,getAllUser} from './../utils/db';
import './../assets/buy.css';
import {Button} from 'semantic-ui-react';
import {Grid} from 'semantic-ui-react';
import OrbitDB from 'orbit-db';


import IPFS  from 'ipfs';
const ipfsOptions = {
    EXPERIMENTAL: {
      pubsub: true
    }
  }

class Buy extends React.Component{
    state = {
        response:[]
    }
    componentDidMount = ()=>{

        console.log("adding new user")
        // Create IPFS instance
        const ipfs = new IPFS(ipfsOptions);
        ipfs.on('error', (e) => console.error(e))
        ipfs.on('ready', async () => {
            let result = await getAllBooks(ipfs);
            let people = await getAllUser(ipfs);
            this.setState({
                response:result,
                people:people
            })
        })
        
    }

    removeAll = ()=>{
        
        const ipfs = new IPFS(ipfsOptions);
        ipfs.on('error', (e) => console.error(e))
        ipfs.on('ready', async () => {
                const orbitdb = await OrbitDB.createInstance(ipfs)
                const db = await orbitdb.feed('n4books1')
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

    onSold =(title)=>{
        console.log("sold clicked...");
        const ipfs = new IPFS(ipfsOptions);
        ipfs.on('error', (e) => console.error(e))
        ipfs.on('ready', async () => {
                const orbitdb = await OrbitDB.createInstance(ipfs)
                const db = await orbitdb.feed('n4books1')
                console.log(db);
                await db.load()

                // Query
                const result = await db.iterator({ limit: -1 }).collect()
                console.log(result)
                let hash;
                for(let e of result){
                    console.log("searching:",JSON.parse(e["payload"]["value"])["title"],title)
                    if(JSON.parse(e["payload"]["value"])["title"] == title) await db.remove(e.hash)
                }
                this.render();
                
            })
    }

    render = ()=>{
        console.log("buy state:",this.state)

        let list = this.state.response.map(ele=>{
            let confirm = ((this.props.username == ele.username)?<Button onClick={()=>this.onSold(ele.title)}>Sold</Button>:<div></div>)
            return (
                <div className={"book-card"}>
                    <h2>
                        {ele.title}
                    </h2>
                    <h3>
                        {ele.author}
                    </h3>
                    <div>
                        {ele.price}
                    </div>
                    <div style={{paddingLeft:20}}>
                        <Grid>
                            <Grid.Row columns={3}>
                                <Grid.Column width={5}>
                                    <img style={{width:40,borderRadius:20}} src={ele.photo} alt={"nitin"}/>
                                </Grid.Column>
                                <Grid.Column  width={5}>
                                    {ele.username}
                                </Grid.Column>
                                <Grid.Column  width={5}>
                                    {ele.phone}
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                    <div>{confirm}</div>
                </div>
            )
        })

        return(
            <div>
                <Button onClick={this.removeAll}>Remove</Button>
                {list}
            </div>
        )
    }
}

export default Buy;