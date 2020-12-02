const express = require('express')
const router = express.Router();
const multer = require('multer');

const { User } = require('../models/Users');

const upload = multer({dest: './upload'})  // 아마도 사용

router.post('/profileUpdate', upload.single('img'), (req, res) => {

    console.log(req.body.userID );
    User.update({ location:"서울" }, { $set: { location:"경기도" } });
         
    })


module.exports = router ;
