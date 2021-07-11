import React from 'react';
import "./Bar.css"

function Bar({ length, colorKey }) {
    const COLOR_SET = ["black", "red", "green"];
    let color = COLOR_SET[colorKey];
    let style = {
      height: length,
      backgroundColor: color,
    }
    return (
      <div className="bar" style={style} >{length}</div>
    )
  }
  
  export default Bar;