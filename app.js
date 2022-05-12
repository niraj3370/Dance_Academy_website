const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance');}
const port = 80;



//Define Mongoose Schema

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    dsc: String
});

const contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.get('/About', (req, res)=>{
    const params = {}
    res.status(200).render('About.pug', params);
})
app.get('/services', (req, res)=>{
    const params = {}
    res.status(200).render('services.pug', params);
})
app.get('/classes', (req, res)=>{
    const params = {}
    res.status(200).render('classes.pug', params);
})
app.post('/contact', (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("item not saved to the database")
    })

    // res.status(200).render('contact.pug');
})



// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});