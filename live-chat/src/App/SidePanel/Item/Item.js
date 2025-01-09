import Icon from '../../../components/Icon/Icon';
import './Item.css';

export default function Item({title, onClick, isAdd}) {
    return (
      <div className={"chat-channel-item-list "  + ((!isAdd) ? "regular" : "")} onClick={onClick}>
        {isAdd && 
          <span class="chat-channel-item-list-icon">
            <Icon name="add_circle_outline"/>
          </span>
        }
        <span className="chat-channel-item-list-title">{title}</span>
      </div>
    );
}