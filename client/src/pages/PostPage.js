import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import parse from 'html-react-parser';
import Post from "../components/Post";
import "../postPage.css";

export default function PostPage() {
    const [ postInfo, setPostInfo ] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:4000/posts/${id}`)
        .then(response => {
            response.json().then(postInfo => {
                setPostInfo(postInfo);
            });
        });
    }, []);

    if(!postInfo) return '';

    return ( <div className="single-post">
    
    <h2 className="single-title"> { postInfo.title } </h2>
    <h4 className="single-summary"> { postInfo.summary } </h4>
    <img src={`http://localhost:4000/${postInfo.cover}`}/>


    <div className="single-info">
        <p className="single-author"> { postInfo.author.username } </p>
        <time className="single-time"> {format(new Date(postInfo.createdAt), "MMM d, yyyy - HH:mm")} </time>
    </div>

    <div className="single-texts">
        <p className="single-content"> { parse(postInfo.content) } </p>
    </div>

    </div>
    );
}