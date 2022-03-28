import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [options, setOptions] = useState([]);
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("en");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
 
  // internationalization concept i18
  const translateFunc = async () => {
    if (input) {
      const params = new URLSearchParams();
      params.append("q", input);
      params.append("source", from);
      params.append("target", to);
      params.append("format", "text");
      params.append("api_key", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");

      axios
        .post("https://libretranslate.de/translate", params, {
          headers: {
            accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          console.log(res.data);
          setOutput(res.data.translatedText);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert(`enter some text`);
    }
  };

  useEffect(() => {
    axios
      .get("https://libretranslate.de/languages", {
        headers: {
          accept: "application/json",
        },
      })
      .then((res) => {
        setOptions(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <h2>Language Translater App</h2>

      <div className="selectLang">
        <h3>From: ({from})</h3>
        <select onChange={(e) => setFrom(e.target.value)}>
          {options.map((opt) => (
            <option value={opt.code} key={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
        <h3>To: ({to})</h3>
        <select onChange={(e) => setTo(e.target.value)}>
          {options.map((opt) => (
            <option value={opt.code} key={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <textarea
          wrap="on"
          onInput={(e) => setInput(e.target.value)}
        ></textarea>
      </div>
      <div>
        <textarea wrap="on" value={output} onChange={() => {}}></textarea>
      </div>
      <div>
        <button className="btn" onClick={() => translateFunc()}>
          Translate
        </button>
      </div>
    </div>
  );
}

export default App;
