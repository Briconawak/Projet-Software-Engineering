import "./TextField.css";

export default function TextField({ value, onChange, onKeyDown, placeholder, minLength, maxLength, autofocus }) {
    return (
        <div class="prompt-textfield">
            <input class="prompt-input-content" type="text" value={value} onKeyDown={onKeyDown} onChange={onChange} placeholder={placeholder} minLength={minLength} maxLength={maxLength} autoFocus={autofocus} />
        </div>
    )
}