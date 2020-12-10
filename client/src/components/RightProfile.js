import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme) => ({
    margin: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
    },
    root: {
        minWidth: 275,
        height: "100%"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

export default function SimpleCard(props) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.root}>
            <CardContent>
                <IconButton>
                    <Avatar src={props.userImg} />
                </IconButton>
                <Typography className={classes.margin} variant="h5" component="h2">
                    {props.userName}
                </Typography>
                <Typography className={classes.margin} color="textSecondary" display="inline" margin="3">
                    게시물
                </Typography>
                <Typography className={classes.margin} color="textSecondary" display="inline">
                    팔로워
                </Typography>
                <Typography className={classes.margin} color="textSecondary" display="inline">
                    팔로잉
                </Typography>

            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}