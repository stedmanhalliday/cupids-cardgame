import React from "react";
import gradients from "../data/gradients.json";
import promptsLibrary from "../data/prompts.json";
import Decks from "./Decks.js";
import CardView from "./CardView";

let stackDecks = (promptsLibrary) => {
    let gameDecks = [];
    for (let n=0; n<5 && promptsLibrary.length; n++) {   //max 5 decks per game
        const i = Math.floor(Math.random()*promptsLibrary.length);   //random deck index
        const deck = promptsLibrary.splice(i, 1);    //pull random deck
        gameDecks.push({     //name deck in game decks
            "promptGroup": deck[0].promptGroup,
            "prompts": []
        });
        const hand = deck[0].prompts;   //get cards from random deck
        for (let m=0; m<7 && hand.length; m++) {    //max 7 cards per deck
            const j = Math.floor(Math.random()*hand.length);    //random card index
            const card = hand.splice(j, 1);     //pull random card
            gameDecks[gameDecks.length-1].prompts.push(card);   //insert random card into game deck
        }
    }
    return gameDecks;
}

let gameDecks = stackDecks(promptsLibrary);   //initialize game decks from card library

function getGradient() {
  // select random gradient from library and build style string
  const swatch = gradients[Math.floor(Math.random()*gradients.length)];
  const deg = swatch.deg;
  let gradient = "";
  for (const stop of swatch.gradient) {
    gradient += stop.color + " " + stop.pos + "%, ";
  }
  gradient = gradient.substring(0, gradient.length-2);
  const styleVal = "linear-gradient("+deg+"deg, "+ gradient+")";
  return styleVal;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.mountStyle = this.mountStyle.bind(this);
    this.flipCard = this.flipCard.bind(this);
    this.discard = this.discard.bind(this);
    this.state = {
      style: {
        opacity: 0
      },
      gameDecks: gameDecks,
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

  discard() {
    this.setState({
      flipped: false
    });
  }

  render() {
    let cardView;
    if (this.state.flipped) {
      cardView = <CardView promptGroup={this.state.promptGroup} pos={this.state.cardPos} discard={this.discard} />;
    }

    return (
      <main className={this.state.flipped ? "App modal" : "App"} style={this.state.style}>
        <Decks flipCard={this.flipCard} gameDecks={this.state.gameDecks} />
        {cardView}
      </main>
    );
  }
}

export default App;
