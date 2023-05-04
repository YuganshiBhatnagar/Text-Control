import React, { useState } from "react";

export default function TextForm(props) {
  const [text, setText] = useState("Write text");

  const handleUpClick = () => {
    //console.log("hello" + text);
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to uppercase", "Success");
  };

  //for lowercase
  const handleLoClick = () => {
    //console.log("hello" + text);
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to lowercase", "Success");
  };

  //for ClearText
  const handleClearText = () => {
    setText(" ");
    props.showAlert("Text clear", "Success");
  };

  //for Checking Grammer
  function handleTextChange(event) {
    setText(event.target.value);
  }

  //for Capitalized case
  const handleCaClick = () => {
    let Str = text;
    const MyArray = Str.split(" ");
    //console.log(MyArray);

    for (var i = 0; i < MyArray.length; i++) {
      MyArray[i] =
        MyArray[i].charAt(0).toUpperCase() + MyArray[i].slice(1).toLowerCase();
    }

    const str2 = MyArray.join(" ");
    setText(str2);
    props.showAlert("Converted to capitalized", "Success");
  };

  const speak = () => {
    let msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
    const toogle = document.getElementById("toggle");
    if (toogle.textContent === "Speak") {
      toogle.innerHTML = "Stop";
    } else {
      toogle.innerHTML = "Speak";
      if ((toogle.innerHTML = "Speak")) {
        window.speechSynthesis.cancel();
      }
    }
    props.showAlert("Success", "Listen");
  };

  return (
    <>
      <div
        className="container"
        style={{ color: props.mode === "dark" ? "white" : "#042743" }}
      >
        <h2>{props.heading}</h2>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleTextChange}
            id="myBox"
            rows="10"
            style={{
              backgroundColor: props.mode === "dark" ? "#13466e" : "white",
              color: props.mode === "dark" ? "white" : "#042743",
            }}
          ></textarea>
        </div>
        <button className="btn btn-primary mx-1" onClick={handleUpClick}>
          Convert To Uppercase
        </button>
        <button className="btn btn-primary mx-1" onClick={handleLoClick}>
          Convert To Lowercase
        </button>
        <button className="btn btn-primary mx-1" onClick={handleCaClick}>
          Capitalized Case
        </button>
        <button className="btn btn-primary mx-1" onClick={handleClearText}>
          Clear Text
        </button>
        <button
          type="submit"
          onClick={speak}
          className="btn btn-warning mx-2 my-2"
          id="toggle"
        >
          Speak
        </button>
      </div>
      <div
        className="container"
        style={{ color: props.mode === "dark" ? "white" : "#042743" }}
      >
        <h2>Your Text Summary</h2>
        <div>
          {text.length === 0 ? (
            <p>0 Words and 0 characters</p>
          ) : (
            <p>
              {text.split(" ").length} Words and {text.length} characters
            </p>
          )}
        </div>
        <p>{0.005 * text.split(" ").length} Minutes Read</p>
        <h2>Preview</h2>
        <p>{text.length > 0 ? text : "Nothing to preview"}</p>
      </div>
    </>
  );
}
