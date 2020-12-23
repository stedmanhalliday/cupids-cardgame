import React from "react";
import Deck from "./Deck.js";
import { Card } from "./Card.js";

class Decks extends React.Component {

    render() {
        const decks = this.props.gameDecks.map(deck => {    //iterate through each deck in game decks
            // const cards = deck.prompts.map((card, n, hand) => {     //iterate through each card in each deck 
            //     n = hand.length - (n+1);    //reverse card iteration for stacking order
            //     const y = .25*n + "em";     //dY
            //     const a = Math.pow(.6667, n);   //alpha
            //     const k = "scale(" + Math.pow(.9975, n) + ")";      //scale
            //     const style = { top: y, opacity: a, transform: k };     //style prop
            //     return(
            //         <Card key={card} style={style} flipCard={this.flipCard} promptGroup={deck.promptGroup} />
            //     );
            // });
            return(
                <Deck key={deck.promptGroup} flipCard={this.props.flipCard} gameDecks={this.props.gameDecks} promptGroup={deck.promptGroup} />
            );
        });

        return (
            <section className="Decks flex overflow-scroll w-full h-full items-center space-x-6 transition-all">
                {decks}
            </section>
        );
    }
}

export default Decks;