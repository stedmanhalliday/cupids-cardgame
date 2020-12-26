import React from "react";
import gradients from "../data/gradients.json";
import promptData from "../data/prompts.json";
import { getGradient, stackDecks } from "../scripts/init.js";
import Intro from "./Intro";
import Decks from "./Decks.js";
import CardView from "./CardView";
import GameOver from "./GameOver";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.AppRef = React.createRef();
        this.mountStyle = this.mountStyle.bind(this);
        this.startGame = this.startGame.bind(this);
        this.flipCard = this.flipCard.bind(this);
        this.discard = this.discard.bind(this);
        this.clearDeck = this.clearDeck.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.state = {
            style: { opacity: 0 },
            pregame: true,
            gameDecks: stackDecks(promptData),
            modal: true,
            flipped: false,
            gameOver: false,
            cardPos: [0, 0],
            promptGroup: "",
            prompt: ""
        };
    }

    mountStyle() {    //entrance anim style
        this.setState({ style: { backgroundImage: getGradient(gradients) } });
    }

    componentDidMount() {
        setTimeout(this.mountStyle);    //animate entrance
    }

    startGame() {
        this.setState({
            pregame: false,
            modal: false
        });
    }

    flipCard(x, y, promptGroup, topCard) {
        let newPrompt = "";
        const newDecks = this.state.gameDecks.map(deck => {   //iterate through each deck in game decks
            const newPrompts = deck.prompts.filter((prompt, n, hand) => {   //iterate through each prompt in each game deck
                if (deck.promptGroup === promptGroup && n === hand.length - 1) {    //remove the top card from the chosen deck
                    newPrompt = prompt;
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
        }, () => {
            if (topCard) {
                topCard.ontransitionend = (e) => {
                    if (e.propertyName === "opacity")
                        this.setState({ gameDecks: newDecks });   //update decks after lift
                }
            }
            else this.setState({ gameDecks: newDecks });  //update decks w/o lift
            this.clearDeck(); //test gameOver
        });
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
    }

    componentDidUpdate(prevProps, prevState) {
        //shuffle decks and end game after last card flip
        if (prevState.flipped !== this.state.flipped) {
            if (!this.state.gameDecks.length && !this.state.flipped) {
                this.setState({
                    modal: true,
                    gameOver: true,
                    gameDecks: stackDecks(promptData)
                });
            }
        }
    }

    resetGame() {
        const bg = this.AppRef.current.style.backgroundImage;   //get current gradient
        this.setState({     //fade out
            modal: false,
            style: { 
                backgroundImage: bg,
                opacity: 0
             }
        }, () => {
            setTimeout(() => {
                this.mountStyle();      //render new gradient
                this.setState({ gameOver: false });     //render shuffled decks
            }, 1000);
        });
    }

    render() {
        return (
            <main ref={this.AppRef} className={this.state.modal ? "App modal" : "App"} style={this.state.style}>
                {this.state.pregame && <Intro startGame={this.startGame} />}
                {!(this.state.gameOver || this.state.pregame) && <Decks flipCard={this.flipCard} gameDecks={this.state.gameDecks} clearDeck={this.clearDeck} />}
                {this.state.flipped && <CardView promptGroup={this.state.promptGroup} prompt={this.state.prompt} pos={this.state.cardPos} discard={this.discard} />}
                {this.state.gameOver && <GameOver resetGame={this.resetGame} />}
            </main>
        );
    }
}

export default App;
