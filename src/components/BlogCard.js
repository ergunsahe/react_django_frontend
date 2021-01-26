import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginTop:50
  },
  media: {

    height:0,
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

export default function BlogCard({post}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
        <Link href={`/${post.slug}/detail/`} >
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {post.author[0]}
            </Avatar>
          }
          
          title={post.title}
          subheader="September 14, 2016"
        />
        </Link>
        <CardMedia
          className={classes.media}
          image= "https://picsum.photos/id/1/200/300"
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.content} 
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />{post.like_count}
          </IconButton>
          <IconButton aria-label="comment">
            <ChatBubbleOutlineIcon />{post.comment_count}
          </IconButton>
          <IconButton aria-label="visibility">
            <VisibilityIcon />{post.view_count}
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
      </Card>
    
  );
}
