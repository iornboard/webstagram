import Axios from 'axios'

import {
    LOGIN_USER,
    SIGNUP_USER

} from './types';

export function loginUser(dataToSubmit) {
    
    const request = Axios.post('/api/users/login', dataToSubmit) //입력받은 데이터를 인자로 갖고 서버로 요청을 보낸다.
        .then(response => response.data ) //요청을 보내서 서버에서 받은 응답을 저장한다.

    return { // 그리고 리듀서로 보낸다. 액션은 타입과 서버로부터 받은 reponse로 구성되므로 아래와 같이 반환한다.
        type: LOGIN_USER, //전달하는 데이터를 구분하기 위한 것이다.
        payload: request //전달하는 데이터이다.
    }
}

export function SignUpUser(dataToSubmit) {
    
    const request = Axios.post('/api/users/signup', dataToSubmit)
        .then(response => response.data) //요청을 보내서 서버에서 받은 응답을 저장한다.

    return { // 그리고 리듀서로 보낸다. 액션은 타입과, 서버로부터 받은 reponse로 구성되므로 아래와 같이 반환한다.
        type: SIGNUP_USER, //전달하는 데이터를 구분하기 위한 것이다.
        payload: request //전달하는 데이터이다.
    }
}