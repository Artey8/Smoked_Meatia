import React, { useState } from 'react';
import data from './mockdata';
import Feed from './Feed';

const App = (props) => {
  return (
    <>
      <h1 className='title'>Smoked Meatia</h1>
      <div id="main">
        <Feed data={data.feedData}/>
      </div>
    </>
  )
}

export default App;