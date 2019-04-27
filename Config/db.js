const mongoose = require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/poll',{ useNewUrlParser: true })
.then(()=>console.log('MongoDB Connected'))
.catch(err=>console.log(err));