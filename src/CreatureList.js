import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CreatureList.css';
import { ListGroup, ListGroupItem} from 'react-bootstrap';
import Creature from './Creature';
import Filter from './Filter';

class CreatureList extends Component {
  constructor(){
    super()
    this.state = {
      creatures: [],
      filters: {
        alignment: null,
        challenge_rating_minimum: null,
        challenge_rating_maximum: null,
        size: null,
        type: null
      }
    }
    this.applyFilters = this.applyFilters.bind(this);
    this.filterCreatures = this.filterCreatures.bind(this);
    this.loading = <p>Nat 20 on stealth, you get a surprise round!</p>;
  }

  applyFilters(filterObj){
    let modifiedFilterState = {...this.state};
    modifiedFilterState.filters = filterObj;
    this.setState(modifiedFilterState);
    // receive object with filters from Filter component, change state
  }
  
  filterByType(creatureArr){
    if (this.state.filters.type) {
      return creatureArr.filter(creature => creature.type == this.state.filters.type);
    } else {
      return creatureArr;
    }
  }
  
  filterCreatures(){
    let filteredCreatures = [...this.state.creatures];
    filteredCreatures = this.filterByType(filteredCreatures);
    return filteredCreatures; //create tumbeast for 0 results
  }

   componentDidMount(){
     fetch('https://api.open5e.com/monsters/?document__slug=wotc-srd&limit=322')
     .then(response=> response.json())
     .then((data)=>{
       this.setState({creatures: data.results});
     })
   }
    // each filter when applied sets a filter state (object of applied filters)
      // Object contains filter names as keys, null as empty values allowing for a variety of value types
    // Filters must stack
    //  Applying a filter triggers a re-render
    // ListGroup calls a handler function instead of accessing state directly
    // handler function returns a filtered version of creatures state without modifying existing state
  render() { 
    return (
      <div>
        <header>
        {/* <h1 className='title'>Creature Feature</h1> */}
        </header>
        <Filter applyFilters={this.applyFilters} currentFilters={this.state.filters}/>
        <ListGroup id='creatureList' className='container'>
          <ListGroupItem id='sticky'>
            <div className='row'>
              <span className='col-sm font-weight-bold text-center'>Name</span>
              <span className='col-sm font-weight-bold text-center'>CR</span>
              <span className='col-sm font-weight-bold text-center'>Type</span>
            </div>
          </ListGroupItem>
          {this.state.creatures.length > 0? this.filterCreatures().map((creature)=> <Creature key={creature.slug} creature={creature} />) : this.loading }
        </ListGroup>
      </div>
    );
  }
}
 
export default CreatureList;
