import { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';


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
  }

  handleSubmit(event){
    event.preventDefault();
    // this.props.currentFilters != this.state.filters ? this.props.applyFilters(this.state.filters) : alert("These filters are already applied.");
    this.props.applyFilters(this.state.filters);
  }

  handleFilterSet(event){
    let filterName = event.target.name;
    let filterVal;
    event.target.value === '' ? filterVal = null : filterVal = event.target.value;
    let newFilters = {...this.state.filters};
    newFilters[filterName] = filterVal;
    // console.log(event.target.name);
    this.setState({filters: newFilters});
  }
  render() { 
    return (
      <Container>
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
          <Button type="submit">Apply Filters</Button>
        </Form>
      </Container>
    );
  }
}
 
export default Filter;