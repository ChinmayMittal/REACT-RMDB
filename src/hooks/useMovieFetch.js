import { useState , useEffect } from "react" ; 
import API from "../API" ; 
//helpers 
import { isPersistedState } from "../helpers";
export const useMovieFetch = (movieId) => {
    const [state , setState ] = useState({}) ; 
    const [ loading , setLoading] = useState(true) ; 
    const [ error , setError ] = useState(false) ; 
    useEffect(()=>{
        const fetchData = async () => {
            try{
                setLoading(true) ; 
                setError(false) ; 
                const movie = await API.fetchMovie(movieId) ; 
                const credits = await API.fetchCredits(movieId) ; 
                // console.log(movie);
                // console.log(credits) ; 
                // Get directors
                const directors = credits.crew.filter( crewMember=> crewMember.job=== 'Director') ; 

                setState(
                    {
                        ...movie , 
                        actors : credits.cast , 
                        directors  : directors 
                    }
                ) ; 
                console.log(state) ; 
                setLoading(false) ;
            }catch{
                console.log("Error") ; 
                setError(true) ; 
            }
        } ; 

        const sessionState  = isPersistedState(movieId) ; 
        if(sessionState && ('actors' in sessionState)){
            setState(sessionState) ; 
            setLoading(false) ; 
            setError(false) ; 
            return; 
        }
        fetchData() ; 
        
    } , [movieId]) ; 

    //writng to local storage 
    useEffect( ()=> { 
        sessionStorage.setItem( movieId,JSON.stringify(state) )   ; 
    } , [movieId  , state ])
    return { state , loading , error } ; 
}