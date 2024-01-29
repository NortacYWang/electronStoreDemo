import {useEffect} from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {

  const loadData = async () => {
     const result = await window.electron.ipcRenderer.loadStoreData();
     console.log("result", result);
  };

  // const setData = async () => {
  //   console.log("clicking...")
  //   const result = await window.electron.ipcRenderer.setStoreValue("token", "2");
  //   console.log("set result", result);
  // }

  const setData = async () => {
    console.log("clicking...")
    const result = await window.electron.dotConnection("greeting", "pan pan");
    console.log("hex result", result);
  }

  
  useEffect(() => {
    loadData();
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"  />
        <p onClick={() => setData()}>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
