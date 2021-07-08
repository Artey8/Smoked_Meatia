import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash'

const Login = (props) => {
  const [userName, setUsername] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const { setUser, setLoggedIn } = props;

  useEffect(() => {
    axios.get('/users')
    .then((res) => {
      let AllNames = [];
      for (let i = 0; i < res.data.length; i++) {
        AllNames.push(res.data[i].name)
      }
      setAllUsers(AllNames)
    }).catch((err) => {
      console.error(err);
      alert('Something has gone significantly wrong');
    })
  }, [props])

  const validate = () => {
    return new Promise((resolve) => {
      let result = {
        valid: true,
        message: '',
      };
      if (
        userName.indexOf('<script/>') > -1 ||
        userName.indexOf('<script>') > -1 ||
        userName.indexOf('</script>') > -1
        ) {
        console.log('got here')
        result.valid = false;
        result.message = 'No Scripting Please';
        setUsername('');
        resolve(result);
      } else if (
        _.indexOf(allUsers, userName) > -1
      ) {
        result.valid = true;
        result.message = 'Already Taken';
        resolve(result);
      } else {
        resolve(result);
      }
    })
  }

  return (
    <div id="login">
      <input
        maxLength="15"
        type="text"
        placeholder="Enter your UserName"
        className="login-input"
        value={userName}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <button
        type="button"
        className="login-input"
        id="login-submit"
        onClick={() => {
          validate()
          .then(({ valid, message }) => {
            if (!valid) {
              alert(message)
              setUsername('');
            } else {
              if (message === 'Already Taken') {
                setUser(userName);
                setLoggedIn(true);
              } else {
                axios.post('/users', {
                  name: userName
                }).then((res) => {
                  setUser(userName);
                  setLoggedIn(true);
                }).catch((err) => {
                  console.error(err);
                  alert('Counldn\'t complete request')
                })
              }
            }
          })
        }}
      >
        Login
      </button>
    </div>
  )
}

export default Login;