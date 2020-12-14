import React from 'react';

class Card extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="Card flex border-box p-4 bg-white rounded-lg shadow-lg font-serif font-medium text-2xl text-center items-center text-red-400">
                <p>Lorem ipsum dolor sit amet</p>
            </div>
        );
    }
}

export default Card;