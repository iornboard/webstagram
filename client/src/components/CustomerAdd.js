import React from 'react';
import axios from 'axios';
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";

class CustomerAdd extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            birthday: '',
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this._addData()
            .then(( response ) => {
                console.log(response.data);
            }) 
    }


    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }


    // 위는 가능한 건들이지 말 것

    // 클라이언트 -> 서버 (전달) (axios + console)

    _addData = async(e) =>{
        const formData = 
            {
            'name':this.state.username,
            'birthday': this.state.birthday
            }

        console.log(await axios( '/api/customers', {
            method : 'POST',
            data : formData ,
            headers: new Headers()
        }))
    }
    

    // 페이지 구성(종속) 

    render() {
        return(
            <form onSubmit={this.handleFormSubmit}>
                <h1> 인원추가 </h1>
                <TextField label="이름을 입력해주세요" variant="outlined" type="text" name="username" value={this.state.username} onChange = {this.handleValueChange}/><br/>
                <TextField label="생일을 입력해주세요" variant="outlined" type="text" name="birthday" value={this.state.birthday} onChange = {this.handleValueChange}/>
                <Button variant="contained" color="primary" type="submit"> 추가하기 </Button>
            </form>  
        )
    }
}


export default CustomerAdd;