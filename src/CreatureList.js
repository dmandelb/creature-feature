import './CreatureList.css';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class CreatureList extends Component {
  state = { 
    creatures: []
   } 
   componentDidMount(){
     fetch('https://www.dnd5eapi.co/api/monsters')
     .then(response=> response.json())
     .then((data)=>{
       this.setState({creatures: data.results});
     })
   }
  render() { 
    return (
      <div>
        <h1>Creature Feature</h1>
        <ul className='list-group'>
          {this.state.creatures.map((creature)=><li className='list-group-item' key={creature.index}>{creature.index}</li>)}
        </ul>
      </div>
    );
  }
}
 
export default CreatureList;
