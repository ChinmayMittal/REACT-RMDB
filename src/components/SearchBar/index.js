import React, {useState , useEffect  , useRef } from "react" ; 
import PropTypes from "prop-types" ; 
// Image 
import searchIcon from "../../images/search-icon.svg" ; 

import { Wrapper, Content } from "./SearchBar.styles" ; 

const SearchBar = ({setSearchTerm}) => {
    const [ state  , setState ] = useState("") ;  
    const initial = useRef(true) ; // don't cause rerender 
    useEffect( () => {
        if(initial.current){
            // prevents setting timer for the first time or the first load 
            // omitd useEffect for the first render 
            initial.current = false ; 
            return; 
        }
        const timer = setTimeout( () =>{
            setSearchTerm(state) ; 
        } , 500 ) ;
        // cleanup call back before rerender to remove any previous timers  
        return () => {
            clearTimeout(timer) ; 
        }
    }, [setSearchTerm , state ]) ;
    

    return (<Wrapper>
                <Content>
                    <img src = {searchIcon} alt = "search-icon" />
                    <input type="text" placeholder="search-movie" value={state} onChange={ event => setState(event.target.value)}/>
                </Content>
           </Wrapper> ) 
}

SearchBar.propTypes = {
    setSearchTerm: PropTypes.func 
}
export default SearchBar ; 