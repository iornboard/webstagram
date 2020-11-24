import React, { useEffect } from 'react';
import Axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { withRouter } from 'react-router-dom';
import AppBar from '../components/Appbar';
import ScrollList from '../components/ScrollList';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];


function Main(props) {
  const classes = useStyles();

  const onClickHandler = () => {
    Axios.get('/api/users/logout')
      .then(response => {
        if (response.data.success) {
          props.history.push("/login")
        } else {
          alert('로그아웃 하는데 실패 했습니다.')
        }
      })
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
      </AppBar>
      <main>
        {/* Hero unit */}

        <Container className={classes.cardGrid} maxWidth="md">
          <ScrollList/>
          {/* End hero unit */}
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

export default withRouter(Main)


