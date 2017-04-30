import React from 'react';

const style = {
  backgroundColor: '#ffca28'
};

export default (props) => (
  <li className="collection-item avatar" style={style}>
    <img src="assets/gus.png" alt="" className="circle" />
    <span className="title"><strong>{ props.message.senderName }</strong></span>
    <p>{ props.message.message }</p>
  </li>
);

