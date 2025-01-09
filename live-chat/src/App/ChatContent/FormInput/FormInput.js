import React from 'react';

import './FormInput.css';
import Icon from '../../../components/Icon/Icon';

export default class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
    }

    onKeyDown = (event) => {
        if(event.key === 'Enter') {
            this.onSubmit();
        }
    }
    
    onChange = (event) => {
        this.setState({
            message: event.target.value
        });
    }

    onSubmit = () => {
        if(this.state.message.trim() !== '') {
            this.props.onSubmit(this.state.message);
        }

        this.setState({
            message: ''
        });
    }

    render() {
        return (
          <div className="chat-form-input-container">
            <input type="text" className="chat-form-input" placeholder={"Saisir le message..."} value={this.state.message} onChange={this.onChange} onKeyDown={this.onKeyDown}/>
            <button className="chat-form-submit-btn" onClick={this.onSubmit}>
                <Icon name={"arrow_upward"} />
            </button>
          </div>
        );
    }
}