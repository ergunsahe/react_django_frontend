import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import * as Yup from "yup";
import {useFormik} from "formik"
import { useHistory } from "react-router-dom";
import { fetchData } from "../helper/FetchData";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://picsum.photos/640/480)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  linkWrapper: {
    textAlign: "center",
    margin: theme.spacing(1.5),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory()
  

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required!!").max(100, "you can write until 100 chars"),
    email: Yup.string().email().required("Email is required!!"),
    password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
    password2: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  })
  
  const initialValues = {
    username:'',
    email:'',
    password:'',
    password2:''
  }
  
  const onSubmit = (values) =>{
    
    fetchData("https://rd-restful-blog.herokuapp.com/users/register/", values)
    .then((data) => { 
        
        history.push({
          pathname:"/login",
          state:{detail:"You are registered successfully"}
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
  

  return (
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid item xs={12} sm={8} md={5}  elevation={6} square>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <VpnKeyIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                <TextField
                  autoComplate="username"
                  name="username"
                  variant="outlined"
                  margin="normal"
                  autoFocus
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  {...formik.getFieldProps('username')}
                  error={formik.touched.username && formik.errors.username}
                  helperText = {formik.touched.username && formik.errors.username}
                 
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  id="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  {...formik.getFieldProps('email')}
                  error={formik.touched.email && formik.errors.email}
                  helperText = {formik.touched.email && formik.errors.email}
                 
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  {...formik.getFieldProps('password')}
                  error={formik.touched.password && formik.errors.password}
                  helperText = {formik.touched.password && formik.errors.password}
                 
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password2"
                  label="Password2"
                  type="password"
                  id="password2"
                  autoComplete="current-password2"
                  value={formik.values.password2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  {...formik.getFieldProps('password2')}
                  error={formik.touched.password2 && formik.errors.password2}
                  helperText = {formik.touched.password2 && formik.errors.password2}
                 
    
                  
                />
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
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
              </form>
              
              <Grid container className={classes.linkWrapper}>
                <Grid item xs>
                  <Link href="/login" variant="body2" mx="auto">
                    Already have an account? Sign In
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Typography variant="body2" color="textSecondary" align="center">
                  {"Copyright ©️ "}
                  <Link color="inherit" href="/">
                    Our Website
                  </Link>{" "}
                  {new Date().getFullYear()}
                  {"."}
                </Typography>
              </Box>
            </div>
          </Grid>
        </Grid>
      );
    };