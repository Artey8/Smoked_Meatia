import React, { useState, useEffect } from 'react';
import data from './mockdata';
import Feed from './Feed';
import PostForm from './PostForm';
import Login from './Login';

const App = (props) => {
  const [createClicked, setCreateClicked] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (createClicked === 'posted') {
      setTimeout(() => {
        setCreateClicked(false);
      }, 1500);
    }
  }, [createClicked])

  if (!loggedIn) {
    return (
      <Login setUser={setUser} setLoggedIn={setLoggedIn}/>
    )
  } else {
    return (
      <>
        <h1 className='title'>Smoked Meatia</h1>
        <h2 className='user-name-title'>{user}</h2>
        <div id="main">
          <Feed setCreateClicked={setCreateClicked} data={data.feedData}/>
          {createClicked &&(
          <>
            {createClicked === true ? (
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
                  <PostForm setCreateClicked={setCreateClicked} user={user}/>
                </div>
              </>
            ) : (
              <h1 className="post-banner">Posted!</h1>
            )}
          </>
        )}
        </div>
      </>
    )
  }
}

export default App;