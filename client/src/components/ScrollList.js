import React, { useState, useEffect } from 'react';
import Post from './Post';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';   
import { post } from '../_actions/user_action';
import styled from 'styled-components';




export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 800px;
  height: 800px;
  margin: 0 auto;
  overflow: auto;
`;

export const Loading = styled.div`
  width: 200px;
  margin: 20px auto;
  text-align: center;
`;



function ScrollList(props)  {


  const dispatch = useDispatch()
  const [comment, setComment] = useState("")    
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentNum, setCommentNum] = useState(7);



//------------------------------무한 스크롤------------------------------------- 

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      callApi().then(res => setComments(res));
      setLoading(false);
    };
   
    loadUsers();
  }, 1);


  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    if (scrollHeight - scrollTop === clientHeight) {
      callApi().then(res => setComments(res));
      setCommentNum(prev => prev +5);
    }

  };


  const callApi = async () => {
    const response = await fetch('/api/posts/get');
    const post = await response.json();
    return post.filter((c , index) => index < commentNum);
  }

//---------------------------- summit 부분 --------------------------------------


  const onCommentHandler = (event) => {
    setComment(event.currentTarget.value)
}


  const onSubmitHandler = (event) => {
    event.preventDefault(); //페이지가 리프레시 되는 것을 막는다.
        
    let body = {
        comment: comment,
    }

    

    dispatch(post(body))
    .then(response => {
        if (response.payload.loginSuccess) {
        props.history.push('/') //리액트에서 페이지를 이동 방법
        } else {
        
        callApi().then(res => setComments(res));
        setComment("");
        }
    })
  }


//------------------------------------------------------------------------

  return (

    <div className='ScrollList'>


          <form onSubmit={onSubmitHandler} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type="text"
                  id="comment"
                  label="comment"
                  name="comment"
                  autoComplete="comment"
                  value={comment}
                  onChange = {onCommentHandler}/>
              </Grid>
            </Grid>
            <Button 
              type="submit" fullWidth variant="contained" color="primary"> comment! </Button>
          </form>


        <Content onScroll={handleScroll} >
        { comments ?  comments.map((comment) => <Post key={comment._id} comment={comment} />) : loading && <Loading>Loading ...</Loading> }
        </Content>


      {loading && <Loading>Loading ...</Loading>}
    </div>
  );
}

export default ScrollList;