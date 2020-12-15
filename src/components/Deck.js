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
                <Card promptGroup={this.props.deckName} prompt="Do you have a favorite artist (includes musicians)?" />
            </div>
        );
    }
}

export default Deck;