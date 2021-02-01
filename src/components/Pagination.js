import React, {useEffect} from 'react';
import Pagination from '@material-ui/lab/pagination'
import { makeStyles } from "@material-ui/core/styles";



const PaginatPage = ({postsPerPage, totalPosts, paging}) => {

    const [page, setPage] = React.useState(1);

    const handleChange = (event, value) => {
      setPage(value);
        
    }

    const pageNumbers = Math.ceil(totalPosts / postsPerPage)
    // console.log(pageNumbers)

    const useStyles = makeStyles((theme) => ({
        stylePaginate:{
        
          marginTop:50
        
          
        }
      }));

      const classes = useStyles();

    
    useEffect(() =>{
      paging(page)
    }, [page])

    return (
        <Pagination 
        className={classes.stylePaginate}
        count={pageNumbers} 
        page={page}
        onChange={handleChange}
        onClick={() => paging(page)}
        variant="outlined" 
        color="secondary"
        
        
        />

    )
}

export default PaginatPage;