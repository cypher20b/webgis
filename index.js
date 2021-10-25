const { Pool, Client } = require('pg')
const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = 3002

app.use(express.urlencoded({ extended: false })) 
app.use(express.urlencoded({extended: true})); 
app.use(express.json());


let container=[];
const client = new Client({
  connectionString: "postgres://rmpponfcllwljz:ab99dcee3e4b2117670f5b6e5a6974942adb5ced53eacb0ced7872a7f72748df@ec2-34-233-64-238.compute-1.amazonaws.com:5432/dc7577bajp72et",
  ssl: {
    rejectUnauthorized: false
  }
})
client.connect()

// beginning of routes
app.get('/', (req, res) => {
      client
    .query('SELECT gid, prop_id,  landuse, locality, plot_no, shape_area, block_no_1, owner_past, owner_curr, litigation, lease_star, lease_end, mortgage_v FROM c25new')
    .then(dbres => {
      // console.log(res.rows)
      res.send(dbres.rows)
      // client.end()
    })
    .catch(e => {
      console.error(e.stack)
      client.end()
    })
})

app.get('/all', (req, res) => {
  client
.query('SELECT * FROM c25new')
.then(dbres => {
  console.log(dbres.rows)
  res.send(dbres.rows)
  // client.end()
})
.catch(e => {
  console.error(e.stack)
  client.end()
})
})
app.post('/authusers', (req, res) => {
  // console.log(req.body);
  client
.query(`SELECT * FROM users `)
.then(dbres => {
  console.log(dbres.rowCount)
  for (let i = 1; i < dbres.rowCount; i++) {
    if (dbres.rows[i].username===`${req.body.username}`&& dbres.rows[i].password===`${req.body.password}`) {
      container.push(dbres.rows[i])
    }
    
  }
  if (container.length>0) {
    res.send(true)
    container=[];
  } else{
    res.send(false)
  }
  // res.send(true)
  // client.end()
})
.catch(e => {
  res.send(false)
  console.error(e.stack)
  // client.end()
})
})

app.post('/users', function (req, res) {
  console.log(req.body);
  let newid=0;
  client
.query(`SELECT * FROM users`)
.then(dbres => {
  console.log(dbres.rowCount)
  // res.send(dbres.rows)
  // client.end()
  newid= dbres.rowCount + 1
  client.query(`INSERT INTO users (id, username, password, fullname) VALUES ('${newid}','${req.body.username}', '${req.body.password}','${req.body.fullname}') RETURNING *`)
  .then(result => {
    console.log(result.rowCount)
    res.send(result.rowCount + 'Sucessfull')
    console.log("Sucessfull")
    // client.end()
  })
  .catch(e => {
    res.send("faileye")
    console.error(e)
    // client.end()
  })

})
.catch(e => {
  console.error(e.stack)
  // client.end()
})
   
  
})

app.post('/', function (req, res) {
  console.log(req.body);
  // res.send(req.body)
  // res.send('Got a POST request')
    // client.connect()
    client.query(`INSERT INTO c25new (prop_id, landuse, locality, plot_no, shape_area, block_no_1, owner_past, owner_curr, litigation, lease_star, lease_end, mortgage_v) VALUES ('${req.body.prop_id}', '${req.body.landuse}', '${req.body.locality}', '${req.body.plot_no}', '${req.body.shape_area}', '${req.body.block_no_1}', '${req.body.owner_past}', '${req.body.owner_curr}', '${req.body.litigation}', '${req.body.lease_star}', '${req.body.lease_end}', '${req.body.mortgage_v}') RETURNING *`)
  .then(result => {
    // console.log(result.rows)
    res.send('"Sucessfull"')
    console.log("Sucessfull")
    // client.end()
  })
  .catch(e => {
    res.send('"failed"')
    console.error(e.stack)
    client.end()
  })

  
})

app.put('/update', function (req, res) {
  res.send('Got a PUT request at /user')

  // function updateAny() {
  //   client.connect()
    client.query(`UPDATE c25new SET (prop_id, landuse, locality, plot_no, shape_area, block_no_1, owner_past, owner_curr, litigation, lease_star, lease_end, mortgage_v) = ('${req.body.prop_id}', '${req.body.landuse}', '${req.body.locality}', '${req.body.plot_no}', '${req.body.shape_area}', '${req.body.block_no_1}', '${req.body.owner_past}', '${req.body.owner_curr}', '${req.body.litigation}', '${req.body.lease_star}', '${req.body.lease_end}', '${req.body.mortgage_v}') WHERE gid = 30 RETURNING *`)
  .then(res => {
      console.log(res.rows)
      // client.end()
    })
    .catch(e => {
      console.error(e.stack)
      // client.end()
    })
  }

//   function singleUpdate() {
//     client.connect()
//       client.query("UPDATE c25new SET plot_no=26 WHERE gid = 1 RETURNING *")
//     .then(res => {
//       console.log(res.rows)
//       client.end()
//     })
//     .catch(e => {
//       console.error(e.stack)
//       client.end()
//     })
      
//   // }
// }
)

app.delete('/delete/:id', function (req, res) {
  
  let ok=res
    // client.connect()
    client.query(`DELETE FROM c25new WHERE gid = ${req.params.id}`).then(res => {
      console.log(res.rowCount)
      ok.send(`Sucessfully deleted user with id ${req.params.id}`)
      console.log(`Sucessfully deleted user ${req.params.id}`)
      // client.end()
    })
    .catch(e => {
      console.error(e.stack)
      // client.end()
    }) 
  
})


//  end of Routes
 








app.listen(process.env.PORT||port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
