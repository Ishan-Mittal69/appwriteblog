import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({children , authentication= true}) {

    const navigate= useNavigate()
    const [loader, setLoader]= useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(()=>{
        if (authentication && authStatus !== authentication) {
            navigate("/login") //logout hai aur /all-posts ya aesa aur kuch access karega toh 
        }
        else if(!authentication && authStatus !== authentication){
            navigate("/") // login hai or /login ya /signup access karega toh 
        }
        setLoader(false)

    }, [authStatus, navigate, authentication])

    return loader ? <h1>Loading...</h1>  :  <>{children} </>
}
