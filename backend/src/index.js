const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const port = 4000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('연결 완료');
    })
    .catch(err => {
        console.error(err);
    })

app.get('/', (req, res, next) => {
    setImmediate(() => { next(new Error('it is an error')) });
    // res.send('안녕하세요.2222');
})

app.post('/', (req, res) => {
    console.log(req.body);
    res.json(req.body);
})


app.use('/users', require('./routes/users'));
app.use('/products', require('./routes/products'));

// Express 에러 처리
app.use((error, req, res, next) => {
    res.status(err.status || 500);
    res.send(error.message || "Oops, something went wrong");
})

// 정적 파일을 가져오기 위한 미들웨어
app.use(express.static(path.join(__dirname, '../uploads')));

app.listen(port, () => {
    console.log(`Server is running at https://localhost:${port}`);
});