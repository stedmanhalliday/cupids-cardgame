import React from 'react';
import Deck from './Deck.js'

class Decks extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <section className="Decks flex overflow-scroll w-full h-full items-center space-x-6 transition-all">
                <Deck flipCard={this.props.flipCard} promptGroup="Pleasure to meet you" />
                <Deck flipCard={this.props.flipCard} promptGroup="'Tis the season" />
                <Deck flipCard={this.props.flipCard} promptGroup="Art, music &amp; creativity" />
                <Deck flipCard={this.props.flipCard} promptGroup="Looking back" />
                <Deck flipCard={this.props.flipCard} promptGroup="Moving forward" />
            </section>
        );
    }
}

export default Decks;