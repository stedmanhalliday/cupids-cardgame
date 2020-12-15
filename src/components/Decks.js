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
                <Deck deckName="Pleasure to meet you" />
                <Deck deckName="'Tis the season" />
                <Deck deckName="Art, music &amp; creativity" />
                <Deck deckName="Looking back" />
                <Deck deckName="Moving forward" />
            </section>
        );
    }
}

export default Decks;