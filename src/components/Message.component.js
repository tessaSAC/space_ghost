import React from 'react';

const styleToUser = {
  backgroundColor: '#ffca28'
};
const styleFromUser = {
  color: 'white',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  textAlign: 'right'
};

export default (props) => (
  <li
  	className="collection-item avatar"
  	style={ props.message.direction === 'toUser' ? styleToUser : styleFromUser }
  >
    { props.message.direction === 'toUser' && <img src="assets/gus.png" alt="" className="circle" /> }
    <span className="title"><strong>{ props.message.senderName }</strong></span>
    <p>{ props.message.message }</p>
  </li>
);

