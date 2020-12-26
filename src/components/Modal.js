import React from "react";

const unmountStyle = {
    opacity: 0,
    transform: "translateY(-2rem)"
};

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.mountStyle = this.mountStyle.bind(this);
        this.ModalRef = React.createRef();
        this.state = { style: unmountStyle };
    }

    mountStyle() {  //entrance anim for modal
        this.setState({ style: { transitionDelay: ".5s" } });
    }

    componentDidMount() {   //animate entrance
        setTimeout(this.mountStyle);
    }

    componentDidUpdate(prevProps) {
        if ((prevProps.mounted !== this.props.mounted) && !this.props.mounted) {
            this.setState({ style: unmountStyle },  //animate exit
                () => {
                    this.ModalRef.current.ontransitionend = (e) => {
                        if(e.propertyName === "opacity")
                            setTimeout(this.props.dismiss, 1000);   //call parent dismiss function
                    }
                }
            );
        }
    }

    render() {
        return (
            <div className="overlay">
                <div ref={this.ModalRef} style={this.state.style} className="Modal fixed w-1/2 p-12 rounded-lg shadow-2xl bg-white text-center transition-all duration-500">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Modal;