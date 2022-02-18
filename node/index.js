const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sqlCreateTable = `CREATE TABLE IF NOT EXISTS people(name varchar(250))`
connection.query(sqlCreateTable)

connection.query(`INSERT INTO people(name) values('Joao da Silva')`)
connection.query(`INSERT INTO people(name) values('Maria da Silva')`)
connection.query(`INSERT INTO people(name) values('Francisco da Silva')`)
connection.query(`INSERT INTO people(name) values('José da Silva')`)


var peoples = [];
connection.query("SELECT name FROM people", function (err, result, fields) {
    if (result != undefined) {
        Object.keys(result).forEach(function(key) {
            peoples.push(result[key].name)
        });
    }
})

connection.end()

app.get('/', (req,res) => {
    res.set('Content-Type', 'text/html')
    res.write('<h1>Full Cycle</h1>')
    peoples.forEach(function(value){
        res.write(value + "<br \>")
    })
    res.end();
   
})

app.listen(port, ()=> {})