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
      },
      tumbeast: [{
        "slug": "tumbeast",
        "name": "Tumbeast",
        "size": "Knee-height",
        "type": "hellsite (affectionate) dweller",
        "subtype": "",
        "group": null,
        "alignment": "chaotic hungry",
        "armor_class": 10,
        "armor_desc": "oatmeal",
        "hit_points": 503,
        "hit_dice": "118d6+90",
        "speed": {
            "walk": 50,
            "climb": 50,
        },
        "strength": 12,
        "dexterity": 14,
        "constitution": 8,
        "intelligence": 1,
        "wisdom": 12,
        "charisma": 16,
        "strength_save": null,
        "dexterity_save": null,
        "constitution_save": null,
        "intelligence_save": null,
        "wisdom_save": null,
        "charisma_save": null,
        "perception": null,
        "skills": {
            "acrobatics": 4
        },
        "damage_vulnerabilities": "emotional",
        "damage_resistances": "",
        "damage_immunities": "psychic",
        "condition_immunities": "charmed, frightened",
        "senses": "passive Perception 12",
        "languages": "unsure, it doesn't seem to respond to anything",
        "challenge_rating": "-1",
        "actions": [
            {
                "attack_bonus": 4,
                "damage_dice": "3d8+6",
                "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) piercing damage.",
                "name": "Gnawing"
            },
            {
                "desc": "When Tumbeasts are not fed regularly, they band together and openly rebel in the server rooms which they call home, declaring anything they can get their tiny little paws on as viable food.",
                "name": "Mutiny"
            }
        ],
        "reactions": "",
        "legendary_desc": "",
        "legendary_actions": "",
        "special_abilities": [
            {
                "desc": "The elusive Tumbeast only shows up when there are no other results. Your filters found nothing.",
                "name": "Nothing Here"
            }
        ],
        "spell_list": [],
        "img_main": null,
        "document__slug": "",
        "document__title": "",
        "document__license_url": ""
    }]
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
    if (challengeRating.length > 2) {
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
    return(filteredCreatures.length ? filteredCreatures : this.state.tumbeast) ;
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
