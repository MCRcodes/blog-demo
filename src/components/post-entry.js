import React, { useState } from 'react';
import { v4 } from 'uuid';

// types
import { PostType } from '../types/post.type';
import { UserType } from '../types/user.type';

// components
import CommentInput from './comment-input';
import CommentList from './comment-list';

const PostEntry = ({ post, user }) => {
    const { title, body } = post;
    const { name } = user;

    const [likeCounter, setLikeCounter] = useState(0);
    const [theme, setTheme] = useState('light');
    const [comments, setComments] = useState([]);

    const updateCounter = () => {
        setLikeCounter(previousCounter => previousCounter + 1);
    };
    const updateTheme = selectedTheme => {
        setTheme(selectedTheme);
    };
    const addComment = comment => {
        setComments(prev => [...prev, { uuid: v4(), ...comment }]);
    };

    return (
        <article
            style={{
                background: theme === 'light' ? '#eee' : '#333',
                color: theme === 'light' ? '#333' : '#eee',
            }}
        >
            <h2>{title}</h2>
            <h3>by {name}</h3>
            <p>{body}</p>
            <div>
                <span>{likeCounter}</span>
                <button type="button" onClick={() => updateCounter()}>
                    +
                </button>
                <button type="button" onClick={() => updateTheme('light')}>
                    light
                </button>
                <button type="button" onClick={() => updateTheme('dark')}>
                    dark
                </button>
            </div>
            <CommentInput addComment={addComment} />
            <CommentList comments={comments} />
        </article>
    );
};

PostEntry.propTypes = {
    post: PostType.isRequired,
    user: UserType.isRequired,
};

export default PostEntry;
