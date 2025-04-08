import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { format } from "date-fns";
import parse from 'html-react-parser';
import "../postPage.css";

export default function PostPage() {
    const [ postInfo, setPostInfo ] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}posts/${id}`)
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

    <div className="single-info-img">
        <div className="single-info">
            <Link to={`/users/${postInfo.author._id}`}>
                <p className="single-author"> { postInfo.author.username } </p>
            </Link>
            <time className="single-time"> {format(new Date(postInfo.createdAt), "MMM d, yyyy - HH:mm")} </time>
        </div>

        <img src={postInfo.cover} alt="Post Img"/>
    </div>

    <div className="single-texts">
        <p className="single-content"> { parse(postInfo.content) } </p>
    </div>

    </div>
    );
}