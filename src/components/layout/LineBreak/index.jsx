import React from 'react'
import "./linebreak.scss";

function LineBreak({ borderColor, opacity, borderWidth }) {
  const Style = {
    borderColor: borderColor,
    opacity: opacity,
    borderWidth: borderWidth,
  }

  return (
    <div style={Style} className='linebreak'></div>
  )
}

export default LineBreak;