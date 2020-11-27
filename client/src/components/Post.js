import React from 'react';
import PostCard from './PostCard';
import { CardContent } from '@material-ui/core';
import Container from '@material-ui/core/Container';

const User = ({ comment }) => 

<Container paddingTop = 'spacing(8)' paddingBottom = 'spacing(8)' maxWidth="md">
  <CardContent display = 'flex' flexDirection = 'column'>
    <PostCard text = {comment.comment} />
  </CardContent>
</Container>

export default User;







