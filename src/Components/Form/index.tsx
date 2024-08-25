import React, { FC, useState } from 'react';
import './Form.css';

import { UpdateForm } from "../../Types";
import { ContentType } from "../../Enums";

const Form: FC<{
  itemData: UpdateForm,
  handleUpdateItemData: Function
}> = ({
  itemData,
  handleUpdateItemData
}) => {
    const isPost: boolean = itemData.type === ContentType.Post;

    const [title, setTitle] = useState<string>(itemData.title || '');
    const [text, setText] = useState<string>(itemData.text || '');

    /**
     * Closes the update form.
     */
    const handleCloseClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      handleUpdateItemData(null);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      itemData.title = title;
      itemData.text = text;
      handleUpdateItemData(itemData);
    }

    return (
      <form
        onSubmit={handleSubmit}
        className='Form'
        style={{
          backgroundColor: isPost ? 'navajowhite' : 'bisque',
        }}>
        <h3
          style={{
            fontSize: '150%',
          }}>
          {`Update ${isPost ? 'Post' : 'Comment'}: ${itemData.id}`}
        </h3>

        <div className="mb-3 text-start">
          <label htmlFor="title" className="form-label"
            style={{
              fontSize: '100%',
            }}>Title</label>
          <input
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              fontSize: '80%',
            }}
          />
        </div>

        <div className="mb-3 text-start">
          <label
            htmlFor="text"
            className="form-label"
            style={{
              fontSize: '100%',
            }}>Text</label>
          <textarea
            className="form-control"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              fontSize: '80%',
            }}
          ></textarea>
        </div>

        <br />

        <div>
          <button
            type="submit"
            className="btn btn-primary w-25">Save
          </button>
          <button
            type="button"
            className="btn btn-danger w-25"
            onClick={handleCloseClick}>Close
          </button>
        </div>
      </form>
    );
  };

export default Form;