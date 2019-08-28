import React, { Component } from "react";
import "../app.css";

import FirebaseUserInput from "./FirebaseUserInput";

const INITIAL_STATE = {
  inputs: [
    { id: 1, firebasecode: "1111", name: "Первый", value: 1 },
    { id: 2, firebasecode: "1112", name: "Второй", value: 1 },
    { id: 3, firebasecode: "1113", name: "Третий", value: 1 }
  ]
};

class TableLayout extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE, selected: null, value: " " };
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(id,value) {
    this.setState(state => ({
      selected: id,
      value: value
    }));
  }

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.props.handleSeriesDataChange(
        this.state.selected,
        this.state.value
      );
      this.setState({selected: 100});
      console.log("enter press here! ");
    }
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const { inputs, selected } = this.state;
    const categories = this.props.xaxis.categories;
    const dataline = this.props.seriesLine.data
      ? this.props.seriesLine.data
      : [1, 2, 3, 4];
    return (
      <div>
         {dataline.map((item, index) => (
          <div
            key={index}
            className="HorizontalFlexSpaceBetween"
            style={{ padding: "10px" }}
          >
            <div style={{ marginRight: "2rem" }}>{categories[index]}</div>
            {index === selected ? (
              <input
                type="text"
                value={this.state.value}
                onKeyPress={this.handleKeyPress}
                onChange={this.handleChange}
                style={{maxWidth: '5rem'}}
              />
            ) : (
              <div onClick={() => this.handleClick(index, item)}>{item}</div>
            )}
          </div>
        ))}
        {/* {inputs.length > 1 &&
          inputs.map((item, index) => (
            <div key={item.firebasecode}>
              {item.id === selected ? (
                <FirebaseUserInput
                  name={item.name}
                  firebasecode={item.firebasecode}
                  useruid={this.props.useruid}
                  handleClick={this.handleClick}
                />
              ) : (
                <p onClick={() => this.handleClick(item.id)}>{item.value}</p>
              )}
            </div>
          ))} */}
      </div>
    );
  }
}

export default TableLayout;
