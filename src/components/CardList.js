// import React, {useEffect, useContext, useState} from "react";
import Grid from "@material-ui/core/Grid";
import BlogCard from '../components/BlogCard'
// import {AuthContext} from "../context/AuthContext"
// import axios from "axios";



const CardList = ({posts}) => {
  // const [posts, setPosts]= useState([])

  // const fetchData = async () => {
  //   const res = await axios.get('https://rd-restful-blog.herokuapp.com/list/')
  //   setPosts(res.data)
    
  //   // console.log(res.data)

  // }

  // useEffect(() => {
  //   fetchData()
  // }, [])
 
 
  return (


   
    <Grid container spacing={5}>
       {posts?.map((post, index) =>{
         return(
          <Grid key={index} item xs={12} sm={4}>
            <BlogCard post={post}/>
          </Grid>

         )
       })}
      
      
    </Grid>
  );
};

export default CardList;
