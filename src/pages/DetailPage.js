import React, {useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from '@material-ui/core/styles';
import CardDetail from "../components/CardDetail";

import { useParams } from "react-router-dom";

import MenuComponent from "../components/MenuComponent"

// import {fetchDataDetail} from "../helper/FetchData"
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
  console.log(slug)

  const fetchDataDetail = async () => {
    console.log(slug)
    const Token= localStorage.getItem("Token")
    if (Token){
        const res = await axios.get(`https://rd-restful-blog.herokuapp.com/${slug}/detail`,{
        headers: {
          "Authorization": `Token ${Token}`,
        }
      })
      console.log(res?.data)
      console.log("heelo with token")
      setPostDetail(res?.data)
    }else{
      const res = await axios.get(`https://rd-restful-blog.herokuapp.com/${slug}/detail`)
      console.log("heelo without token")
      console.log(res?.data)
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