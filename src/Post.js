import React from 'react';

const Post = ({ posts }) => {
  return (
    <>
      {posts &&
        posts.map((post) => (
          <div className="post-card" key={post.id}>
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>
        ))}
    </>
  );
};

export default Post;