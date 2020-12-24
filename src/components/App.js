import React from "react";
import gradients from "../data/gradients.json";
import promptData from "../data/prompts.json";
import { getGradient, stackDecks } from "../scripts/init.js";
import Decks from "./Decks.js";
import CardView from "./CardView";
import GameOver from "./GameOver";

let gradient = getGradient(gradients);    //get background gradient
let gameDecks = stackDecks(promptData);   //initialize game decks from prompt data

class App extends React.Component {
    constructor(props) {
        super(props);
        this.mountStyle = this.mountStyle.bind(this);
        this.flipCard = this.flipCard.bind(this);
        this.discard = this.discard.bind(this);
        this.clearDeck = this.clearDeck.bind(this);
        this.state = {
            style: {
                opacity: 0
            },
            gameDecks: gameDecks,
            modal: false,
            flipped: false,
            gameOver: false,
            cardPos: [0, 0],
            promptGroup: "",
            prompt: ""
        };
    }

    mountStyle() {    //entrance anim style
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

    flipCard(x, y, promptGroup, bottomCard) {
        let newPrompt = "";
        const newDecks = this.state.gameDecks.map(deck => {   //iterate through each deck in game decks
            const newPrompts = deck.prompts.filter((prompt, n) => {   //iterate through each prompt in each game deck
                if (deck.promptGroup === promptGroup && n === 0) {    //remove the top card from the chosen deck
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
        this.setState({
            modal: true,
            flipped: true,
            cardPos: [x, y],
            promptGroup: promptGroup,
            prompt: newPrompt
        });
        if (bottomCard) {
            bottomCard.ontransitionend = (e) =>
                this.setState({ gameDecks: newDecks });   //update decks after bottom card lift
        }
        else this.setState({ gameDecks: newDecks });  //update decks w/o bottom card
    }

    discard() {   //dismiss flipped card
        this.setState({
            modal: false,
            flipped: false
        });
    }

    clearDeck(promptGroup) {
        const newDecks = this.state.gameDecks.filter(deck =>
            false   //test gameOver
            // deck.promptGroup !== promptGroup    
        );
        this.setState({ gameDecks: newDecks });
        if(!this.state.gameDecks.length && !this.state.flipped) {   //end game if no decks left
            console.log("Game over");
            this.setState({
                modal: true,
                gameOver: true
            });
        }
    }

    resetGame() {
        gameDecks = stackDecks(promptData);
        //gradient stuff and reset state
        this.setState({
            gameDecks: gameDecks,
            modal: false,
            gameOver: false
        });
    }

    render() {

        return (
            <main className={this.state.modal ? "App modal" : "App"} style={this.state.style}>
                <Decks flipCard={this.flipCard} gameDecks={this.state.gameDecks} clearDeck={this.clearDeck} />
                {this.state.flipped && <CardView promptGroup={this.state.promptGroup} prompt={this.state.prompt} pos={this.state.cardPos} discard={this.discard} />}
                {this.state.gameOver && <GameOver resetGame={this.resetGame} />}
            </main>
        );
    }
}

export default App;
