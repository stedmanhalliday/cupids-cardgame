import React from "react";
import gradients from "../data/gradients.json";
import promptData from "../data/prompts.json";
import Decks from "./Decks.js";
import CardView from "./CardView";

let stackDecks = (promptData) => {  //initialize game decks from prompt data
    let gameDecks = [];
    for (let n=0; n<5 && promptData.length; n++) {   //max 5 decks per game
        const i = Math.floor(Math.random()*promptData.length);   //random deck index
        const deck = promptData.splice(i, 1);    //pull random deck
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

let gameDecks = stackDecks(promptData);   //initialize game decks from prompt data

function getGradient() {
  // select random gradient from data and build style string
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
      promptGroup: "",
      prompt: ""
    };
  }

  mountStyle() {    //entrance anim style
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
    setTimeout(this.mountStyle, 10);    //animate entrance
  }

  flipCard(x, y, promptGroup) {
    let newPrompt = "";
    const newDecks = this.state.gameDecks.map(deck => {   //iterate through each deck in game decks
      const newPrompts = deck.prompts.filter((prompt, n) => {   //iterate through each prompt in each game deck
        if(deck.promptGroup === promptGroup && n === 0) {    //remove the top card from the chosen deck
          newPrompt = prompt[0];
          return false;
        }
        return true;   //leave all other cards intact
      });
      return (    //update game decks
        {
          promptGroup: deck.promptGroup,
          prompts: newPrompts
        }
      );
    });
    console.log(newPrompt);
    this.setState({
        flipped: true,
        cardPos: [x, y],
        promptGroup: promptGroup,
        prompt: newPrompt,
        gameDecks: newDecks
    });
  }

  discard() {   //dismiss flipped card
    this.setState({
      flipped: false
    });
  }

  render() {
    let cardView;
    if (this.state.flipped) {
      cardView = <CardView promptGroup={this.state.promptGroup} prompt={this.state.prompt} pos={this.state.cardPos} discard={this.discard} />;
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
