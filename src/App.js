import React from 'react';
import './App.css';

async function getGradient() {
  const response = await fetch("https://raw.githubusercontent.com/itmeo/webgradients/master/gradients-parsed.json");
  const gradients = await response.json();
  // select random gradient from library and build style string
  const swatch = gradients[Math.floor(Math.random()*gradients.length)];
  const deg = swatch.deg;
  let gradient = "";
  for (const stop of swatch.gradient) {
    gradient += stop.color + " " + stop.pos + "%, ";
  }
  gradient = gradient.substring(0, gradient.length-2);
  const styleVal = 'linear-gradient('+deg+'deg, '+ gradient+')';
  return styleVal;
}

// let AppStyle;
// getGradient().then(result => {
//   console.log(result);
//   AppStyle = {
//     backgroundImage: result
//   }
//   console.log(AppStyle);
// })

// console.log(AppStyle)

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        insert app here
      </div>
    );
  }
}

export default App;
