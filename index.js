const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

// initialise express and assign to app 
const app = express();
app.use(express.json())
app.use(cors())

//  hoisting the database variable
const uri = "mongodb+srv://Admin:abcd1234@clusterset1.zsuqz.mongodb.net/todoMeetings?retryWrites=true&w=majority";


// created connection object
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
let dbConnection;


// fetching data from database
client.connect((err, response)=>{
    if(err){
        return err;
    }
    dbConnection = response.db("todoMeetings")
    if (dbConnection){
        console.log("succesfully connected to MongoDB");
    }
})


app.get('/', (req, res) => {
    dbConnection.collection("Meeting").find().toArray((err, result)=>{
        if(err){
            res.status(400).send("Error fetching listings! ")
        }else{
            res.json(result);
        }
    })
})

app.post('/', (req, res)=>{
    dbConnection.collection("Meeting").insertOne(req.body).then((err, resp)=>{
        if(err){
            console.log(err);
        }
        res.send("successful")
    })
})


app.listen(8186, () => {
    console.log("Server is running on port 8186");
})



