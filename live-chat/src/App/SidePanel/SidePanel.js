import React from "react";
import "./SidePanel.css";
import Item from "./Item/Item";
import Icon from "../../components/Icon/Icon";


export default class SidePanel extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick = (channel) => {
      this.props.onChangeChannel(channel.path);
    }

    newChannel = () => {
        this.props.onNewChannel();
    }


    render() {
        return (
          <div className="side-panel-container">
            <div className="side-panel">
                <div class="side-panel-header">
                </div>
                <div class="side-panel-list">
                  {
                    this.props.list.map(c => <Item title={key} onClick={() => this.onClick(this.props.list[key])} /> )
                  }
                </div>


                <Item isAdd={true} title="Join Channel" onClick={this.newChannel}/>
            </div>
          </div>
        );
    }
}