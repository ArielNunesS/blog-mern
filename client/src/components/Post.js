import parse from 'html-react-parser';
import { format } from "date-fns";

export default function Post({title, summary, content, cover, createdAt, author}){
    return (<>
    <div className="post">
            <img src={'http://localhost:4000/'+cover}></img>
        <div className="text">
            <h2> {title} </h2>

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
