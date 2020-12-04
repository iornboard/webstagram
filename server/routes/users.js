const express = require('express')
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // 파일 시스템, multer 까지 씀

const { User } = require('../models/Users');

const router = express.Router();


try {
    fs.readdirSync('server/uploads');  // 디렉토리 즉 폴더를 읽어온다는데 , 읽어와서 어떻게 한다는 건지는 모르겠음
} catch (error) { // 디렉토리를 못 찾았을 경우
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('server/uploads');  // 아마 디렉토리를 새로 만드는 데인듯
}


const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {  
        cb(null, 'server/uploads'); 
      },
      filename(req, file, cb) {
        const ext = path.extname(file.originalname);   // 파일의 원래 이름을 받아온다. 
        cb(null, path.basename(file.originalname, ext) + Date.now() + ext);  // 파일을 내려받을 때 아마, 파일 이미지명을 저렇게 설정 한다는 뜻인 듯( 시간 + 처음 파일 내용 ??? ) 
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 올릴 수 있는 파일 사이즈? 
  });

  
router.post('/profileUpdate', upload.single('profileImg'), async (req, res) => {

    console.log(req.body.job);
    await User.updateMany({ _id : req.body.userID }, { $set: { location: req.body.location, birthday: req.body.birthday, job: req.body.job, profileImg: req.file.filename } }, {upsert: true})
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        }); 
    });

    
module.exports = router ;
