import React from "react";
import { Card } from "./Card.js";

class Deck extends React.Component {
    constructor(props) {
        super(props);
        this.flipCard = this.flipCard.bind(this);
        this.DeckRef = React.createRef();
    }

    flipCard(e) {
        // check if click, enter, or space
        if (!(e.type === "click" || e.key === "Enter" || e.key === " "))
            return;
        else {
            e.preventDefault();
            this.DeckRef.current.blur();    //remove focus from deck
        }
        //animate deck lift
        const topCard = this.DeckRef.current.querySelector(".Card:last-of-type:not(:first-of-type)");
        if (topCard) {
            const cards = this.DeckRef.current.querySelectorAll(".Card");
            cards.forEach((card, n, hand) => {
                n = hand.length - (n + 2);    //reverse card iteration for stacking order
                let y = .25 * n + "rem";     //dY
                let a = Math.pow(.6667, n);   //alpha
                let k = "scale(" + Math.pow(.9975, n) + ")";      //scale
                if (card === topCard) {
                    y = 0;
                    a = 0;
                    k = "none";
                }
                const style = "top: " + y + "; opacity: " + a + "; transform: " + k;     //style string
                card.setAttribute("style", style);
            });
        }
        //pass args to parent flipCard
        const x = this.DeckRef.current.getBoundingClientRect().left;
        const y = this.DeckRef.current.getBoundingClientRect().top;
        this.props.flipCard(x, y, this.props.promptGroup, topCard);
    }

    componentDidUpdate(prevProps) {
        if ((prevProps.length !== this.props.length) && !this.props.length) {    //if deck is empty
            this.DeckRef.current.classList.add("collapse");  //collapse width
            this.DeckRef.current.ontransitionend = (e) => {
                if (e.propertyName === "width")
                    this.props.clearDeck(this.props.promptGroup);   //remove node after animation
            }
        }
    }

    render() {
        let deck = this.props.gameDecks.filter(deck =>
            deck.promptGroup === this.props.promptGroup  //get correct deck
        );
        deck = deck[0];     //first obj el 
        const cards = deck.prompts.map((card, n, hand) => {     //iterate through each card in each deck 
            n = hand.length - (n + 1);    //reverse card iteration for stacking order
            const y = .25 * n + "rem";     //dY
            const a = Math.pow(.6667, n);   //alpha
            const k = "scale(" + Math.pow(.9975, n) + ")";      //scale
            const style = { top: y, opacity: a, transform: k };     //style prop
            return (
                <Card key={card} style={style} flipCard={this.flipCard} promptGroup={deck.promptGroup} />
            );
        });
        return (
            <div ref={this.DeckRef} aria-label={"Card deck: " + this.props.promptGroup} tabIndex={this.props.modal ? -1 : 0} onClick={this.flipCard} onKeyDown={this.flipCard} className="Deck relative flex-none focus:outline-none transition-all duration-500">
                {cards}
            </div>
        );
    }
}

export default Deck;