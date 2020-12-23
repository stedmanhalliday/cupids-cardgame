import React from "react";
import { Card } from "./Card.js";

class Deck extends React.Component {
    constructor(props) {
        super(props);
        this.flipCard = this.flipCard.bind(this);
        this.DeckRef = React.createRef();
    }

    flipCard() {
        const x = this.DeckRef.current.getBoundingClientRect().left;
        const y = this.DeckRef.current.getBoundingClientRect().top;
        this.props.flipCard(x, y, this.props.promptGroup);
    }

    render() {
        let deck = this.props.gameDecks.filter(deck =>
            deck.promptGroup === this.props.promptGroup  //get correct deck
        );
        deck = deck[0];     //first obj el 
        const cards = deck.prompts.map((card, n, hand) => {     //iterate through each card in each deck 
            n = hand.length - (n + 1);    //reverse card iteration for stacking order
            const y = .25 * n + "em";     //dY
            const a = Math.pow(.6667, n);   //alpha
            const k = "scale(" + Math.pow(.9975, n) + ")";      //scale
            const style = { top: y, opacity: a, transform: k };     //style prop
            return (
                <Card key={card} style={style} flipCard={this.flipCard} promptGroup={deck.promptGroup} />
            );
        });
        return (
            <div ref={this.DeckRef} className="Deck relative flex-none">
                {cards}
            </div>
        );
    }
}

export default Deck;