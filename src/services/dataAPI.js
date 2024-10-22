export async function getAllsongs(){
    try{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/song`);
        const data = await response.json();
        return data.tracks;
    }catch(error){
        console.log("Fetching error (songs) : ",error.message);
    }
}

export async function getAllgenres(){
    try{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/genre`);
       const data = await response.json();
        return data.genres;
    }catch(error){
        console.log("Error in fetching genres:",error.message);
    }
}

export async function getAllalbums(){
    try{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/album`);
       const data = await response.json();
        return data.album;
    }catch(error){
        console.log("Error in fetching genres:",error.message);
    }
}

export async function getArtistById(id){
    try{
        const response = await fetch(`${import.meta.VITE_BACKEND_URL}/api/artist/${id}`);
        const data = await response.json();
        return data;
    }catch(error){
        console.log("Error in fetching artist by id:",error.message);
    }
}

export async function getAlbumById(id){
    try{
        const response = await fetch(`${import.meta.VITE_BACKEND_URL}/api/album/${id}`);
        const data = await response.json();
        return data;
    }catch(error){
        console.log("Error in fetching album by id:",error.message);
    }
}