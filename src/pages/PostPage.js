import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import * as Yup from "yup";
import {useFormik} from "formik"
import { useHistory} from "react-router-dom";

import { postData } from "../helper/PostData";
import { toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


  
  const CssTextField = withStyles({
    root: {
      width: "40%",
      "& label.Mui-focused": {
        color: "green",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "green",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#cfccdf",
        },
        "&:hover fieldset": {
          borderColor: "#e9967a",
        },
        "&.Mui-focused fieldset": {
          borderColor: "green",
        },
      },
    },
  })(TextField);
  
  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100%",
      overflow:"hidden"
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    
    form: {
        marginTop: "3rem",
        alignItems: "center",
        width : '80%',
        paddingLeft: "10%",
      },
      form2: {
        marginTop: "3rem",
        alignItems: "center",
        width : '100%',
    },
    margin: {
      margin: 2,
      marginTop: 13,
    },
    address: {
      marginTop: 13,
      margin: 2,
      width: "80.5%",
    },
    bio: {
      margin: 2,
      marginTop: 13,
    },
    button: {
      marginTop: 13,
      width: "80.7%",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 500,
        display:'block',
        marginLeft : -0.1,
        width: "40%",
        "& label.Mui-focused": {
          color: "green",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "green",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#cfccdf",
          },
          "&:hover fieldset": {
            borderColor: "#e9967a",
          },
          "&.Mui-focused fieldset": {
            borderColor: "green",
          },
        },
        
      },
  }));
  
const PostPage = () => {
  const classes = useStyles();
  const history = useHistory()
  

  const validationSchema = Yup.object().shape({
    content: Yup.string().required("Content is required!!"),
    title: Yup.string().required("Title is required").max(100, "Title is too long, 100 chars "),
    status: Yup.string()
  })
  
  const initialValues = {
    content:'',
    image:'',
    title:'',
    status:''
  }
  
  const onSubmit = (values) =>{
    
    postData("https://rd-restful-blog.herokuapp.com/create/", values)
    .then((data) => { 

        history.push({
          pathname:"/",
          state:{detail:'Post is created successfully'}
        });
      })
      .catch((err) => {
        toast.error(" an error occured");      
      });
    }

    const formik = useFormik({
      validationSchema,
      initialValues,
      onSubmit
    })
    const matches = useMediaQuery("(min-width:750px)");
  
    return (
      <Grid container component="main" className={classes.root}>
        <Grid item xs={12} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LocalMallIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create New Post
            </Typography>
            <form className={matches ? classes.form : classes.form2}  noValidate onSubmit={formik.handleSubmit}>
              <CssTextField
                className={classes.margin}
                style={{ width: matches ? "80.5%" : "100%" }}
                name="title"
                variant="outlined"
                margin="normal"
                autoFocus
                required
                fullWidth
                id="title"
                label="Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                {...formik.getFieldProps('title')}
                error={formik.touched.title && formik.errors.title}
                helperText = {formik.touched.title && formik.errors.title}
              />
              <CssTextField
                className={classes.margin}
                style={{ width: matches ? "80.5%" : "100%" }}
                name="image"
                variant="outlined"
                margin="normal"
                autoFocus
                fullWidth
                id="image"
                label="Image URL"
                value={formik.values.image}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                {...formik.getFieldProps('image')}
                error={formik.touched.image && formik.errors.image}
                helperText = {formik.touched.image && formik.errors.image}
              />

            
            
                    
              <CssTextField
                className={classes.margin}
                style={{ width: matches ? "80.5%" : "100%" }}
                multiline
                rows={8}
                name="content"
                variant="outlined"
                margin="normal"
                autoFocus
                required
                fullWidth
                id="content"
                label="Content"
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                {...formik.getFieldProps('content')}
                error={formik.touched.content && formik.errors.content}
                helperText = {formik.touched.content && formik.errors.content}
              />
                
                
            
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">Status</InputLabel>
                <Select
                name='status'
                native
                value={formik.values.status}
                onChange={formik.handleChange}
                label="Status"
                inputProps={{
                    name: 'status',
                    id: 'outlined-status-native-simple',
                }}
                >
                <option aria-label="None" value="" />
                <option value={"d"}>Draft</option>
                <option value={"p"}>Published</option>
                
                </Select>
              </FormControl>
              <Button
                color="primary"
                style={{
                  width: matches ? "80.7%" : "100%",
                  marginTop: matches ? null : 30,
                }}
                variant="contained"
                fullWidth
                type="submit"
                className={classes.button}
              >
                Create
              </Button>
              <ToastContainer/>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  };
  export default PostPage;

  