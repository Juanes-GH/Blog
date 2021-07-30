import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';

const app = express();

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//rutas
app.use('/api', require('./routes/nota'));
//app.use('/api', require('./routes/user'));
//app.use('/login', require('./routes/login'));

//Connection to the DB
const uri = 'mongodb://localhost:27017/myapp';
const options = {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true};
// Or using promises
mongoose.connect(uri, options).then(
  () => {console.log('correct connection to mongoDB')},
  err => {err}
);

//

app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), () => {
  console.log(' app listening on port '+ app.get('puerto'));
});