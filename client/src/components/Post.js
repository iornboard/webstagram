import React from 'react';
import PostCard from './PostCard';
import { CardContent } from '@material-ui/core';
import Container from '@material-ui/core/Container';

const User = ({ post }) => 


<Container paddingTop = 'spacing(8)' paddingBottom = 'spacing(8)' maxWidth="md">
  <CardContent display = 'flex' flexDirection = 'column'>
    <PostCard name = {post.name}  text = {post.content} />
  </CardContent>
</Container>

export default User;







