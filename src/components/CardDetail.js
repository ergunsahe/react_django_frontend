import React, {useState, useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Collapse from '@material-ui/core/Collapse';
import Badge from '@material-ui/core/Badge';
import moment from 'moment';
import { postData, postDataLike} from "../helper/PostData"
import { toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { useHistory, useLocation} from "react-router-dom";

import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import SendIcon from "@material-ui/icons/Send";
import { useFormik } from "formik";
import * as Yup from "yup";

import {AuthContext} from "../context/AuthContext"

  
  

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 350,
    minHeight:'100%',
    paddingTop:50,
    paddingRight : 150,
    paddingLeft : 150,
    backgroundImage:`url('https://i.pinimg.com/originals/42/b3/fe/42b3fe44e95db5d6bee0f11618f029ca.png')`, 
    backgroundRepeat: 'no-repeat', 
    backgroundSize:'cover'
    
  },
  
  button: {
    margin: theme.spacing(1),
    height:55
  },

  commentForm:{
    display:"flex", 
    alignItems:"flex-end",
    marginBottom:35
  },
  root2: {
    maxWidth: 350,
    marginTop : 50,
    // paddingRight : 150,
    paddingLeft : 20
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
  privateButton:{
    marginLeft:"20%"
  }
}));




export default function CardDetail({post, fetchData}) {
 
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [isLiked, setLiked] = useState(false)
  const [isComment, setComment] = useState(false)
  const history = useHistory()
  const location = useLocation()
  const message = location?.state
  const {currentUser, fetchDataList}=useContext(AuthContext)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const matches = useMediaQuery('(min-width:750px)');

  const validationSchema = Yup.object().shape({
    content: Yup.string()
      .max(100, "this comment ist too long")
      .min(1,"You must write something")
  });
  
  const initialValues = {
    content: "",
  };

  

 

  const onSubmit = (values) =>{
    
    postData(`https://rd-restful-blog.herokuapp.com/${post.slug}/comment/`, values)
    .then((data) => { 
      fetchData()
      history.push(`/${post.slug}/detail/`);
      setComment(true)
      formik.values.content = ''
    })
    .catch((err) => {
      toast.error(
        <div>
          <h4 style={{display:"inline"}}>You should sign in.Do you want to </h4>
          <a href="/login">Sign in</a>
        </div>
        );    
    });
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const like= () =>{
    
    postDataLike(`https://rd-restful-blog.herokuapp.com/${post.slug}/like/`)
    .then((data) => { 
      fetchData()
      
      history.push(`/${post.slug}/detail/`);
      if (data.status===201){
        setLiked(true)
      } else{
        setLiked(false)
      }    
    })
    .catch((err) => {
      
      toast.error(
        <div>
          <h4 style={{display:"inline"}}>You should sign in.Do you want to </h4>
          <a href="/login">Sign in</a>
        </div>
        );      
    });
  }
  useEffect(() =>{
    fetchData()
    
  }, [])
  useEffect(() =>{
    fetchDataList()
  
  }, [isLiked, isComment])

  useEffect(() =>{
   
    toast.success(message?.detail)
  
  }, [location])
  
  


  return (
    <Card className={matches ? classes.root : classes.root2}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {post?.author[0]}
          </Avatar>
        }
        
        title= {post?.title}
        subheader={moment(post?.publish_date).startOf('hour').fromNow()  }
      />
      <Typography>{currentUser}</Typography>
      <Typography style={{fontSize:18, margin:20, color:'crimson'}}><i>created by {post?.author}</i> </Typography>
      <CardMedia
        className={classes.media}
        image={post?.image}
        title="Card Image"
      />
      
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post?.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Badge badgeContent={post?.like_count} color="secondary">
            <FavoriteIcon onClick={like} color={isLiked ? "secondary": ""}/>
          </Badge>
        </IconButton>
        <IconButton aria-label="Visibility">
          <Badge badgeContent={post?.view_count} color="secondary">
            <VisibilityIcon />
          </Badge>
        </IconButton>
        <IconButton aria-label="ChatBubbleOutline">
          <Badge badgeContent={post?.comment_count} color="secondary">
          <ChatBubbleOutlineIcon />
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
          <Typography style={{color:"#187965"}}>See Comments</Typography>
      </CardActions>

      <ToastContainer 
        position="top-center"
        autoClose={6000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <form className={classes.commentForm} onSubmit={formik.handleSubmit}>
        <TextField
            name='content'
            id="filled-full-width"
            style={{display:"inline-block", float:"right"}}
            label="Comments"
            placeholder="leave your Comment"          
            fullWidth
            // onChange={onComment}
            margin="normal"
            InputLabelProps={{
                shrink: true,
            }}
            variant="filled"
          onChange={formik.content}
          value={formik.values.content}
          onBlur={formik.handleBlur}
          {...formik.getFieldProps("content")}
          error={formik.touched.content && formik.errors.content}
          helperText={formik.touched.content && formik.errors.content}
            />
            
        <Button
            type='submit'
            style={{fontWeight:"bold"}}
            variant="contained"
            color="secondary"
            className={classes.button}
            endIcon={<SendIcon>send</SendIcon>}
            // onClick={() =>{onSubmit()}}
            >Send</Button>
      </form>
      
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {post?.comments.map((comment, index) =>{
            return (
              <Typography key={index} paragraph><b>{comment.content}</b> comment by <i>{comment.user}</i> at {moment(comment.time).startOf('hour').fromNow()}</Typography>

            )
            })
          }
          
          
        </CardContent>
      </Collapse>
    </Card>
  );
}