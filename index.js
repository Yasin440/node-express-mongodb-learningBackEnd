const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;
const ObjectId = require('mongodb').ObjectId;
const { MongoClient } = require('mongodb');
//mongoDB Username and Password
//user: YASIN440
//pass: SOSahuAp986qk0Yz


//middleware
app.use(cors());
app.use(express.json());

//mongoDB connection source
const uri = "mongodb+srv://YASIN440:SOSahuAp986qk0Yz@cluster0.nort6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        const database = client.db("friend-circle");
        const userCollection = database.collection("friends");
        //GET API
        app.get('/users', async (req, res) => {
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
        })
        //------------update API
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.findOne(query);
            res.send(result);
        })
        // POST API
        app.post('/users', async (req, res) => {
            const newFriend = req.body;
            const result = await userCollection.insertOne(newFriend);
            res.json(result);
        })
        //UPDATE API
        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;
            const updateUser = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    education: updateUser.education,
                    job: updateUser.job,
                },
            };
            const result = await userCollection.updateOne(filter, updateDoc, options);
            res.send(result);

        })
        //DELETE API
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            console.log(result);
            res.send(result);
        })


    } finally {
        // await client.close();
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


///---for check express working(heard code)
app.get('/', (req, res) => {
    res.send('hello')
});


////---dynamic url hardCode data
// const users = [
//     { id: 0, userName: 'yasin', education: 'BSC in CSE', job: 'student' },
//     { id: 1, userName: 'nasim', education: 'BSC in EEE', job: 'student' },
//     { id: 2, userName: 'jakir', education: 'BSC in medicine', job: 'student' },
//     { id: 3, userName: 'robin', education: 'BSC in Mechanical', job: 'student' },
//     { id: 4, userName: 'nayeem', education: 'BSC in glass', job: 'student' },
//     { id: 5, userName: 'joy', education: 'honers', job: 'student' },
//     { id: 6, userName: 'jubayer', education: 'MBA', job: 'student' }
// ]



////-----add data from UI with app>METHOD
// app.post('/users', (req, res) => {
//     const newUser = req.body;
//     // console.log(newUser);
//     newUser.id = users.length;
//     users.push(newUser);
//     // res.send(JSON.stringify(newUser))
//     res.json(newUser);
// })


// //----- search by name or anything else
// app.get('/users', (req, res) => {
//     const search = req.query.search;
//     //----------(ternary operator..)
//     // search ? res.send(users.filter(u => u.userName.toLocaleLowerCase().includes(search))) : res.send(users)

//     if (search) {
//         const searchResult = users.filter(u => u.userName.toLocaleLowerCase().includes(search))
//         res.send(searchResult);
//     }
//     else {
//         res.send(users);
//     }
// });


// //----search with index.
// app.get('/users/:id', (req, res) => {
//     const index = req.params.id;
//     const user = users[index];
//     res.send(user);
// })


app.listen(port, () => {
    console.log('listening to port', port);
});