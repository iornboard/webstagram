import React from 'react';
import { Wrapper } from './User.styles';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
  }));

const User = ({ comment }) => 
<Wrapper>
{comment.comment}
</Wrapper>;

export default User;