import Grid from "@material-ui/core/Grid";
import BlogCard from '../components/BlogCard'




const CardList = ({posts}) => {
  
 
 
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
