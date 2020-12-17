import React from 'react';
import { hyphenate } from "hyphen/en";

class Card extends React.Component {
    constructor(props){
        super(props);
        this.cardRef = React.createRef();
        this.flipCard = this.flipCard.bind(this);
        this.state = {
            prompt: "",
            flipped: false
        };
    }

    componentDidMount() {
        hyphenate(this.props.prompt).then(result => {
            this.setState({
                prompt: result
            });
        });
    }

    flipCard() {
        const x = this.cardRef.current.getBoundingClientRect().left;
        const y = this.cardRef.current.getBoundingClientRect().top;
        console.log(x, y);
        this.props.flipCard();
        this.setState({
            flipped: !this.state.flipped
        });
    }

    render() {
        return (
            <div ref={this.cardRef} className={this.state.flipped ? "Card flipped" : "Card"} onClick={this.flipCard}>
                <div className="faces relative h-full transition-all duration-500">
                    <div className="front bg-pink-50 px-6 pb-32 justify-center font-serif text-center text-red-400 uppercase tracking-widest">
                        <h2 className="prompt-group  flex items-center h-24 p-4 border-4 border-double border-red-200 rounded-sm">{this.props.promptGroup}</h2>
                    </div>
                    <div className="back justify-between bg-white px-4 py-6 font-serif text-red-400">
                        <div className="divide-y divide-red-200">
                            <h2 className="prompt-group pb-4 uppercase text-center">{this.props.promptGroup}</h2>
                            <p className="prompt pt-3 text-xl">{this.state.prompt}</p>
                        </div>
                        <div className="self-center w-4 h-4 rounded-full border border-red-300 bg-red-100"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;