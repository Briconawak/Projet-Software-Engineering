import React, { useState } from 'react';
import Icon from '../../components/Icon/Icon';

import './Prompt.css';

import Button from '../../components/Button/Button';
import TextField from '../../components/TextField/TextField';

export default function Prompt({ title, content, onSubmit, onCancel }) {

    var [value, setValue] = useState('');

    const onChange = (e) => {
        setValue(e.target.value);
        if (value.length > 30) {
            return;
        }
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (value.length < 1 || value.length > 36) {
                return;
            }
            onSubmit(value);
        }
    }

    return (
        <div class="prompt-container">
            <div class="prompt">
                <div class="prompt-content">
                    <h2 class="prompt-title">{title}</h2>
                    <TextField value={value} onChange={onChange} onKeyDown={onKeyDown} placeholder={content} minLength={1} maxLength={36} autofocus/>


                    <div class="prompt-footer">
                        <Button fill onClick={() => onSubmit(value)} color="green">Submit</Button>
                        <Button onClick={() => onCancel()} color="red">Cancel</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}