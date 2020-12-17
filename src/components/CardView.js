import React from 'react';
import { FlipCard } from './Card.js';

class CardView extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <div className="overlay">
                <FlipCard promptGroup="Match group" prompt="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut arcu at velit rutrum sagittis vel nec leo. Maecenas leo?" />
            </div>
        );
    }
}

export default CardView;