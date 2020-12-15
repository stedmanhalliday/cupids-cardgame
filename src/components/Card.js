import React from 'react';
import { hyphenate } from "hyphen/en";

class Card extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            flipped: false,
            prompt: ""
        };
    }

    componentDidMount() {
        hyphenate(this.props.prompt).then(result => {
            this.setState({
                prompt: result
            });
        });
    }

    handleClick() {
        this.setState({
            flipped: !this.state.flipped
        });
        console.log(hyphenate(this.props.prompt).result);
    }

    render() {
        return (
            <div className={this.state.flipped ? "Card flipped" : "Card"} onClick={this.handleClick}>
                <div className="faces relative h-full transition-all duration-500">
                    <div className="front bg-pink-50 px-6 pb-8 justify-center font-serif text-center text-red-400 uppercase tracking-widest">
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