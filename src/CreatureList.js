import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Creature from './Creature';

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
      <div className="container">
        <h1>Creature Feature</h1>
        <ul className='list-group'>
          {this.state.creatures.map((creature)=> <Creature key={creature.index} creature={creature} />)}
        </ul>
      </div>
    );
  }
}
 
export default CreatureList;
