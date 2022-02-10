import React, { Component } from 'react';
import AttributeDisplay from './AttributeDisplay';

class Creature extends Component {
  state = {  } 
  render() { 
    return (
      <li className='list-group-item'>
        <div className='row'>
          <AttributeDisplay title="Name" value={this.props.creature.name}/>
          <AttributeDisplay title="CR" value={this.props.creature.challenge_rating}/>
          <AttributeDisplay title="Type" value={this.props.creature.type}/>
        </div>
        </li>
        
    );
  }
}
 
export default Creature;