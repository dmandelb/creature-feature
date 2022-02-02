import './CreatureList.css';
import React, { Component } from 'react';

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
        
      </div>
    );
  }
}
 
export default CreatureList;
