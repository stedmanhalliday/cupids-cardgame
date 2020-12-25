import React from "react";
import Deck from "./Deck.js";

class Decks extends React.Component {
    constructor(props) {
        super(props);
        this.mountStyle = this.mountStyle.bind(this);
        this.state = {
            style: {
                opacity: 0,
                transform: "translateY(2rem)"
            } 
        };
    }

    mountStyle() {
        this.setState({ style: {} });
    }

    componentDidMount() {
        setTimeout(this.mountStyle, 10);
    }

    render() {
        const decks = this.props.gameDecks.map(deck =>    //iterate through game decks
            <Deck key={deck.promptGroup} length={deck.prompts.length} flipCard={this.props.flipCard} gameDecks={this.props.gameDecks} promptGroup={deck.promptGroup} clearDeck={this.props.clearDeck} />
        );

        return (
            <section style={this.state.style} className="Decks flex overflow-scroll w-full h-full items-center space-x-6 transition-all duration-500">
                {decks}
            </section>
        );
    }
}

export default Decks;