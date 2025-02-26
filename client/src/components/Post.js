import React from 'react';
import parse from 'html-react-parser';
import { format } from "date-fns";
import { Link } from 'react-router-dom';

export default function Post({_id, title, summary, content, cover, createdAt, author}){

    return (<>
        <div className="post">
            <Link to={`/posts/${_id}`}>
                <img src={'http://localhost:4000/'+cover}></img>
            </Link>
            <div className="text">
            <Link to={`/posts/${_id}`}>
                <h2> {title} </h2>
            </Link>
            <p className="summary"> {summary} </p>
    
            <p className="info">
                <a className="author">{author.username}</a>
                <time> {format(new Date(createdAt), "MMM d, yyyy - HH:mm")} </time>
            </p>
    
            <p className="content"> {parse(content)} </p>
            
            </div>
        </div>
        </>);
    }