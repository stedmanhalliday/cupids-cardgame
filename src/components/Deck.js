import React from 'react';
import Card from './Card.js';

class Deck extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="Deck relative flex-none">
                <Card frontText={this.props.deckName} backText="If your life were a movie, what musician or band would create the soundtrack?" />
            </div>
        );
    }
}

export default Deck;