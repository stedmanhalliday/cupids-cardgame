import React from 'react';
import Decks from './Decks.js'
import gradients from '../data/gradients.json';

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
    this.mountStyle = this.mountStyle.bind(this);
    this.state = {
      style: {
        opacity: 0
      }
    };
  }

  mountStyle() {
    const gradient = getGradient();
    this.setState({
      style: {
        backgroundImage: gradient,
        opacity: 1
      }
    });
    console.log(gradient);
  }

  componentDidMount() {
    setTimeout(this.mountStyle, 10);
  }

  render() {
    return (
      <section className="flex h-screen transition-opacity duration-1000 items-center" style={this.state.style}>
        <Decks />
      </section>
    );
  }
}

export default App;
