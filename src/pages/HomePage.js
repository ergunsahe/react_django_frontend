import React, { useEffect, useState , useContext } from "react";
import Container from "@material-ui/core/Container";
import CardList from "../components/CardList";
import {AuthContext} from "../context/AuthContext";
import logo from '../assets/load.gif';
import { makeStyles } from "@material-ui/core/styles";
import PaginatPage from '../components/Pagination';
import { toast, ToastContainer} from "react-toastify";
import { useLocation} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'


const useStyles = makeStyles((theme) => ({
  styleLogo:{
  
    alignSelf:'center',
    marginTop:50,
  },
  container:{
    display:'flex',
    justifyContent:'center',
    
  }
}));

const HomePage = () => {
  
  const classes = useStyles();
  const location = useLocation()
  const message = location?.state
  const {postData, fetchDataList, loading} = useContext(AuthContext);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  
  
 

  useEffect(() => {
    fetchDataList();
  }, []);
  
  
  useEffect(() => {
   toast.success(message?.detail)
    
  }, [location, postData]);

  // Get current posts

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = postData?.slice(indexOfFirstPost, indexOfLastPost)
   

    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber)
    }

    

    if (loading) {
      return (
        <div className={classes.container} >
        <img className={classes.styleLogo} src={logo} alt="loading..." />

        </div>
      )

      
    }
    else 
    return(
      <div style={{backgroundImage:`url('https://images.unsplash.com/photo-1487088678257-3a541e6e3922?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzE1fHxibG9nfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')`, overflow:'hidden', backgroundRepeat: 'no-repeat', backgroundSize:'cover'}}>
          <Container >
            <PaginatPage postsPerPage={postsPerPage} 
            totalPosts={postData?.length} 
            paging={paginate} />


            <CardList posts={currentPosts} />
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
            <PaginatPage postsPerPage={postsPerPage} 
            totalPosts={postData?.length} 
            paging={paginate} />
          </Container>

      </div>
    )
    
};
export default HomePage;


