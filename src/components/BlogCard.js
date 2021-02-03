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
import Badge from '@material-ui/core/Badge';
import moment from 'moment';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginTop:50,
    boxShadow:`0 5px 15px`,
    opacity:0.8,
    borderRadius:'30%',
    padding:'10%',
    backgroundImage:`url('https://images.unsplash.com/photo-1528458965990-428de4b1cb0d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHw%3D&w=1000&q=80')`, 
    backgroundRepeat: 'no-repeat', 
    backgroundSize:'cover',
    cursor: "pointer",
    transform: 'rotate(0deg)',
    transition: theme.transitions.create(['hover', 'transform'], {
      duration: theme.transitions.duration.complex,
      easing:theme.transitions.easing.easeInOut
    }),
    '&:hover':{
      opacity:1,
      transform: "scale(1.2)"
      
    }
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
  header: {
    textOverflow:'ellipsis',overflow: 'hidden',whiteSpace: 'nowrap'
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
        <Link color='inherit' style={{textDecoration:'none'}} href={`/${post.slug}/detail/`} >
        <CardHeader className={classes.header}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {post.author[0]}
            </Avatar>
          }
          
          title={post.title}
          subheader={moment(post.publish_date).format('LL')}
        />
        
        <CardMedia
          className={classes.media}
          image= {`${post.image}`}
          title="Post Image"
        />
        </Link>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p" style={{height:75,paddingTop:2}}>
          {post.content.substring(0,111) + '. . .'}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
          <Badge badgeContent={post.like_count} color="secondary">
            <FavoriteIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label="comment">
          <Badge badgeContent={post.comment_count} color="secondary">
            <ChatBubbleOutlineIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label="visibility">
          <Badge badgeContent={post.view_count} color="secondary">
            <VisibilityIcon />
          </Badge>
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
        <CardContent>
          <Typography paragraph>
            
            {post?.content?.length < 110 
              ? 'No more content...'
              : 
              '➡️   . . .    ' + post?.content.substring(111,)
            }
            </Typography>
          
        </CardContent>
      </Collapse>
      </Card>
    
  );
}
