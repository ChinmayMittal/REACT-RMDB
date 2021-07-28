import { useState, useEffect, useRef } from "react" ; 
// API 
import API from "../API" ;
//helpers
import { isPersistedState } from "../helpers";
const initialState = {
    page : 1 , 
    results : [] , 
    total_pages : 0 , 
    total_results : 0 
};
export const useHomeFetch = () => {
    
    const [searchTerm , setSearchTerm ] = useState("") ; 
    const [ state , setState ] = useState(initialState) ;
    const [ loading , setLoading ] = useState(false) ; 
    const[error , setError] = useState(false) ; 
    const [isLoadingMore , setIsLoadingMore]  = useState(false) ; 
    const[ page , setPage ] = useState(1) ; 
    console.log(searchTerm) ; 
    const fetchMovies = async( page , searchTerm ="") => {
        try{
            setError(false) ; 
            setLoading(true) ; 
            const movies = await API.fetchMovies( searchTerm , page ) ; 
            setState( prev => ({
                ...movies, 
                results : (page>1 ? [...prev.results  , ...movies.results] : [...movies.results]) 

            }) ) ; 
        }catch{
            setError(true) ; 
        }
        setLoading(false) ;  
    } ; 
    // initial render and search

    useEffect(()=>{
        if(!searchTerm){
            const sessionState = isPersistedState('homeState') ; 
            if(sessionState){
                console.log('Grabbing from session storage') ; 
                setState(sessionState) ; 
                return ; 
            }
        }
        console.log('grabbing from API')  ; 
        setState(initialState) ; 
        setPage(1) ; 
        fetchMovies( page , searchTerm ) ;
    } , [searchTerm] ) ;
        //Load more 
    useEffect(() => {
        if(isLoadingMore){
            setPage( page => page+1) ; 
            fetchMovies(page , searchTerm ) ; 
            setIsLoadingMore(false) ; 
        }else{
            return ;
        }
    } , [isLoadingMore]) ; 
    // write to session storage 
    useEffect(()=>{
        if(!searchTerm){
            sessionStorage.setItem('homeState' , JSON.stringify(state)) ; 
        }

    } , [state , searchTerm] ) ; 
    
    return { state , loading , error , searchTerm , setSearchTerm  , setIsLoadingMore} ; 
}