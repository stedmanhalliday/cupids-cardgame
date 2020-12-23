import React from "react";
import { FlipCard } from "./Card.js";

class CardView extends React.Component {
    constructor(props) {
        super(props);
        this.mountStyle = this.mountStyle.bind(this);
        this.discard = this.discard.bind(this);
        this.discardRef = React.createRef();
        this.state = {
            style: {
                opacity: 0
            },
            discarded: false
        };
    }

    mountStyle() {
        this.setState({
            style: {
                transitionDelay: ".5s",
                transitionDuration: ".5s"
            }
        });
    }

    componentDidMount() {
        setTimeout(this.mountStyle, 10);
        this.discardRef.current.ontransitionend = (e) => {
            this.setState({
                style: {}
            });
        };
    }

    discard() {
        this.setState({
            style: {
                transitionDuration: ".5s",
                opacity: 0
            },
            discarded: true
        });
        this.discardRef.current.ontransitionend = (e) => { //replace with longer card transition
            this.props.discard();
        }
    }

    render() {
        return(
            <div className="overlay">
                <div ref={this.discardRef} onClick={this.discard} style={this.state.style} className="discard fixed h-16 w-16 top-1/2 transform translate-x-2/4 -translate-y-2/4 transition-opacity opacity-75 duration-300 cursor-pointer">
                    <span className="flex items-center justify-center w-full h-full rounded-full bg-white shadow-2xl text-red-400 font-sans font-extralight text-4xl">&rarr;</span>
                </div>
                <FlipCard pos={this.props.pos} discarded={this.state.discarded} promptGroup={this.props.promptGroup} prompt="If your life were a movie, what musician or band would create the soundtrack?" />
            </div>
        );
    }
}

export default CardView;