import React, {useEffect, useState, useContext} from "react";
import Grid from "@material-ui/core/Grid";
import BlogCard from '../components/BlogCard'
import axios from "axios"
import {AuthContext} from "../context/AuthContext"



const CardList = () => {
  // const [posts, setPosts]= useState([])
  const {postList, setPostList, fetchDataList}=useContext(AuthContext)

  fetchDataList()
  .then((data) => {
    setPostList(data)
    })
    .catch((err) => {
      console.log(err)   
    });
    
    // setPosts(res.data)
    
    // console.log(res.data)

  

  useEffect(() => {
    fetchDataList()
  }, [postList])
 
  return (


   
    <Grid container spacing={5}>
       {postList?.map((post, index) =>{
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