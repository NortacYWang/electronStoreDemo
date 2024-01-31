import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [dataToken, setDataToken] = useState(null);
  const loadData = async () => {
    const result = await window.electron.ipcRenderer.loadStoreData();
    setDataToken(result.token);
  };

  const setData = async () => {
    const result = await window.electron.ipcRenderer.setStoreValue(
      "token",
      "2345"
    );

    loadData();
  };

  const toUnzip =
    "1F8B0800000000000003E3E6CFDBA5C820CBC0C09122ECA1C8C0F281CDC54B2138D2CF99C9D0C87866B788E9FC37860700B43D2BB325000000";
  const unzip = async (toUnzip) => {
    const result = await window.electron.ipcRenderer.unzipHex(toUnzip);
    console.log("hex zipped result", result);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{dataToken}</p>
        <p onClick={() => unzip(toUnzip)}>
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
