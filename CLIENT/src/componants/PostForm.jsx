import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';

const PostForm = (props) => {
  const [pMessage, setpMessage] = useState('');
  const [photo, setPhoto] = useState('');
  const [ready, setReady] = useState(true);
  const { user } = props;


  const postPhotos = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file[file.length - 1]);
    reader.onload = (e) => {
      const fileData = e.target.result;
      axios.post('/photos', { fileData })
      .then((result) => {
        setPhoto(result.data);
        setReady(true);
      })
      .catch((err) => new Error(err));
    };
  };

  useEffect(() => {
    console.log(photo);
  }, [photo])

  const validate = () => {
    return new Promise((resolve) => {
      let result = {
        valid: true,
        message: '',
      };
      if (
        pMessage.indexOf('<script/>') > -1 ||
        pMessage.indexOf('<script>') > -1 ||
        pMessage.indexOf('</script>') > -1
        ) {
        console.log('got here')
        result.valid = false;
        result.message = 'No Scripting Please';
        setMessage('');
      } else if (!ready) {
        result.valid = false;
        result.message = 'Wait for image to finish uploading';
      }
      resolve(result);
    })
  }

  return (
    <div>
      <label className="post-form-label">Message</label>
      <textarea
        col="40"
        maxLength="100"
        placeholder="Say whatever meaty things are on your mind"
        type="text"
        className="post-form-input"
        value={pMessage}
        onChange={e => {
          setpMessage(e.target.value)
        }}
      />
      <label className="post-form-label">Upload an Image</label>
      <input
        type="file"
        accept="image/png, image/jpeg, image/heic"
        className="post-form-input"
        onChange={(e) => {
          setReady(false);
          postPhotos(e.target.files);
        }}
      />
      {!ready && (
        <Loading />
      )}
      {photo.length > 0 && (
        <img className="post-form-image" src={photo} />
      )}
      <button
        className="post-form-input"
        id="post-form-submit"
        type="button"
        onClick={(e) => {
          validate()
          .then(({ valid, message }) => {
            if (!valid) {
              alert(message);
            } else {
              let postObj = {
                message: pMessage,
                photo,
                user,
              }
              axios.post('/posts', postObj)
              .then((res) => {
                console.log('posted');
              }).catch((err) => {
                console.error(err);
              })
            }
          })
        }}
      >
        Post!
      </button>
    </div>
  );
}

export default PostForm;