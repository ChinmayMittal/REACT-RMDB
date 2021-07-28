import React from "react" ; 

import {POSTER_SIZE , BACKDROP_SIZE, IMAGE_BASE_URL} from "../config"
//API 
import API from "../API" ; 
//Components 
import HeroImage from './HeroImage' ; 
import Grid from "./Grid" ; 
import Thumb from "./Thumb" ; 
import Spinner from "./Spinner" ; 
import SearchBar from "./SearchBar" ; 
import Button from "./Button"
//Hook for
import {useHomeFetch} from "../hooks/useHomeFetch" ; 

// Image 
import NOImage from "../images/no_image.jpg" ; 

const Home = () => {
    const { state, loading , error  , searchTerm , setSearchTerm , setIsLoadingMore }  =  useHomeFetch() ; 
    console.log( state ) ; 
    if(error){ 
        return <div>
             Oops! something went wrong 
            </div>
    }
    return (
        <>
        {state.results[0] && !searchTerm ?  <HeroImage
         image = {`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`} 
         title = {state.results[0].original_title}
         text = {state.results[0].overview}                       
        /> : null }
        <SearchBar setSearchTerm = {setSearchTerm} />
        <Grid header={searchTerm ? "Results" : "Popular Movies"}>
            {state.results.map( movie => {
                   return <Thumb key={movie.id}
                   clickable = {true}
                   image = { movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`: NOImage }
                   movieId = {movie.id}>
                     {movie.title}
                    </Thumb>
            })}
        </Grid>
        { loading && <Spinner />  }
        { state.page < state.total_pages && !loading ? <Button text="Load More" callback={() => {
            setIsLoadingMore(true) ; 
        }}/> : null } 
        </>
    )
}


export default Home ; 