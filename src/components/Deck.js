import React from 'react';
import { Card } from './Card.js';

class Deck extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="Deck relative flex-none">
                <Card flipCard={this.props.flipCard} promptGroup={this.props.promptGroup} />
            </div>
        );
    }
}

export default Deck;