import React from 'react';
import { FlipCard } from './Card.js';

class CardView extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <div className="overlay">
                <FlipCard pos={this.props.pos} promptGroup={this.props.promptGroup} prompt="If your life were a movie, what musician or band would create the soundtrack?" />
            </div>
        );
    }
}

export default CardView;