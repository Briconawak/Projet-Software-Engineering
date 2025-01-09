import './Message.css';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

function toRelativeDate(now, date) {
    const diff = now - date;

    if(diff < MINUTE) {
        return 'Just now';
    }

    if(diff < HOUR) {
        return `${Math.floor(diff / MINUTE)}m ago`;
    }

    if(diff < DAY) {
        return `${Math.floor(diff / HOUR)}h ago`;
    }

    return date.toLocaleDateString();
}

export default function Message({username, body, date, now}) {
    return (<div className="chat-message-item">
        <div className='chat-message-item-header'>
            <div className="chat-message-item-username">
                {username}
            </div>

            <div className="chat-message-item-timestamp">
                {toRelativeDate(now, date)}
            </div>
        </div>
        
        <div className="chat-message-item-content">
            <div className="chat-message-item-content-text">
                {body}
            </div>
        </div>
    </div>)
}