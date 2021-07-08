import React, { useState } from 'react';
import data from './mockdata';
import Feed from './Feed';
import PostForm from './PostForm';
import Login from './Login';

const App = (props) => {
  const [createClicked, setCreateClicked] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  if (!loggedIn) {
    return (
      <Login setUser={setUser} setLoggedIn={setLoggedIn}/>
    )
  } else {
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
              <PostForm user={user}/>
            </div>
          </>
        )}
        </div>
      </>
    )
  }
}

export default App;