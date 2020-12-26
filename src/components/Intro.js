import React from "react";
import Modal from "./Modal";

class Intro extends React.Component {
    constructor(props) {
        super(props);
        this.dismiss = this.dismiss.bind(this);
        this.state = { mounted: true };
    }

    dismiss() {
        this.setState({ mounted: false });
    }

    render() {
        return (
            <Modal mounted={this.state.mounted} dismiss={this.props.startGame}>
                <h1 className="font-serif text-5xl text-red-400">Welcome to vDate!</h1>
                <div className="mt-6 mb-4 font-serif text-xl tracking-wide text-red-400">
                    <p>vDate is a card game you can play on virtual dates to break the ice. Pick a card from any deck to reveal a prompt that can help you and your partner get to know each other. Hit the next button to skip a prompt or to pick another card when you're finished.</p>
                    <p className="mt-6 text-2xl">Good luck and have fun!</p>
                </div>
                <button aria-label={"Start game"} onClick={this.dismiss} className="pl-4 pr-3 py-2 bg-pink-50 border-2 border-red-200 rounded-md uppercase text-sm tracking-wider text-red-400 font-medium transition-all duration-300 hover:text-white hover:bg-red-500 hover:border-red-500 focus:text-white focus:outline-none focus:bg-red-500 focus:border-red-500">
                    Start game <span className="font-normal">&rarr;</span>
                </button>
            </Modal>
        );
    }
}

export default Intro;