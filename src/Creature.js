import React, { Component } from 'react';
import AttributeDisplay from './AttributeDisplay';

class Creature extends Component {
  constructor(){
    super();
    this.displayAbilities = this.displayAbilities.bind(this);
  }
  displayAbilities(abilitiesArray){
    return abilitiesArray.map((ability, index) =>{
      return <span key={index}><label>{ability.name}</label><p>{ability.desc}</p></span>
    })
  }
  render() { 
    return (
      <li className='list-group-item'>
        <div className='row'>
          <AttributeDisplay title="Name" value={this.props.creature.name}/>
          <AttributeDisplay title="CR" value={this.props.creature.challenge_rating}/>
          <AttributeDisplay title="Type" value={this.props.creature.type}/>
        </div>
        <div className='card'>
          <div className='card-body container'>
            <div className='card-title col-12'>
              <h4>{this.props.creature.name}</h4>
              <p>{this.props.creature.size} {this.props.creature.type}, {this.props.creature.alignment}</p>
            </div>
            <div className='col-6'>
              <label>Challenge Rating:</label> {this.props.creature.challenge_rating}
              <label>Armor Class:</label> {this.props.creature.armor_class}
            </div>
            <div className='col-6'>
              { this.props.creature.actions &&
              <div>
                <h5>Actions</h5>
                {this.displayAbilities(this.props.creature.actions)}
              </div>
              }
              { this.props.creature.reactions &&
              <div>
                <h5>Reactions</h5>
                {this.displayAbilities(this.props.creature.reactions)}
              </div>
              }
              { this.props.creature.legendary_actions &&
              <div>
                <h5>Legendary Actions</h5>
                {this.displayAbilities(this.props.creature.legendary_actions)}
              </div>
              }
              
            </div>
          </div>
        </div>
        </li>
        
    );
  }
}
 
export default Creature;