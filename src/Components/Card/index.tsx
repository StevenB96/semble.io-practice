import React from 'react';
import './Card.css';
import { Post, Comment } from "../../Types";
import { ContentType } from "../../Enums";

const Card = (props: { post: Post, handleUpdateItemData: Function }) => {
  const { post, handleUpdateItemData } = props;

  return (
    <div className="Card">
      <div onClick={
        () => handleUpdateItemData(
          {
            id: post.id,
            type: ContentType.Post,
            title: post.title,
            text: post.body
          }
        )
      }>
        <h1 style={{ fontSize: '100%' }}>{post.id}. {post.title}</h1>
        <p style={{ fontSize: '80%', }}>{post.body}</p>
      </div>
      <div className="SubCardContainer">
        {post.comments?.map((comment: Comment, index: number) => {
          return (
            <div
              key={comment.id}
              className="SubCard"
              onClick={
                () => handleUpdateItemData(
                  { 
                    id: comment.id, 
                    type: ContentType.Comment,
                    title: comment.name,
                    text: comment.body
                  }
                )
              }>
              <h3 style={{ fontSize: '70%' }}>{comment.id}. {comment.name}</h3>
              <p style={{ fontSize: '60%', }}>{comment.body}</p>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default Card;
