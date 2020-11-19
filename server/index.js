// 기본 설정 ( 모듈 불러오기 + 기타 등등 )
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
const { auth } = require('./middleware/auth') //미들웨어 역할을 하는 모듈을 직접 만들어 임포트한다.
const { User } = require('./models/User');


//application/json
app.use(bodyParser.json());
//application/X-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// 데이터베이스 설정
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://thswlsqls:montnqkrwhgdk1!@cluster0.ha0bc.mongodb.net/test?retryWrites=true&w=majority',
{
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err))


// // 데이터베이스 불러오기
// const { UserSchema } = require('./models');

app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요!')
})

// 클라이언트 -> 서버 -> 데이터 베이스

app.post('/api/users/login', (req, res) => {

  console.log(req.body)
  //요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    //console.log('user', user)
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
  //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) //만약 비밀번호가 맞지 않다면,
      return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})
    
      //비밀번호까지 맞다면 토큰을 생성하기.
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);
        
        //토큰을 저장한다. 어디에? 쿠키, 로컬스토리지 여러가지 방법이 있고 각각 장단점이 존재한다.
        res.cookie("x_auth", user.token) //첫번째 인자로 쿠키의 이름, 두번째 인자로 쿠키의 값이 전달된다.
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
      })
    })
  })
  //비밀번호까지 맞다면 토큰을 생성하기.
})

app.post('/api/users/signup', (req, res) => {
    
  //회원가입할 때 필요한 정보들을 client에서 가져오면 
  //그것들을 데이터 베이스에 넣어준다.

  const user = new User(req.body);
  console.log(req.body);
  
  user.save((err, userInfo) => { //mongoose의 메서드이다.
      if(err) return res.json({ success: false, err })
      return res.status(200).json({
          success: true
      })
  })
})


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

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
  });
  