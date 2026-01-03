import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Buffer } from "buffer";
import matter from "gray-matter";
import { postFileUrls } from "../posts";
import "./BlogGrid.css";

// Polyfill Buffer for gray-matter in browser
window.Buffer = Buffer;

function formatRange(a, b) {
    return `${a} → ${b}`;
}

export default function BlogGrid() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function loadPosts() {
            const loadedPosts = await Promise.all(
                postFileUrls.map(async (url) => {
                    const response = await fetch(url);
                    const rawContent = await response.text();
                    const { data, content: markdownContent } = matter(rawContent);
                    const excerpt =
                        data.summary ||
                        markdownContent.replace(/\n/g, " ").slice(0, 140).trim() + "...";
                    return { ...data, excerpt };
                })
            );

            // newest first
            loadedPosts.sort((p1, p2) => (p2.week ?? 0) - (p1.week ?? 0));
            setPosts(loadedPosts);
        }

        loadPosts();
    }, []);

    return (
        <section className="blogSection">
            <div className="blogHeader">
                <h2>Weekly Blog Posts</h2>
                <p>
                    Trying to push out simple projects and learn new concepts. This helps me to keep track
                    of progress.
                </p>
            </div>

            <div className="postGrid">
                {posts.map((p) => (
                    <Link key={p.slug} to={`/week/${p.slug}`} className="postCard">
                        {p.thumbnail ? (
                            <div className="postThumbWrap">
                                <img className="postThumb" src={p.thumbnail} alt={p.title} />
                                <div className="postThumbOverlay">
                                    <span className="readMore">Read more</span>
                                </div>
                            </div>
                        ) : null}

                        <div className="postMeta">
                            <span className="postDate">
                                Week {p.week} • {formatRange(p.dateStart, p.dateEnd)}
                            </span>
                            {p.minutes ? <span className="postMinutes">{p.minutes} min read</span> : null}
                        </div>

                        <h3 className="postTitle">{p.title}</h3>
                        <p className="postExcerpt">{p.excerpt}</p>

                        {Array.isArray(p.tags) && p.tags.length ? (
                            <div className="postTags">
                                {p.tags.map((t) => (
                                    <span key={t} className="tag">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        ) : null}
                    </Link>
                ))}
            </div>
        </section>
    );
}
