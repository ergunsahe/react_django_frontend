import React, {useState, useEffect} from "react";
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

import * as Yup from "yup";
import {useFormik} from "formik"
import { useHistory } from "react-router-dom";

import { putData } from "../helper/PutData";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios"

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
  const history = useHistory()

  const [data, setData] = useState()

  const profilData = async () =>{
    const Token = localStorage.getItem("Token")
    const res = await axios.get("https://rd-restful-blog.herokuapp.com/users/profile", {
        headers:{
          "Authorization": `Token ${Token}`,
        }
    })
     
    
    formik.values.first_name=res?.data.first_name
    formik.values.last_name=res?.data.last_name
    formik.values.country=res?.data.country
    formik.values.phone=res?.data.phone
    formik.values.address=res?.data.address
    formik.values.bio=res?.data.bio
    setData(res?.data)
  }


  useEffect(() =>{
    profilData()
  }, [])
  
  const validationSchema = Yup.object().shape({
    first_name:Yup.string()
      .max(200,'Title is too long'),
    last_name:Yup.string()
      .max(200,'Title is too long'),
    address:Yup.string()
      .max(200,'Title is too long'),
    country:Yup.string()
      .max(200,'Title is too long'),
    phone:Yup.string()
      .max(200,'Title is too long'),
    bio:Yup.string()
      .max(200,'Title is too long'),
    })
 
  
  const initialValues = {
    first_name:'',
    last_name:'',
    address:'',
    country:'',
    phone:'',
    bio:''
  }
  
  const onSubmit = (values) =>{
    
    putData("https://rd-restful-blog.herokuapp.com/users/profile/", values)
    .then((data) => { 

        history.push("/profile");
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
          <form className={matches ? classes.form : classes.form2}  noValidate onSubmit={formik.handleSubmit}>
              
            <CssTextField
              className={classes.margin}
              style={{width : matches ? "40%" : "100%" }}
              variant="outlined"
              defaultValue={data?.first_name}
              id="first_name"
              name="first_name"
              label="First Name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              {...formik.getFieldProps('first_name')}
              error={formik.touched.first_name && formik.errors.first_name}
              helperText = {formik.touched.first_name && formik.errors.first_name}
              />
            <CssTextField
              className={classes.margin}
              style={{width : matches ? "40%" : "100%" }}
              id="last_name"
              // defaultValue={data?.last_name}
              name="last_name"
              label="Last Name"
              variant="outlined"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              {...formik.getFieldProps('last_name')}
              error={formik.touched.last_name && formik.errors.last_name}
              helperText = {formik.touched.last_name && formik.errors.last_name}
              />

            <CssTextField
              className={classes.margin}
              style={{width : matches ? "40%" : "100%" }}
              variant="outlined"
              id="country"
              name="country"
              label="Country"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              {...formik.getFieldProps('country')}
              error={formik.touched.country && formik.errors.country}
              helperText = {formik.touched.country && formik.errors.country}

              />

            <CssTextField
              className={classes.margin}
              style={{width : matches ? "40%" : "100%" }}
              variant="outlined"
              id="phone"
              name="phone"
              label="Phone"
              autoFocus
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              {...formik.getFieldProps('phone')}
              error={formik.touched.phone && formik.errors.phone}
              helperText = {formik.touched.phone && formik.errors.phone}
              />
    
            <CssTextField
              className={classes.address}
              style={{width : matches ? "80.7%" : "100%" }}
              variant="outlined"
              id="address"
              name="address"
              autoFocus
              label="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              {...formik.getFieldProps('address')}
              error={formik.touched.address && formik.errors.address}
              helperText = {formik.touched.address && formik.errors.address}
              />
            
            <CssTextField
              className={classes.bio}
              style={{width : matches ? "80.7%" : "100%" }}
              variant="outlined"
              multiline
              rows={8}
              id="bio"
              name="bio"
              autoFocus
              label="Biografy"
              value={formik.values.bio}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              {...formik.getFieldProps('bio')}
              error={formik.touched.bio && formik.errors.bio}
              helperText = {formik.touched.bio && formik.errors.bio}
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
            <ToastContainer/>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
export default ProfilePage;



