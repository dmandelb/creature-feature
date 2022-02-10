import React, { Component } from 'react';

class Creature extends Component {
  state = {  } 
  render() { 
    return (
      <li className='list-group-item'>
        <span className=''></span>
        {this.props.creature.name}
        </li>
    );
  }
}
 
export default Creature;