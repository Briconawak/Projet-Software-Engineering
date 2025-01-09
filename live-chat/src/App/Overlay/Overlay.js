import React, { useState } from 'react';

import Icon from '../../components/Icon/Icon';
import './Overlay.css';

export default function Overlay({ onSubmit }) {

    var [value, setValue] = useState('');

    const onChange = (e) => {
        setValue(e.target.value);
        if (value.length > 30) {
            return;
        }
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            if(value.length < 1 || value.length > 36) {
                return;
            }
            onSubmit(value);
        }
    }

    return(
        <div class="overlay-container">
            <div class="overlay-content">
                <h4 class="overlay-title">Welcome to the chat</h4>
                <div class="overlay-textfield">
                    <input class="overlay-input-content" type="text" onKeyDown={onKeyDown} onChange={onChange} placeholder='Type your name' minLenght={3} maxLength={30}/>
                    <button class="overlay-submit-btn" onClick={() => onSubmit(value)}>
                        <Icon name="arrow_forward" />
                    </button>
                </div>
            </div>
        </div>
    )
}