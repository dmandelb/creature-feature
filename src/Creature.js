import React, { Component } from 'react';
import { Row, ListGroupItem } from 'react-bootstrap';
import './Creature.css';
import ExpandedCreature from './ExpandedCreature';

class Creature extends Component {
  constructor(){
    super();
    this.state = {
      cardDisplay: false
    };
    this.toggleCardDisplay = this.toggleCardDisplay.bind(this);
    this.renderExpandOrCollapse = this.renderExpandOrCollapse.bind(this);
  }

  
  toggleCardDisplay(){
    let newDisplay = !this.state.cardDisplay;
    this.setState({cardDisplay: newDisplay});
  }
  renderExpandOrCollapse(){
    return (this.state.cardDisplay === 'none'? '+': '-')
  }
  render() { 
    return (
      <ListGroupItem className={this.props.indexNum} onClick={()=>{this.toggleCardDisplay()}}>
        <Row>
        <div className="col-sm-4 text-center">
          {this.props.creature.name}
        </div>
        <div className="col-sm-3 text-center">
          {this.props.creature.challenge_rating}
        </div>
        <div className="col-sm-4 text-center">
          {this.props.creature.type}
        </div>
        <div className='col-sm-1 text-center expand'>
          {this.renderExpandOrCollapse()}
        </div>
        </Row>
        { this.state.cardDisplay? <ExpandedCreature creature={this.props.creature} /> : null}
        
        </ListGroupItem>
        
    );
  }
}
 
export default Creature;