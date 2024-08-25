import React, {
  useEffect,
  useState,
} from 'react';
import "./MainPage.css";
import { Post, Comment, UpdateForm } from "../../Types";
import { ContentType } from "../../Enums";

import Form from "../Form";
import Body from "../Body";
import Header from "../Header";

type MainPageProps = {
};

const MainPage = ({ }: MainPageProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [itemData, updateItemData] = useState<UpdateForm | null>(null);

  const handleUpdateItemData = (updateForm: UpdateForm | null) => {
    if (updateForm && itemData) {
      setPosts(prevPosts => {
        return prevPosts.map(post => {
          if (updateForm.type === ContentType.Post && post.id === updateForm.id) {
            // Update post
            return {
              ...post,
              title: updateForm.title,
              body: updateForm.text
            };
          }

          if (updateForm.type === ContentType.Comment && post.comments) {
            // Update comments if the post ID matches and comments are present
            return {
              ...post,
              comments: post.comments.map(comment =>
                comment.id === updateForm.id
                  ? {
                    ...comment,
                    name: updateForm.title,
                    body: updateForm.text
                  }
                  : comment
              )
            };
          }

          return post;
        });
      });
      updateItemData(null);
    } else {
      updateItemData(updateForm);
    }
  };

  const fetchPosts = async () => {
    try {
      const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!postsResponse.ok) {
        throw new Error('Failed to fetch posts');
      }

      const postsData: Post[] = await postsResponse.json();
      setPosts(postsData);

      fetch('https://jsonplaceholder.typicode.com/comments')
        .then(commentsResponse => {
          if (!commentsResponse.ok) {
            throw new Error('Failed to fetch comments');
          }
          return commentsResponse.json();
        })
        .then((commentsData: Comment[]) => {
          const postsWithComments = postsData.map(post => {
            const postComments: Comment[] = commentsData
              .filter(
                (comment: Comment) => comment.postId === post.id
              );
            return { ...post, comments: postComments };
          });

          setPosts(postsWithComments);
        }).catch(error => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();

    const intervalId = setInterval(() => {
      fetchPosts();
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="MainPage">
      <Header />
      <Body
        posts={posts}
        handleUpdateItemData={handleUpdateItemData}
      />
      {
        itemData &&
        <Form
          itemData={itemData}
          handleUpdateItemData={handleUpdateItemData}
        />
      }
    </div>
  );
}

export default MainPage;
