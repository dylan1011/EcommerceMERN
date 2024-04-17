let mongoose = require('mongoose');

const dbconnect = mongoose.connect("mongodb+srv://dylanbutelho:dylan@cluster0.twjwpq9.mongodb.net/",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("mongoose connected")
}).catch((error)=> {
    console.log('mongoose was not connected', error)
});

module.exports = dbconnect;