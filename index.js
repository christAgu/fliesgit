const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const name = "chris";
const PORT = 8080;
const cors = require('cors');
const mysql = require('mysql2');


app.use(bodyParser.json());
app.use(cors());


//connext database




var hostname = "efs.h.filess.io";
var database = "user_sizebroken";
var port = "3307";
var username = "user_sizebroken";
var password = "938f499111b011ade8a888d870ceb9cc1c7e2f6d";

var db = mysql.createConnection({
  host: hostname,
  user: username,
  password,
  database,
  port,
});

app.get('/', function (req, res) {
    res.json(`hello u are connected`)
})

//check db connection 
db.connect(err => {
    if (err) {
        console.log(err, 'db failed');
    } else
        console.log('connected to databse  succesfully');
})

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// 


//get all data

app.get('/user', function (req, res) {
    let rqt = `select * from users`;

    db.query(rqt, (err, result) => {
        if (err) {
            console.log(err, 'err fecthing data');
        }
        if (result) {
            res.json({
                message: "data fethed",
                data: result,

            })

        }
    })
});

//get single user
app.get('/user/:id', (req, res) => {
    let id = req.params.id;

    let rqt = `select * from users where id = ${id}`

    db.query(rqt, (err, result) => {
        if (err) {
            console.log(err, 'err fecthing single id ')
        }

        if (result) {

            res.send({
                message: `user with the  id ${id} fecthed `,
                data: result
            })

            console.log('fecthed single id successfully')

        } else {
            res.send({
                message: `user with the id ${id}  could not be fecthed `
            })
        }
    })


})

//post uers

app.post('/user', (req, res) => {
    console.log(req.body, 'posted well')

    let fullname = req.body.fullname;
    let eMail = req.body.email;
    let mb = req.body.mobile;
    let id = req.body.id

    let rqt = `insert into users(id, fullname , email ,mobile)
    values('${id}','${fullname}' ,'${eMail}' ,'${mb}')`

    db.query(rqt, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send({
            message: 'inserted sucessfully'
        });


    })

})


//update data
// app.put('/user/:id', (res, req) => {

//     console.log(req.body, ' request body put')
//     let ids = req.body.id
//     let fullName = req.body.fullname;
//     let eMail = req.body.email;
//     let mb = req.body.mobile;


//     let rqt = `update users set fullname = '${fullName}' , email ='${eMail}' , mobile ='${mb}' where id = ${ids}`;

//     db.query(rqt, (err, result) => {
//         if (err) {
//             console.log(err);
//         }
//         res.send({
//             message: 'updated sucessfully'
//         });

//     });




// });


app.put("/user/:id", (req, res) => {
    const ids = req.params.id;

    const rqt = "UPDATE shell SET `fullname`=?,`email`=?,`mobile`=? WHERE id= ?";
    const values = [ /*"tilte from node ", "desc from backend", "cover from backend"*/

        req.body.fullname,
        req.body.email,
        req.body.mobile
    ]
    db.query(rqt, [...values, ids], (err, data) => {
        if (err) return res.json(err)
        return res.json("updated succesfully")
    })

})





//delete data

app.delete('/user/:id', (req, res) => {
    let g = req.params.id;
    let rqt = `delete from users where id = '${g}'`;

    db.query(rqt, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send({
            message: ' delete sucessfully'


        });
        console.log(req.body, 'deleted successfully')

    })
})

//port setting

app.listen(PORT, function () {
    console.log('listening on ' + PORT)
})