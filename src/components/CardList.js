import React, {useEffect, useContext} from "react";
import Grid from "@material-ui/core/Grid";
import BlogCard from '../components/BlogCard'
import {AuthContext} from "../context/AuthContext"



const CardList = () => {
  // const [posts, setPosts]= useState([])
  const {postList,  fetchDataList}= useContext(AuthContext)

  console.log(postList)

  useEffect(() => {
    fetchDataList()
  }, [])
 
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