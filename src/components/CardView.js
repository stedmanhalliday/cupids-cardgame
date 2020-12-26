import React from "react";
import { FlipCard } from "./Card.js";

class CardView extends React.Component {
    constructor(props) {
        super(props);
        this.mountStyle = this.mountStyle.bind(this);
        this.discard = this.discard.bind(this);
        this.discardRef = React.createRef();
        this.state = {
            style: { opacity: 0 },
            discarded: false
        };
    }

    mountStyle() {  //entrance anim for discard btn
        this.setState({ style: { transitionDelay: ".5s" } });
    }

    componentDidMount() {   //animate entrance for discard btn
        setTimeout(this.mountStyle);
    }

    discard() {
        this.setState({
            style: { opacity: 0 },
            discarded: true
        }, () => {
            this.discardRef.current.ontransitionend = (e) => {
                if (e.propertyName === "opacity")
                    this.props.discard();
            }
        });
    }

    render() {
        return (
            <div className="overlay">
                <button ref={this.discardRef} onClick={this.discard} style={this.state.style} className="discard fixed h-16 w-16 rounded-full transform translate-x-1/2 transition-opacity duration-500 focus:outline-none">
                    <span className="flex items-center justify-center w-full h-full rounded-full shadow-2xl text-white border-2 border-white font-sans font-extralight text-4xl transition-all duration-300">&rarr;</span>
                </button>
                <FlipCard pos={this.props.pos} discarded={this.state.discarded} promptGroup={this.props.promptGroup} prompt={this.props.prompt} />
            </div>
        );
    }
}

export default CardView;