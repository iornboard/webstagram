import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { comment , getComment } from '../_actions/user_action';
import Comment from './Comment';
import styled from 'styled-components';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  margin: {
    display: 'flex',
    alignItems: 'center',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


export const Loading = styled.div`
  width: 200px;
  margin: 20px auto;
  text-align: center;
`;




const Post = ({ post , user}) => 


<Container paddingTop = 'spacing(8)' paddingBottom = 'spacing(8)' maxWidth="md">
  <CardContent display = 'flex' flexDirection = 'column'>
    <PostCard content = {post.content} postImg = {post.postImg} profileImg = {post.userID.profileImg} name = {post.userID.name} postID = {post._id} userID = {user}/>
  </CardContent>
</Container>

export default Post;

function PostCard( props ) {

  const dispatch = useDispatch();
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);
  const [comments, setComments] = React.useState("");
  const [commentList, setcommentList] = React.useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);

    const body = { 
      postID :  props.postID,
    }

    dispatch(getComment(body))    // 위 바디를 담아서 보낸다고 생각하자  (리엑트/리덕트를 보내는 곳)
      .then(response => {
        setcommentList(response.payload);
      })  
  };

  const onCommentsHandler = (event) => {
    setComments(event.currentTarget.value)
  };


  const onSubmitHandler = (event) => {
    event.preventDefault(); //페이지가 리프레시 되는 것을 막는다.


    const body = { 
      comment : comments,
      userID : props.userID,
      postID :  props.postID,
    }

    dispatch(comment(body))    // 위 바디를 담아서 보낸다고 생각하자  (리엑트/리덕트를 보내는 곳)
      .then(response => {
        if (response.payload.loginSuccess) {
          props.history.push('/') //리액트에서 페이지를 이동 방법
        } else {
        }
      })

      setComments("");
  }


  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" src= { props.profileImg } className={classes.avatar} >
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title= {props.name}
        subheader="September 14, 2016"
      />
      { props.postImg ? <CardMedia className={classes.media} image= { props.postImg }title = "Paella dish"/> : <div/> }
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
           {props.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share" onClick = {onSubmitHandler}>   
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <TextField variant="outlined" value={comments} onChange={onCommentsHandler} fullWidth className={classes.margin} />      
        <CardContent>
          <Paper>
            <Table className = {classes.table}>
              {commentList ? commentList.map((comme) => <Comment comment = {comme} /> ) :  <div/> }
            </Table>
          </Paper>              
        </CardContent>
      </Collapse>
    </Card>
  );
}





