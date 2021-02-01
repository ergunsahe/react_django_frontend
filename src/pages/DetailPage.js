import React, {useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import CardDetail from "../components/CardDetail";
import { useParams } from "react-router-dom";
import MenuComponent from "../components/MenuComponent"
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow:"hidden"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const DetailPage = () => {
  const classes = useStyles();
  const { slug } = useParams();
  const [postDetail, setPostDetail] = useState()
 

  const fetchDataDetail = async () => {
    
    const Token= localStorage.getItem("Token")
    if (Token){
        const res = await axios.get(`https://rd-restful-blog.herokuapp.com/${slug}/detail`,{
        headers: {
          "Authorization": `Token ${Token}`,
        }
      })
      
      setPostDetail(res?.data)
    }else{
      const res = await axios.get(`https://rd-restful-blog.herokuapp.com/${slug}/detail`)
      
      setPostDetail(res?.data)
    }
 
 }
  

  useEffect(() => {
    fetchDataDetail()
  }, [])
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        {localStorage.getItem('currentUser') === postDetail?.author ? <MenuComponent slug={slug}/> : null}
          <CardDetail post={postDetail} fetchData={fetchDataDetail}/>
          
        </Grid>
      </Grid>
    </div>
  );
};
export default DetailPage;