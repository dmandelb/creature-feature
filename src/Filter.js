import { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './Filter.css';
var {challengeRatings} = require('./CRData');

class Filter extends Component {
  constructor(){
    super();
    this.state = {
      filters: {
        alignment: null,
        challenge_rating_minimum: null,
        challenge_rating_maximum: null,
        size: null,
        type: null
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFilterSet = this.handleFilterSet.bind(this);
    this.createChallengeRatingOptionList = this.createChallengeRatingOptionList.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.applyFilters(this.state.filters);
  }

  handleFilterSet(event){
    let filterName = event.target.name;
    let filterVal;
    event.target.value === '' ? filterVal = null : filterVal = event.target.value;
    let newFilters = {...this.state.filters};
    newFilters[filterName] = filterVal;
    this.setState({filters: newFilters});
  }
  createChallengeRatingOptionList(){
    return challengeRatings.map((challengeRating)=>{
      return <option key={challengeRating} value={challengeRating}>{challengeRating}</option>
    })
  }
  render() { 
    return (
      <Container id='filters'>
        <Form className="filterForm" onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="type">Creature Type</Form.Label>
            <Form.Select name="type" aria-label='Select Creature Type' onChange={this.handleFilterSet}>
              <option value=''>All Types</option>
              <option value="aberration">Aberration</option>
              <option value="beast">Beast</option>
              <option value="celestial">Celestial</option>
              <option value="construct">Construct</option>
              <option value="dragon">Dragon</option>
              <option value="elemental">Elemental</option>
              <option value="fey">Fey</option>
              <option value="fiend">Fiend</option>
              <option value="giant">Giant</option>
              <option value="humanoid">Humanoid</option>
              <option value="monstrosity">Monstrosity</option>
              <option value="ooze">Ooze</option>
              <option value="plant">Plant</option>
              <option value="undead">Undead</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="size">Size</Form.Label>
            <Form.Select name="size" aria-label='Select Size' onChange={this.handleFilterSet}>
              <option value=''>All Sizes</option>
              <option value='Tiny'>Tiny</option>
              <option value='Small'>Small</option>
              <option value='Medium'>Medium</option>
              <option value='Large'>Large</option>
              <option value='Huge'>Huge</option>
              <option value='Gargantuan'>Gargantuan</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="challenge_rating_minimum">CR Minimum</Form.Label>
            <Form.Select name="challenge_rating_minimum" aria-label="Select Minimum CR" onChange={this.handleFilterSet}>
              <option value=''>No Minimum</option>
              {this.createChallengeRatingOptionList()}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="challenge_rating_maximum">CR Maximum</Form.Label>
            <Form.Select name="challenge_rating_maximum" aria-label="Select Maximum CR" onChange={this.handleFilterSet}>
              <option value=''>No Maximum</option>
              {this.createChallengeRatingOptionList()}
            </Form.Select>
          </Form.Group>
          <Button variant="dark" type="submit">Apply Filters</Button>
        </Form>
      </Container>
    );
  }
}
 
export default Filter;