// import React, { useState, useEffect} from 'react';

// function ProgressProvider(props){
//   const [interval ,setInterval] = useState(1000);
// 	const [valuesIndex, setValuesIndex] = useState(0);

// 	useEffect(()=>{
// 		setInterval(() => {
//       setValueIndex(valuesIndex +1)% props.values.length
//     });
// 	},props.interval)
// 	return (props.values[setValuesIndex])
// }	
// export default ProgressProvider;

import React from "react";

class ProgressProvider extends React.Component {
  static defaultProps = {
    interval: 1000
  };

  state = {
    valuesIndex: 0
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({
        valuesIndex: (this.state.valuesIndex + 1) % this.props.values.length
      });
    }, this.props.interval);
  }

  render() {
    return this.props.children(this.props.values[this.state.valuesIndex]);
  }
}

export default ProgressProvider;
