import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Creature from './Creature';

class CreatureList extends Component {
  constructor(){
    super()
    this.state = {
      creatures: []
    }
    this.loading = <p>Nat 20 on stealth, you get a surprise round!</p>;
  }
  
   
   componentDidMount(){
     fetch('https://api.open5e.com/monsters/?document__slug=wotc-srd&limit=322')
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
          {this.state.creatures.length > 0? this.state.creatures.map((creature)=> <Creature key={creature.slug} creature={creature} />) : this.loading }
        </ul>
      </div>
    );
  }
}
 
export default CreatureList;
