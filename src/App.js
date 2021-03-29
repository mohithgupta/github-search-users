import { TextField } from "@material-ui/core";
import { useEffect,useState } from "react";
import "./App.css";
import GitHubIcon from "@material-ui/icons/GitHub";

function App() {
  const [username, setUsername] = useState("mohithgupta");
  const [data, setData] = useState("");
  const [login, setLogin] = useState("");

  const url = "https://api.github.com/users/";

  const search = (e) => {
    if (e.keyCode === 13) {
      setLogin(username);
  }
};

useEffect(()=>{
  fetch(url + username)
  .then((data) => {
    return data.json();
  })
  .then((data) => {
    setData(data);
    console.log(data);
  });
},[username,login])

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
          value={username}
          onKeyDown={(e) => search(e)}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="profile">
        <div align="center" className="flex main">
          <img src={data.avatar_url} alt="Github User Profile Pic" />
          <div className="main__right">
            <h3>{data.name ? data.name : "User Not Found"}</h3>
            <div className="flex github-username">
              <GitHubIcon style={{ marginRight: "5px" }} />
              <p style={{ color: "#333" }}>{data.login}</p>
            </div>
            <a href="https://github.com/mohithgupta" target="_blank" rel="noreferrer" id="link">Visit Profile</a>
          </div>
        </div>
        <p>{data.bio}</p>
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
