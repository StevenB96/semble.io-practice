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
        if (updateForm.type === ContentType.Post) {
          prevPosts.map(post =>
            post.id === updateForm.id
              ? { ...post, title: updateForm.title, text: updateForm.text }
              : post
          )
        } else {
          prevPosts.map(post => {
            const comments: Comment[] = post.comments;
            comments.map(
              comment => {
                post.id === updateForm.id
                  ? { ...post, title: updateForm.title, text: updateForm.text }
                  : post
              })
          })
        }

        return prevPosts;
      });
    }
    updateItemData(updateForm);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts using async/await
        const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!postsResponse.ok) {
          throw new Error('Failed to fetch posts');
        }

        const postsData: Post[] = await postsResponse.json();
        setPosts(postsData);

        // After posts are set, fetch comments using Promises
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

    fetchPosts();
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
