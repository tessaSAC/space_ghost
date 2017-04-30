import React from 'react';

const style = {
  color: 'white',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  textAlign: 'right'
};

export default (props) => (
  <li className="collection-item" style={style}>
    <span className="title"><strong>{ props.message.senderName }</strong></span>
    <p>{ props.message.message }</p>
  </li>
);

