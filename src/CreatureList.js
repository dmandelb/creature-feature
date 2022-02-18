import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CreatureList.css';
import { ListGroup, ListGroupItem} from 'react-bootstrap';
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
      <div>
        <header>
        <h1 className='title'>Creature Feature</h1>
        </header>
        <ListGroup id='creatureList' className='container'>
          <ListGroupItem id='sticky'>
            <div className='row'>
              <span className='col-sm font-weight-bold text-center'>Name</span>
              <span className='col-sm font-weight-bold text-center'>CR</span>
              <span className='col-sm font-weight-bold text-center'>Type</span>
            </div>
          </ListGroupItem>
          {this.state.creatures.length > 0? this.state.creatures.map((creature)=> <Creature key={creature.slug} creature={creature} />) : this.loading }
        </ListGroup>
      </div>
    );
  }
}
 
export default CreatureList;
