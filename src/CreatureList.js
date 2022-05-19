import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CreatureList.css';
import { ListGroup, ListGroupItem} from 'react-bootstrap';
import Creature from './Creature';
import Filter from './Filter';
import logo from './CreatureFeatureLogo.png';
var {tumbeast} = require('./CRData');

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

  standardizeChallengeRating(challengeRating){
    let fractionConverter = {
      "1/8": 0.125,
      "1/4": 0.25,
      "1/2": 0.5
    }
    if (challengeRating.includes('/')) {
      return fractionConverter[challengeRating];
    } else {
      return parseInt(challengeRating);
    }
  }
  
  filterByCriteria(criteria, creatureArr){
    if (criteria === "challenge_rating_minimum") {
      return creatureArr.filter(creature => this.standardizeChallengeRating(creature.challenge_rating) >= this.standardizeChallengeRating(this.state.filters.challenge_rating_minimum));
    } else if(criteria === "challenge_rating_maximum"){
      return creatureArr.filter(creature=> this.standardizeChallengeRating(creature.challenge_rating) <= this.standardizeChallengeRating(this.state.filters.challenge_rating_maximum));
    } else {
      return creatureArr.filter(creature => creature[criteria] === this.state.filters[criteria]);
    }
  }
  
  filterCreatures(){
    let filteredCreatures = [...this.state.creatures]; // create a copy of creatures in state so as to not require a new API call every time filters are changed
    let activeFilters = Object.entries({...this.state.filters}).filter(singleFilter => singleFilter[1] !== null); // determine which filters are active so we can apply only active filters
    if (activeFilters.length > 0) {
      for (let [singleActiveFilter, filterValue] of activeFilters) {
        filteredCreatures = this.filterByCriteria(singleActiveFilter, filteredCreatures);
      }
    } // apply only each active filter
    
    // return filteredCreatures; //create tumbeast for 0 results
    return(filteredCreatures.length ? filteredCreatures : tumbeast) ;
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
        <h1 className='title'><img src={logo} id='logo' alt='silhouette of a black 20-sided die with red teeth' /><span id="title-text">Creature Feature</span></h1>
        </header>
        <Filter applyFilters={this.applyFilters} currentFilters={this.state.filters}/>
        <ListGroup id='creatureList' className='container'>
          <ListGroupItem id='list-head'>
            <div className='row'>
              <span className='col-sm-4 font-weight-bold text-center'>Name</span>
              <span className='col-sm-3 font-weight-bold text-center'>CR</span>
              <span className='col-sm-4 font-weight-bold text-center'>Type</span>
              <span className='col-sm-1 text-center'>+/-</span>
            </div>
          </ListGroupItem>
          {this.state.creatures.length > 0? this.filterCreatures().map((creature, index)=> <Creature indexNum={`row${index % 3}`} key={creature.slug} creature={creature} />) : this.loading }
        </ListGroup>
      </div>
    );
  }
}
 
export default CreatureList;
