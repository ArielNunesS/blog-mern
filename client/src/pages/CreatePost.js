import ReactQuill from "react-quill";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import 'react-quill/dist/quill.snow.css';
import '../CreatePost.css'

const   modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];
  
export default function CreatePost() {
    const [ title, setTitle ] = useState('');
    const [ summary, setSummary ] = useState('');
    const [ content, setContent ] = useState('');
    const [ files, setFiles ] = useState('');
    const [ redirect, setRedirect ] = useState(false);
    const [ isActive, setIsActive ] = useState(false);

    useEffect(() => {
        const cleanContent = content.replace(/<(.|\n)*?>/g, '').trim();
        if (title.trim() !== '' && summary.trim() !== '' && cleanContent.trim() !== '') {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [title, summary, content]);

    async function CreateNewPost(e) {
        e.preventDefault();

        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);

        const response = await fetch('http://localhost:4000/posts', {
           method: 'POST',
           body: data,
           credentials: 'include',
        });

        if(response.ok){
            setRedirect(true);
        }
    }
    
    if(redirect){
        return <Navigate to={'/'} />
    }

    return ( <>
        <form className="post-form" onSubmit={CreateNewPost}>
            <h1>Make Your Post</h1>
            <label>Title</label>
                <input type="title"
                className="title-input"
                value={title}
                onChange={e => setTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            />

            <label>Summary</label>
                <input type="summary"
                className="summary-input"
                value={summary}
                onChange={e => setSummary(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            />

            <div className="file-btn">
                <input type="file"
                id="file-upload"
                className="file-input"
                onChange={e => setFiles(e.target.files)}
                onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            />

                <label htmlFor="file-upload" className="custom-file-label">
                    Upload a Image
                </label>

            </div>

                <ReactQuill
                className="text-editor"
                value={content}
                modules={modules}
                formats={formats}
                onChange={newValue => setContent(newValue)}
                />
                    <button type="submit"
                        className={`btn-create-post ${isActive ? 'active' : ''}`}>
                        Create Post
                    </button>
        </form>
        </>
    );
}