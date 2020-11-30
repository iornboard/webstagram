import React, { useState, useEffect } from 'react';
import Post from './Post';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';   
import { post } from '../_actions/user_action';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';


const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));




const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Content = styled.div`
  display: grid;
  width: 800px;
  height: 1000px;
  margin: 0 auto;
  overflow: auto;

`;

export const Loading = styled.div`
  width: 200px;
  margin: 20px auto;
  text-align: center;
`;



function ScrollList(props)  {

  const classes = useStyles();

  const dispatch = useDispatch()
  const [comment, setComment] = useState("")    
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentNum, setCommentNum] = useState(3);
  const [open, setOpen] = React.useState(false);

//------------------------------다이얼로그------------------------------------- 


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



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
      setCommentNum(prev => prev + 3);
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
    

    dispatch(post(body))    // 위 바디를 담아서 보낸다고 생각하자  (리엑트/리덕트를 보내는 곳)
    .then(response => {
        if (response.payload.loginSuccess) {
        props.history.push('/') //리액트에서 페이지를 이동 방법
        } else {
        
        callApi().then(res => setComments(res));
        setComment("");
        }
    })

    setOpen(false);
  }


//------------------------------------------------------------------------

  return (

    <div className='ScrollList'>
      <Dialog/>

        <Grid alignItems = 'baseline'>
          <Button variant="outlined" fullWidth  color="primary" variant="contained" className={classes.margin} onClick={handleClickOpen}>
          입력해주세요
          </Button>
          
          <Content onScroll={handleScroll} >       
          { comments ?  comments.map((comment) => <Post key={comment._id} comment={comment} className={classes.margin} />) : loading && <Loading>Loading ...</Loading> }
          </Content>
        </Grid>

      {loading && <Loading>Loading ...</Loading>}



      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <form noValidate>

          <DialogContent>
              <Typography component="div" variant="h5" className={classes.margin}>
                <Box textAlign="center" m={1}>
                  글자를 입력해주세요
                </Box>
              </Typography>
                  <Grid container spacing={2}>
                      <Grid item xs={15}>
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
                          onChange = {onCommentHandler}
                          className={classes.margin}/>
                      </Grid>
                  </Grid>
          </DialogContent>
          
          <DialogActions>
            <Button type = "submit" onClick= {onSubmitHandler}  color="primary">
              입력
            </Button>
            <Button onClick={handleClose} color="primary">
              취소
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      

    </div>
    
  );
}

export default ScrollList;