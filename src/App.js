import React from 'react';
import './App.css';
import gradients from './data/gradients.json';

function getGradient() {
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {},
      loaded: false
    };
  }

  componentDidMount() {
    const gradient = getGradient();
    this.setState((state, props) => ({
      style: {
        backgroundImage: gradient
      },
      loaded: true
    }));
    console.log(gradient);
  }

  render() {
    const classes = this.state.loaded ? 'App' : 'App hidden';
    return (
      <div className={classes} style={this.state.style}>
        insert app here
      </div>
    );
  }
}

export default App;
