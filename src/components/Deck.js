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
        let cards = [];
        for(let n=(3-1); n>=0; n--) { //revise to reverse-traverse prompt array
            const y = .5*n + "em";
            const style = {top: y};
            cards.push(<Card key={n} style={style} flipCard={this.flipCard} promptGroup={this.props.promptGroup} />);
        }
        return (
            <div ref={this.DeckRef} className="Deck relative flex-none">
                {cards}
            </div>
        );
    }
}

export default Deck;