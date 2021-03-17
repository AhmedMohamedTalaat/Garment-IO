const Mongoose = require('mongoose');
const batch=require('./route/batchRoute');
const express=require('express');
const app = express();


Mongoose.connect('mongodb://localhost/Batches', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());

app.use('/api/batch', batch);

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));



