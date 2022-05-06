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
              <option value={0}>0</option>
              <option value='1/8'>1/8</option>
              <option value='1/4'>1/4</option>
              <option value='1/2'>1/2</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
              <option value={13}>13</option>
              <option value={14}>14</option>
              <option value={15}>15</option>
              <option value={16}>16</option>
              <option value={17}>17</option>
              <option value={18}>18</option>
              <option value={19}>19</option>
              <option value={20}>20</option>
              <option value={21}>21</option>
              <option value={22}>22</option>
              <option value={23}>23</option>
              <option value={24}>24</option>
              <option value={25}>25</option>
              <option value={26}>26</option>
              <option value={27}>27</option>
              <option value={28}>28</option>
              <option value={29}>29</option>
              <option value={30}>30</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="challenge_rating_maximum">CR Maximum</Form.Label>
            <Form.Select name="challenge_rating_maximum" aria-label="Select Maximum CR" onChange={this.handleFilterSet}>
              <option value=''>No Maximum</option>
              <option value={0}>0</option>
              <option value='1/8'>1/8</option>
              <option value='1/4'>1/4</option>
              <option value='1/2'>1/2</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
              <option value={13}>13</option>
              <option value={14}>14</option>
              <option value={15}>15</option>
              <option value={16}>16</option>
              <option value={17}>17</option>
              <option value={18}>18</option>
              <option value={19}>19</option>
              <option value={20}>20</option>
              <option value={21}>21</option>
              <option value={22}>22</option>
              <option value={23}>23</option>
              <option value={24}>24</option>
              <option value={25}>25</option>
              <option value={26}>26</option>
              <option value={27}>27</option>
              <option value={28}>28</option>
              <option value={29}>29</option>
              <option value={30}>30</option>
            </Form.Select>
          </Form.Group>
          <Button type="submit">Apply Filters</Button>
        </Form>
      </Container>
    );
  }
}
 
export default Filter;