import React from "react";

class GameOver extends React.Component {
    constructor(props) {
        super(props);
        this.resetGame = this.resetGame.bind(this);
    }

    resetGame() {
        //exit animation
        //ontransitionend
        //this.props.resetGame()
    }

    render() {
        return(
            <div className="overlay">
                <div className="fixed w-1/2 p-12 rounded-lg shadow-2xl bg-white text-center">
                    <h2 className="font-serif text-5xl text-red-400">Well done!</h2>
                    <p className="mt-5 mb-8 font-serif text-xl tracking-wide text-red-400">You've made it through all the prompts for this round. Hopefully you and your partner learned some interesting things about each other. Feel free to reshuffle the decks and see if you get new prompts next time!</p>
                    <button onClick={this.resetGame} className="pl-4 pr-3 py-2 bg-pink-50 border-2 border-red-200 rounded-md uppercase text-sm tracking-wider text-red-400 font-medium transition-all duration-300 hover:text-white hover:bg-red-500 hover:border-red-500 focus:text-white focus:outline-none focus:bg-red-500 focus:border-red-500">
                        Play again <span className="relative -top-0.5 font-normal">&#10227;</span>
                    </button>
                </div>
            </div>
        );
    }
}

export default GameOver;