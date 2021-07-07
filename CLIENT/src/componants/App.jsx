import React, { useState } from 'react';
import data from './mockdata';
import Feed from './Feed';
import PostForm from './PostForm';

const App = (props) => {
  const [createClicked, setCreateClicked] = useState(false);

  return (
    <>
      <h1 className='title'>Smoked Meatia</h1>
      <div id="main">
        <Feed setCreateClicked={setCreateClicked} data={data.feedData}/>
        {createClicked &&(
        <>
          <div
            id="back-drop"
            onClick={(e) => {
              setCreateClicked(false);
            }}
          >
          </div>
          <div id="post-form">
            <button
              id="post-form-close-button"
              type="button"
              onClick={(e) => {
                setCreateClicked(false);
              }}
            >
              X
            </button>
            <PostForm />
          </div>
        </>
      )}
      </div>
    </>
  )
}

export default App;