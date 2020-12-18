import React from 'react';
import { FlipCard } from './Card.js';

class CardView extends React.Component {
    constructor(props) {
        super(props);
        this.mountStyle = this.mountStyle.bind(this);
        this.discard = this.discard.bind(this);
        this.nextRef = React.createRef();
        this.state = {
            style: {
                opacity: 0
            }
        };
    }

    mountStyle() {
        this.setState({
            style: {
                transitionDelay: '500ms',
                transitionDuration: '500ms'
            }
        });
    }

    componentDidMount() {
        setTimeout(this.mountStyle, 10);
        this.nextRef.current.ontransitionend = (e) => {
            this.setState({
                style: {}
            });
        };
    }

    discard() {
        //do stuff
        //transition end
        this.props.discard();
    }

    render() {
        return(
            <div className="overlay">
                <FlipCard pos={this.props.pos} promptGroup={this.props.promptGroup} prompt="If your life were a movie, what musician or band would create the soundtrack?" />
                <div ref={this.nextRef} onClick={this.discard} style={this.state.style} className="next fixed flex h-16 w-16 items-center justify-center top-1/2 transform translate-x-2/4 -translate-y-2/4 bg-white text-4xl text-red-400 font-sans font-extralight rounded-full shadow-2xl transition-opacity opacity-75 duration-300 cursor-pointer">&rarr;</div>
            </div>
        );
    }
}

export default CardView;