import React from "react";
import { hyphenate } from "hyphen/en";

class Card extends React.Component {
    render() {
        return (
            <div className={this.props.flipped ? "Card flipped" : "Card"} style={this.props.style} onClick={this.props.flipCard}>
                <div className="faces relative h-full transition-all transform-gpu duration-500">
                    <div className="front bg-pink-50 px-6 pb-32 justify-center font-serif text-center text-red-400 uppercase tracking-widest">
                        <h2 className="prompt-group flex items-center h-24 p-4 border-4 border-double border-red-200 rounded-sm">{this.props.promptGroup}</h2>
                    </div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

class FlipCard extends React.Component {
    constructor(props){
        super(props);
        this.flipCard = this.flipCard.bind(this);
        let pos = this.props.pos;
        this.state = {
            prompt: "",
            flipped: false,
            style: {
                left: pos[0],
                top: pos[1]
            }
        };
    }

    componentDidMount() {
        hyphenate(this.props.prompt).then(result => {   //hyphenate prompt on backface
            this.setState({
                prompt: result
            });
        });
        setTimeout(this.flipCard, 10);  //flip card
    }

    flipCard() {
        this.setState({
            flipped: true,
            style: {
                top: "50%",
                left: "50%"
            }
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.discarded !== prevProps.discarded) {
            this.setState({
                style: {
                    transitionDuration: ".5s",
                    transitionTimingFunction: "ease-out",
                    top: "50%",
                    left: "100%",
                    opacity: 0,
                    transform: "scale(1.5) rotate(30deg)"
                }
            });
        }
    }

    render() {
        return(
            <Card flipCard={()=>{}} discarded={this.props.discarded} promptGroup={this.props.promptGroup} flipped={this.state.flipped} style={this.state.style} >
                <div className="back justify-between bg-white px-4 py-6 font-serif text-red-400">
                    <div className="divide-y divide-red-200">
                        <h2 className="prompt-group pb-4 uppercase text-center">{this.props.promptGroup}</h2>
                        <p className="prompt pt-3 text-xl">{this.state.prompt}</p>
                    </div>
                    <div className="self-center w-4 h-4 rounded-full border border-red-300 bg-red-100"></div>
                </div>
            </Card>
        );
    }
}

export { Card, FlipCard };