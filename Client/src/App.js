import React from "react";
import TextEditor from "./components/TextEditor";
import "./App.css";

function App() {
  return (
    <>
      <div className="App" >
        <header className="App-header">
          <h1> React Text Editor </h1>
        </header>

        <div className="editor">
          <TextEditor />
        </div>

        <button> Generate PDF </button>
      </div>

    </>
  );
}

export default App;
