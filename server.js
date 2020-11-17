// 기본 설정 ( 모듈 불러오기 + 기타 등등 )

const express = require('express');
const bodyParser = require('body-Parser');
const dotenv = require('dotenv');

const app = express();
app.set('port', process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended : true} ));


// 데이터베이스 설정
const { sequelize } = require('./models'); 
dotenv.config();  

sequelize.sync({ force: false })  
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });


// 데이터베이스 불러오기
const { Post } = require('./models');




// 클라이언트 -> 서버 -> 데이터 베이스

app.post('/api/customers', async  (req, res, next) => {
     await Post.create({  
      name: req.body.name,  
      birthday: req.body.birthday, 
      Num: 1,
      image : 'https://placeimg.com/64/64/any'
    });
})


// 데이터 베이스 -> 서버 -> 클라이언트

app.get('/api/customers' , async  (req, res, next) => {
    const post = await Post.findAll();
    res.send(post);
});


app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
  });
  