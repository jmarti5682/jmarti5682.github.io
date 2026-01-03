import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Buffer } from "buffer";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { postFileContents } from "../posts";
import "./PostPage.css";

// Polyfill Buffer for gray-matter in browser
window.Buffer = Buffer;

export default function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function loadPost() {
      setLoading(true);
      for (const rawContent of postFileContents) {
        const { data, content: markdownContent } = matter(rawContent);
        if (data.slug === slug) {
          setPost({ data, content: markdownContent });
          setLoading(false);
          return;
        }
      }
      setPost(null);
      setLoading(false);
    }

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="page">
        <p>Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="page">
        <h2>Post not found</h2>
        <Link to="/">Go home</Link>
      </div>
    );
  }

  const { data, content } = post;

  return (
    <div className="page postPage">
      <Link className="backLink" to="/">← Back</Link>

      <div className="postHeader">
        <div className="postHeaderMeta">
          <span>Week {data.week}</span>
          <span>{data.dateStart} → {data.dateEnd}</span>
          {data.minutes ? <span>{data.minutes} min read</span> : null}
        </div>
        <h1>{data.title}</h1>
        {data.summary ? <p className="postSummary">{data.summary}</p> : null}
      </div>

      <article className="markdown">
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
    </div>
  );
}
