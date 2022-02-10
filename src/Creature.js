import React, { Component } from 'react';

class Creature extends Component {
  state = {  } 
  render() { 
    return (
      <li className='list-group-item'>
        <span className='font-weight-bold'>Name: </span>
        {this.props.creature.name}
        
        </li>
        
    );
  }
}
 
export default Creature;