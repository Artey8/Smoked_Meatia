import React, { useState, useEffect } from 'react';

const Loading = (props) => {
  const [loadingImages, setLoadingImages] = useState([1]);
  const [current, setCurrent] = useState(0);


  useEffect(() => {
    setTimeout(() => {
      if (loadingImages.length === 7) {
        setLoadingImages([1]);
      } else {
        setLoadingImages([...loadingImages, 1])
      }
    }, 200);
  }, [loadingImages]);

  return (
    <>
      <p>Loading...</p>
      {loadingImages.map((image, i) => (
        <img key={i} src="https://img.icons8.com/color/48/000000/cuts-of-beef.png"/>
      ))}
    </>
  )
}

export default Loading