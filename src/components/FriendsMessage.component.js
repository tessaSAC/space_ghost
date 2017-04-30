import React from 'react';

export default (props) => (
  <li className="collection-item avatar">
    <img src="images/yuna.jpg" alt="" className="circle" />
    <span className="title">{ sender.name }</span>
    <p>{ sender.message }</p>
  </li>
);

