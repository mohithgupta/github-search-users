import { TextField } from "@material-ui/core";
import { useEffect,useState } from "react";
import "./App.css";
import GitHubIcon from "@material-ui/icons/GitHub";

function App() {
  const [username, setUsername] = useState("mohithgupta");
  const [data, setData] = useState("");
  const [login, setLogin] = useState("mohithgupta");

  const url = "https://api.github.com/users/";

  // For unauthenticated requests, the rate limit allows for up to 60 requests per hour.
  // Unauthenticated requests are associated with the originating IP address, and not the user making requests.
   
  // I have not use Github Token or any authentication.
  // So I updated the code to use setlogin to not set uername each time we type a character as requests are very limited.

useEffect(()=>{
  fetch(url + login)
  .then((data) => {
    return data.json();
  })
  .then((data) => {
    setData(data);
    console.log(data);
  });
},[login])  

// with live changing username and async based
// useEffect(()=>{
//   fetch(url + username)
//   .then( async (data) => {
//     data=await data.json();
//     setData(data);
//     console.log(data);
//   });
// },[username]) 

if(data){
  document.getElementById("link").setAttribute("href", `${data.html_url}`)
}

  return (
    <div className="App flex">
      <div className="modal">
        <TextField
          label="User Name"
          style={{ width: "100%" }}
          variant="outlined"
          // value={username}
          onKeyDown={(e) => e.key==='Enter' && setLogin(username)}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="profile">
        <div align="center" className="flex main">
          <img src={data.avatar_url} alt={data.avatar_url ? data.name+"'s pic" : "Pic not Found"}/>
          <div className="main__right">
            <h3>{data.name ? data.name : "Name not Found"}</h3>
            <div className="flex github-username">
              <GitHubIcon style={{ marginRight: "5px" }} />
              <p style={{ color: "#333" }}>{data.login ? data.login : "UserName Invalid"}</p>
            </div>
            <a href="https://github.com/mohithgupta" target="_blank" rel="noreferrer" id="link">{data.login ? "Visit Profile" : "Back to HomePage"}</a>
          </div>
        </div>
        <p>About : {data.bio ? data.bio : "Not Available"}</p>
        <div className="flex counters">
          <div className="count">
            <h3>{data.public_repos}</h3>
            <p>Public Repos</p>
          </div>
          <div className="count">
            <h3>{data.followers}</h3>
            <p>Followers</p>
          </div>
          <div className="count">
            <h3>{data.following}</h3>
            <p>Following</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
