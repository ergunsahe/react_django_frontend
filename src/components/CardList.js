import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import BlogCard from '../components/BlogCard'
import axios from "axios"
import Typography from '@material-ui/core/Typography';


const CardList = () => {
  const [posts, setPosts]= useState([])

  const fetchData = async () => {
    const res = await axios.get('https://rd-restful-blog.herokuapp.com/list/')
    setPosts(res.data)
    // console.log(res)
    console.log(res.data)

  }

  useEffect(() => {
    fetchData()
  }, [])
 
  return (


   
    <Grid container spacing={5}>
       {posts?.map((post) =>{
         return(
          <Grid item xs={12} sm={4}>
            <BlogCard post={post}/>
            {/* <Typography>{post.title}</Typography> */}
          </Grid>

         )
       })}
      
      {/* <Grid item xs={12} sm={4}>
        <BlogCard />
      </Grid>
      <Grid item xs={12} sm={4}>
        <BlogCard />
      </Grid>
      <Grid item xs={12} sm={4}>
        <BlogCard />
      </Grid>
      <Grid item xs={12} sm={4}>
        <BlogCard />
      </Grid> */}
    </Grid>
  );
};

export default CardList;