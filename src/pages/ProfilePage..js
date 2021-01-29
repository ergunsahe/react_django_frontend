import React from "react";
import {withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CKEditor from 'ckeditor4-react';
import * as Yup from "yup";
import {useFormik} from "formik"
import { useHistory } from "react-router-dom";
import { fetchData } from "../helper/FetchData";
import { postData } from "../helper/PostData";
import { toast, ToastContainer } from "react-toastify";

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
    height: "100vh",
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
    paddingLeft: "10%",
  },
  form2: {
    marginTop : "3rem",
    alignItems: "center",
  },
  margin : {
    margin : 2,  
    marginTop : 13,  
  },
  address : {
    marginTop : 13,  
    margin : 2,    
    width : "80.5%",   
  },
  bio : {
    margin : 2,    
    // width : "80.5%",   
    marginTop : 13,  
  },
  button : {
    marginTop : 13,  
    width : "80.7%",       
},
}));

const ProfilePage = () => {
  
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:750px)');
  const validationSchema = Yup.object().shape({
    content: Yup.string().required("Content is required!!"),
    // image: Yup.string("You can add an url of an image with image extension"),
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
    console.log(values)
    postData("https://rd-restful-blog.herokuapp.com/create/", values)
    .then((data) => { 

        history.push("/");
      })
      .catch((err) => {
        toast.error(err.message || " an error occured");      
      });
    }

    const formik = useFormik({
      validationSchema,
      initialValues,
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
            Profile
          </Typography>
          <form className={matches ? classes.form : classes.form2} >
              
            <CssTextField
              className={classes.margin}
              style={{width : matches ? "40%" : "100%" }}
              variant="outlined"
              id="firstname"
              name="firstname"
              label="First Name"
              />
            <CssTextField
              className={classes.margin}
              style={{width : matches ? "40%" : "100%" }}
              id="last_name"
              name="last_name"
              label="Last Name"
              variant="outlined"
              />

            <CssTextField
              className={classes.margin}
              style={{width : matches ? "40%" : "100%" }}
              variant="outlined"
              id="country"
              name="country"
              label="Country"
              />

            <CssTextField
              className={classes.margin}
              style={{width : matches ? "40%" : "100%" }}
              variant="outlined"
              id="phone"
              name="phone"
              label="Phone"
              />
            <CssTextField
              className={classes.address}
              style={{width : matches ? "80.7%" : "100%" }}
              variant="outlined"
              id="adress"
              name="address"
              label="Address"
              />
            
            <CssTextField
              className={classes.bio}
              style={{width : matches ? "80.7%" : "100%" }}
              variant="outlined"
              multiline
              rows={8}
              id="bio"
              name="bio"
              label="Biografy"
            />
            

            <Button
              color="primary"
              style={{width : matches ? "80.7%" : "100%" , marginTop : matches ? null : 30 }}
              variant="contained"
              fullWidth
              type="submit"
              className={classes.button}
              
            >
              Update
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
export default ProfilePage;



{/* <div className="App" style={{  marginTop:20,width: matches ? "80.5%" : "100%" }}>
            
            <CKEditor
                // data="<p>Hello from CKEditor 4!</p>"
                className={classes.margin}
                variant="outlined"
                multiline
                rows={8}
                id="content"
                name="content"
                label="Content"
                
            />
        </div> */}