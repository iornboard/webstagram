const express = require('express')
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // 파일 시스템, multer 까지 씀

const { User } = require('../models/Users');

const router = express.Router();


try {
    fs.readdirSync('./uploads');  // 디렉토리 즉 폴더를 읽어온다는데 , 읽어와서 어떻게 한다는 건지는 모르겠음
} catch (error) { // 디렉토리를 못 찾았을 경우
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('./uploads');  // 아마 디렉토리를 새로 만드는 데인듯
}


const upload = multer({dest: './uploads'})  // 아마도 사용

router.post('/profileUpdate', upload.single('profileImg'), (req, res) => {

    console.log(req.body);
    User.updateMany({ _id : req.body.userID }, { $set: { location: req.body.location, birthday: req.body.birthday, job: req.body.job, profileImg: req.file.filename } }, {upsert: true})
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        }); 
    });

    
// router.post('/user' , async  (req, res, next) => {
//     const user = await User.findOne({_id : req.body.userID })
//     res.send(user);
//     });
       

module.exports = router ;
