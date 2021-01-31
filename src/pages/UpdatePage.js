import React, {useEffect, useState} from 'react';
import {
    withStyles,
  } from "@material-ui/core/styles";
  
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
// import CKEditor from 'ckeditor4-react';
import * as Yup from "yup";
import {useFormik} from "formik"
import { useHistory } from "react-router-dom";
import { putData } from "../helper/PutData";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios"
import { useParams } from "react-router-dom";
  
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
    rootQuery: {
        width:"90vw"
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      // backgroundColor: "yellow",
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
    button: {
      marginTop: 13,
      width: "80.7%",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 500,
        display:'block',
        marginLeft : -0.1,
        width: "90%",
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
  
const UpdatePost = () => {
    const classes = useStyles();
    const { slug } = useParams();
    const [postInfo, setPostInfo]=useState('')
 
    const matches = useMediaQuery("(min-width:750px)");
    const fetchData = async () => {
      const res = await axios.get(`https://rd-restful-blog.herokuapp.com/${slug}/detail`)
      formik.values.title= res?.data.title
      formik.values.image= res?.data.image
      formik.values.content= res?.data.content
      formik.values.status= res?.data.status
      setPostInfo(res?.data)
    }

    
    useEffect(() => {
      fetchData()
    }, [])
    
    
    const history = useHistory();
    
    
    const validationSchema = Yup.object().shape({
      title:Yup.string()
      .required('you must write a title')
      .max(100,'Title is too long'),
      content: Yup.string()
      .required('You must write something'),
      image : Yup.string("You can write only image url "),
      status:Yup.string()
    })
    
    const initialValues = {
      title:'',
      content:'',
      image:'',
      status:''
    }
    
    
    const onSubmit = (values) => {
      
      const response = putData(`https://rd-restful-blog.herokuapp.com/${slug}/update/`, values, {
      })
      .then((data) => { 
        
        history.push(`/${slug}/detail/`);
      })
      .catch((err) => {
        toast.error(err.message || " an error occured");      
      });
      console.log(response)
      
      
    }
    
    const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit
    })
    
  
    return (
      <Grid container component="main" className={classes.root}>
        <Grid item xs={12} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LocalMallIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Update Post
            </Typography>
            <form className={matches ? classes.form : classes.form2} noValidate onSubmit={formik.handleSubmit}>
              <CssTextField
                defaultValue={postInfo?.title}
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
                defaultValue={postInfo?.image}
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
                defaultValue={postInfo?.content}
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
                defaultValue={postInfo?.status}
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
                Update
              </Button>
              <ToastContainer/>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  };
  export default UpdatePost;


  