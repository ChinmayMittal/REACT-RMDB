import React from "react" ; 
// Config 
import { IMAGE_BASE_URL   , POSTER_SIZE }  from "../config";
//Components 
import Grid from "./Grid" ; 
import Spinner from "./Spinner" ; 
import BreadCrumb from "./BreadCrumb"  ;
import MovieInfo from "./MovieInfo" ; 
import MovieInfoBar from "./MovieInfoBar";
import Actor from "./Actor" ;
//Router 
import { useParams } from "react-router-dom" ; 
// Hooks 
import { useMovieFetch } from "../hooks/useMovieFetch";
// Image 
import NoImage from "../images/no_image.jpg" ; 

const Movie = () => {
    const { movieId } = useParams() ; 
    const { state : movie , loading , error } = useMovieFetch(movieId) ;  
    if(loading){
        return <Spinner/>
    }
    if( error ){
        return <div>Oops! something went wrong </div>
    }
return (
    <>
       <BreadCrumb movieTitle = {movie.original_title}/>
       <MovieInfo movie = {movie}/>
       <MovieInfoBar time = {movie.runtime} budget = {movie.budget} revenue={movie.revenue}/>
       <Grid header="CAST">
       {movie.actors.map( actor => <Actor key={actor.credit_id} name={actor.name} character={actor.character} imageUrl={actor.profile_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}` : NoImage}/>)}
       </Grid>
    </>
    ) 
} 


export default Movie ; 