import React from 'react';
import Deck from './Deck.js'

class Decks extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <section className="Decks flex overflow-scroll w-full h-full items-center space-x-6 transition-all">
                <Deck flipCard={this.props.flipCard} deckName="Pleasure to meet you" />
                <Deck flipCard={this.props.flipCard} deckName="'Tis the season" />
                <Deck flipCard={this.props.flipCard} deckName="Art, music &amp; creativity" />
                <Deck flipCard={this.props.flipCard} deckName="Looking back" />
                <Deck flipCard={this.props.flipCard} deckName="Moving forward" />
            </section>
        );
    }
}

export default Decks;