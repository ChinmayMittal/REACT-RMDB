import styled from "styled-components" ; 


export const Wrapper = styled.div`
display : flex  ; 
align-items : center ; 
justify-content : center ; 
width : 100% ; 
color : var(--white) ; 
background-color : var(--medGrey) ; 
height : 70px ; 
` ; 

export const Content = styled.div`
display : flex ; 
width  :100% ; 
max-width : var(--maxWidth) ;
padding : 0 20px ; 
span{
    font-size: var(--fontBig);
    color : var(--white) ; 
    padding-right : 10px ; 

    @media screen and (max-width: 720px){
        font-size: var(--fontMed) ; 
    }
} 
a{
    text-decoration: none ;
}` ; 