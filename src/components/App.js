import React from 'react';
import gradients from '../data/gradients.json';
import Decks from './Decks.js';
import CardView from './CardView';

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
    this.flipCard = this.flipCard.bind(this);
    this.state = {
      style: {
        opacity: 0
      },
      flipped: false,
      cardPos: [0, 0],
      promptGroup: ""
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

  flipCard(x, y, promptGroup) {
    this.setState({
        flipped: true,
        cardPos: [x, y],
        promptGroup: promptGroup
    });
  }

  render() {
    let cardView;
    if (this.state.flipped) {
      cardView = <CardView promptGroup={this.state.promptGroup} pos={this.state.cardPos} />;
    }

    return (
      <main className={this.state.flipped ? "App modal" : "App"} style={this.state.style}>
        <Decks flipCard={this.flipCard} />
        {cardView}
      </main>
    );
  }
}

export default App;
