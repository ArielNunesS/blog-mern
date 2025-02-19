import { useState, useEffect } from "react";
import Post from "../components/Post";

export default function HomePage(){
    const [ posts, setPosts ] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/posts').then(respose => {
            respose.json().then(posts => {
                setPosts(posts);
            });
        });
    }, [] );
    
    return (<>
        {posts.length > 0 && posts.map(post => (
            <Post {...post} />
        ))}
    </>);
}