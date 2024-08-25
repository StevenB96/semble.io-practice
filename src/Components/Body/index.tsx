import React, {
  FC,
  useState,
  useEffect,
} from 'react';
import './Body.css';
import { Post, Comment } from "../../Types";

import Card from "../Card";

type BodyProps = {
  posts: Post[];
  handleUpdateItemData: Function;
};

const Body: FC<BodyProps> = ({ posts, handleUpdateItemData, }) => {

  return (
    <div className="Body">
      {
        posts.map((
          post: Post,
          index: number
        ) => {
          return (
            <Card
              key={post.id}
              post={post}
              handleUpdateItemData={handleUpdateItemData}
            />
          )
        })}
    </div>
  );
}

export default Body;
