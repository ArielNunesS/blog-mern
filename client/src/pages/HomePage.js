import { useState, useEffect } from "react";
import Post from "../components/Post";

export default function HomePage(){
    const [ posts, setPosts ] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/posts`).then(response => {
            response.json().then(posts => {
                setPosts(posts);
            });
        });
    }, [] );
    
    return (

    <div className="blog-container">
        <div className="hero-section">
            <h1>titulo llllll</h1>
            <p>Aprenda mais sobre nosso blog, nossa abordagem e as últimas novidades.</p>
        </div>

      <div className="posts-grid">
            {posts.length > 0 && posts.map(post => (
              <Post {...post} />
            ))}
      </div>
    </div>
    );
}