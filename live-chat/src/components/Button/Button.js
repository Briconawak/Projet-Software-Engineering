import "./Button.css";

export default function Button({ children, onClick, disabled, fill = false }) {
    return (
        <button class={`button ${fill ? 'fill' : ''}`} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    )
}