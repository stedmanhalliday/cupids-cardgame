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
                <Card flipCard={this.props.flipCard} promptGroup={this.props.deckName} prompt="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut arcu at velit rutrum sagittis vel nec leo. Maecenas leo?" />
            </div>
        );
    }
}

export default Deck;