import IPFS  from 'ipfs';
import OrbitDB from 'orbit-db';

const ipfsOptions = {
    EXPERIMENTAL: {
      pubsub: true
    }
  }

  export const getAllBooks = async (ipfs)=>{
    
    const orbitdb = await OrbitDB.createInstance(ipfs)

    // Create / Open a database
    const db = await orbitdb.feed('n4books1')
    console.log(db);
    await db.load()

    // Query
    const result = await db.iterator({ limit: -1 }).collect()
    console.log(result)

    let ele;
    console.log("nitin1");
    let myres = [];

    for(let ele of result){
        let userobj = {};
        userobj["hash"] = ele.hash;
        let value = ele.payload.value;
        let valueobj = JSON.parse(value);
        myres.push(valueobj);
    }
        return myres;


}

  export const addBook = async (obj,ipfs)=>{
    
    const orbitdb = await OrbitDB.createInstance(ipfs)
    // Create / Open a database
    const db = await orbitdb.feed('n4books1')
    console.log(db);
    await db.load()

    // Listen for updates from peers
    // db.events.on('replicated', (address) => {
    //     console.log(db.iterator({ limit: -1 }).collect())
    // })

    // Add an entry
    const hash = await db.add(JSON.stringify(obj))
    console.log(hash)

    // Query
    const result = db.iterator({ limit: -1 }).collect()
    console.log("BOOKS:",result)
}

export const addUser = async (obj,ipfs)=>{
    
    const orbitdb = await OrbitDB.createInstance(ipfs)

    // Create / Open a database
    const db = await orbitdb.feed('n4users1')
    console.log(db);
    await db.load()

    // Listen for updates from peers
    // db.events.on('replicated', (address) => {
    //     console.log(db.iterator({ limit: -1 }).collect())
    // })

    // Add an entry
    const hash = await db.add(JSON.stringify(obj))
    console.log(hash)

    // Query
    const result = db.iterator({ limit: -1 }).collect()
    console.log(result)
}

export const getAllUser = async (ipfs)=>{
    
    const orbitdb = await OrbitDB.createInstance(ipfs)

    // Create / Open a database
    const db = await orbitdb.feed('n4users1')
    console.log(db);
    await db.load()

    // Query
    const result = await db.iterator({ limit: -1 }).collect()
    console.log(result)

    let ele;
    console.log("nitin1");
    let myres = [];

    for(let ele of result){
        let userobj = {};
        userobj["hash"] = ele.hash;
        let value = ele.payload.value;
        let valueobj = JSON.parse(value);
        myres.push(valueobj);
    }
        return myres;


}