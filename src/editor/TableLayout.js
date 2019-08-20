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

    this.state = { ...INITIAL_STATE, selected: null };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    this.setState(state => ({
      selected: id
    }));
  }

  render() {
    const { inputs, selected } = this.state;
    //  const { series } = this.props.series;
    console.log(this.props.series[0].data);
    console.log(this.props.xaxis.categories);
    const categories = this.props.xaxis.categories;
    const dataline = this.props.series[0].data
      ? this.props.series[0].data
      : [1, 2, 3, 4];
    return (
      <div>
        Edit Data Line
        <h3>{this.props.series[0].name}</h3>
        {dataline.map((item, index) => (
          <div key={index} className="HorizontalFlexSpaceBetween" style={{padding: '10px'}}>
            <div style={{ marginRight: "2rem" }}>{categories[index]}</div>
            <div onClick={() => this.handleClick(index)}>{item}</div>
          </div>
        ))}
        {inputs.length > 1 &&
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
          ))}
      </div>
    );
  }
}

export default TableLayout;
