const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    comment: {
        type: String,
        maxlength: 200
    },
    name: {
        type: String,
        maxlength: 50
    },
    img: {
        type: String,
        minlength: 100
    },
    like: {
        type: String,
        maxlength: 10
    }
  })


const Post = mongoose.model('Post', postSchema) //스키마를 모델로 감싸준다. 첫번째 인자는 모델의 이름, 두번째 인자는 스키마이다.

module.exports = { Post } // 생성한 모델을 다른 파일에서도 사용할 수 있게 한다.

