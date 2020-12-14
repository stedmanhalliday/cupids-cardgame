import React from 'react';

class Card extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="Card flex border-box p-4 bg-white rounded-lg shadow-lg font-serif font-medium text-xl text-center items-center text-red-400">
                <p>Art, music, and creativity</p>
            </div>
        );
    }
}

export default Card;