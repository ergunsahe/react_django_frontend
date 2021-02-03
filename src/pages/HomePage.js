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



const HomePage = () => {
  // const [postData, setPostData] = useState([]);
  const location = useLocation()
  const message = location?.state
  const {postData, fetchDataList, loading} = useContext(AuthContext);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  
  
  const useStyles = makeStyles((theme) => ({
    styleLogo:{
    
      alignSelf:'center',
      marginTop:50,
    },
    container:{
      display:'flex',
      justifyContent:'center',
      width:'100vw',
      height:'100%vh',
      backgroundImage:`url('https://images.unsplash.com/photo-1594284487150-54d64729129c?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80')`,
      overflow:'hidden', 
      backgroundRepeat: 'no-repeat', 
      backgroundSize:'cover'
      
    }
  }));
  const classes = useStyles();
  
  

  // async function fetchData() {
  //   setLoading(true)
  //   try {
  //     const results = await axios.get(
  //       'https://rd-restful-blog.herokuapp.com/list/'
  //     );
  //     setPostData(results?.data);
  //     setLoading(false)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

 

  useEffect(() => {
    fetchDataList();
  }, []);
  
  
  useEffect(() => {
   toast.success(message?.detail)
    
  }, [location]);

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
      <div style={{backgroundImage:`url('https://images.unsplash.com/photo-1594284487150-54d64729129c?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80')`, overflow:'hidden', backgroundRepeat: 'no-repeat', backgroundSize:'cover'}}>
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


