const express = require(`express`)
const app = express()
const fs = require(`fs`);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))
app.get('/favicon.ico', (req, res) => res.status(204));

const readFile = (path)=>{
  return new Promise(
    (resolve, reject)=>
    {
      fs.readFile(path, `utf8`, (err, data) => {
        if (err) {
         reject(err)
        }
        else
        {
          resolve(data)
        }
      });
    })
}


app.get(`/add`, (req, res)=>{
  const filePath = path.join(__dirname, `public`, `testform.html`)
  res.sendFile(filePath);
})

app.get('/jeep', async (req, res) => {
  var data = await readFile(`./data/jeep.json`);
  res.send(JSON.parse(data));
  });

app.post('/jeep', async (req, res) => { 
    var oldData =  await readFile(`./data/jeep.json`)
    var newData =  await JSON.parse(oldData)
    newData.push(req.body)
    const jsonString = JSON.stringify(newData);
    await fs.writeFile('./data/jeep.json', jsonString, err => {
      if (err) {
          console.log('Error writing file', err)
      } else {
          console.log('Successfully wrote file')
      }
    });
    res.send(jsonString);
});

app.post('/delete', async (req, res) => { 
  
  try {
    //read in the jeep.json file
    var oldData = await readFile('./data/jeep.json');
    var newData = JSON.parse(oldData);

    const index = req.body.index;

    if (index >= 0 && index < newData.length) {
      //splice out the correct index from the array
      newData.splice(index, 1);

      //write the file again
      const jsonString = JSON.stringify(newData, null, 2);
      await fs.promises.writeFile('./data/jeep.json', jsonString);

      res.status(200).send({ message: 'Item deleted successfully from jeep.json' });
    } else {
      res.status(400).send({ error: 'Invalid index' });
    }
  } catch (err) {
    console.error('Error deleting item:', err);
    res.status(500).send({ error: 'Internal server error' });
  }
});



//Start up the server on port 3000.
var port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("Server Running at Localhost:3000")
})