import React from 'react';
import parse from 'html-react-parser';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { format } from "date-fns";

export default function Post({_id, title, summary, content, cover, createdAt, author}){

    const [ contentOverflows, setContentOverflows ] = useState(false);
    const contentRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const checkOverflow = () => {
            if(contentRef.current && containerRef.current) {
                const isOverflowing = contentRef.current.scrollHeight > containerRef.current.clientHeight;
                setContentOverflows(isOverflowing);
            }
        }

        checkOverflow();
            window.addEventListener('resize', checkOverflow);

        return () => {
            window.removeEventListener('resize', checkOverflow);
        };
    }, [content])

    return (<>

    <div className="post-card">
        <div className="post-image">
            <Link to={`/posts/${_id}`}>
                <img src={process.env.UPLOADS+cover}></img>
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

            <div ref={containerRef}>          
                    <p className="content" ref={contentRef}> {parse(content)} </p>
            </div>

            {contentOverflows && (
                <div className='learn-more'>
                    <Link to={`/posts/${_id}`}>
                        <button className='learn-more-btn'>
                            Learn more...
                        </button>
                    </Link>
                </div>
            )};

        </div>
    </div>
        </>);
    }