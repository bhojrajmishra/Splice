import logo from './logo.svg';
import { useEffect, useState} from 'react';
import jwt_decode from "jwt-decode";
import './App.css';

function App() {

  const [ user, setUser ] = useState({});

  function handlecallbackResponse(response){
    console.log("Encoded JWT ID token:"+ response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }
  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }
useEffect(()=> {
    /*global  google  */
    google.accounts.id.initialize({
      client_id: "594987754004-hic9uc3chb6fhg55emt0qajbdgh5hlea.apps.googleusercontent.com",
      callback: handlecallbackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large"}
    );
    google.accounts.id.prompt();
}, []);
//  if we have no user: sign in button
// if we have a user: show the log out button

  return (
    <div className="App">
       <div id="signInDiv"></div>
       { Object.keys(user).length != 0 &&
          <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
       }
       
       { user && 
          <div>
            <img src={user.picture} alt=""></img>
            <h3>{user.name}</h3>
            </div>
       }
    </div>
  );
}

export default App;
