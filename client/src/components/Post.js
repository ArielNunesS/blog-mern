import React from 'react';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import { format } from "date-fns";

export default function Post({_id, title, summary, content, cover, createdAt, author}){

    return (<>

    <div className="post-card">
        <div className="post-image">
            <Link to={`/posts/${_id}`}>
                <img src={'http://localhost:4000/'+cover}></img>
            </Link>
        </div>

        <div className="post-content">
            <Link to={`/posts/${_id}`}> </Link>
            
            <Link to={`/posts/${_id}`}>
                <h2> {title} </h2>
            </Link>
            
            <time className='post-date'> {format(new Date(createdAt), "MMM d, yyyy - HH:mm")} </time>

            <div className="author-info">
                <span> Por </span>
                <Link to={`users/${author._id}`}>
                    <a className="author">{author.username}</a>
                </Link>
            </div>

            <p className="summary"> {summary} </p>    
            <p className="content"> {parse(content)} </p>
            
        </div>
    </div>
        </>);
    }