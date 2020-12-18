import React from 'react';
import { Card } from './Card.js';

class Deck extends React.Component {
    constructor(props){
        super(props);
        this.flipCard = this.flipCard.bind(this);
        this.DeckRef = React.createRef();
    }

    flipCard() {
        const x = this.DeckRef.current.getBoundingClientRect().left;
        const y = this.DeckRef.current.getBoundingClientRect().top;
        const promptGroup = this.props.promptGroup;
        this.props.flipCard(x, y, promptGroup);
    }

    render() {
        return (
            <div ref={this.DeckRef} className="Deck relative flex-none">
                <Card flipCard={this.flipCard} promptGroup={this.props.promptGroup} />
            </div>
        );
    }
}

export default Deck;