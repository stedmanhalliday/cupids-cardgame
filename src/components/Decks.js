import React from "react";
import Deck from "./Deck.js";

class Decks extends React.Component {

    render() {
        const decks = this.props.gameDecks.map(deck => {
            return(
                <Deck key={deck.promptGroup} flipCard={this.props.flipCard} promptGroup={deck.promptGroup} />
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