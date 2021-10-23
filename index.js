const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;
const { MongoClient } = require('mongodb');
app.use(cors());
app.use(express.json());

//mongoDB connection source
const uri = "mongodb+srv://YASIN440:SOSahuAp986qk0Yz@cluster0.nort6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      const database = client.db("test");
      const userCollection = database.collection("devices");
      // create a document to insert
      const doc = {
        id: 3,
        userName: 'robin', 
        education: 'BSC in Mechanical',
        job: 'student'
      }
      const result = await userCollection.insertOne(doc);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
// const collection = client.db("test").collection("devices");
// // perform actions on the collection object
// console.log('hitting the database');
// client.connect(err => {
//     const user = { id: 4, userName: 'nayeem', education: 'BSC in glass', job: 'student' };
//     collection.insertOne(user)
//         .then(() => {
//             console.log('insert successfully');
//         })

//     // client.close();
// });


//for check express working
app.get('/', (req, res) => {
    res.send('hello')
});

//mongoDB Username and Password
//user: YASIN440
//pass: SOSahuAp986qk0Yz

//dynamic url
const users = [
    { id: 0, userName: 'yasin', education: 'BSC in CSE', job: 'student' },
    { id: 1, userName: 'nasim', education: 'BSC in EEE', job: 'student' },
    { id: 2, userName: 'jakir', education: 'BSC in medicine', job: 'student' },
    { id: 3, userName: 'robin', education: 'BSC in Mechanical', job: 'student' },
    { id: 4, userName: 'nayeem', education: 'BSC in glass', job: 'student' },
    { id: 5, userName: 'joy', education: 'honers', job: 'student' },
    { id: 6, userName: 'jubayer', education: 'MBA', job: 'student' }
]


// search by name or anything else
app.get('/users', (req, res) => {
    const search = req.query.search;
    //----------(ternary operator..)
    // search ? res.send(users.filter(u => u.userName.toLocaleLowerCase().includes(search))) : res.send(users)

    if (search) {
        const searchResult = users.filter(u => u.userName.toLocaleLowerCase().includes(search))
        res.send(searchResult);
    }
    else {
        res.send(users);
    }
});


//search with index.
app.get('/users/:id', (req, res) => {
    const index = req.params.id;
    const user = users[index];
    res.send(user);
})

//add data from UI with app>METHOD
app.post('/users', (req, res) => {
    const newUser = req.body;
    // console.log(newUser);
    newUser.id = users.length;
    users.push(newUser);
    // res.send(JSON.stringify(newUser))
    res.json(newUser);

})

app.listen(port, () => {
    console.log('listening to port', port);
});