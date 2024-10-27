import React, { useEffect, useState } from 'react'
import { getAllgenres } from '../services/data-api';

export default function useGenre(){
    const [ genre, setGenre] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [err, setError] = useState(null);
    useEffect(()=>{
        setIsLoading(true);
        const fetchGenres = async() =>{
            try{
                const genre = await getAllgenres();
                setGenre(genre);
            }catch(err){
                console.log("Error in API call : ",err.message);
                setError(err);
            }finally{
                setIsLoading(false);
            }
        }
        fetchGenres();
    },[])
    return { genre, isLoading, err };
}
