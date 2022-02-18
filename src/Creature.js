import React, { Component } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import AttributeDisplay from './AttributeDisplay';
import './Creature.css';

class Creature extends Component {
  constructor(){
    super();
    this.displayAbilities = this.displayAbilities.bind(this);
  }
  displayAbilities(abilitiesArray){
    return abilitiesArray.map((ability, index) =>{
      return <span key={index}><label>{ability.name}</label><p>{ability.desc}</p></span>
    })
  }
  render() { 
    return (
      <li className='list-group-item'>
        <Row>
          <AttributeDisplay title="Name" value={this.props.creature.name}/>
          <AttributeDisplay title="CR" value={this.props.creature.challenge_rating}/>
          <AttributeDisplay title="Type" value={this.props.creature.type}/>
        </Row>
        <Card>
          <Card.Body>
            <Container>
              <Row>
                <Card.Title>
                  <h4>{this.props.creature.name}</h4>
                </Card.Title>
                <p>{this.props.creature.size} {this.props.creature.type}, {this.props.creature.alignment}</p>
              </Row>
              <Row>
              <Col>
                <label>Challenge Rating:</label> {this.props.creature.challenge_rating}
                <label>Armor Class:</label> {this.props.creature.armor_class}
              </Col>
              <Col>
                { this.props.creature.actions &&
                <div>
                  <h5>Actions</h5>
                  {this.displayAbilities(this.props.creature.actions)}
                </div>
                }
                { this.props.creature.reactions &&
                <div>
                  <hr className='divider'/>
                  <h5>Reactions</h5>
                  {this.displayAbilities(this.props.creature.reactions)}
                </div>
                }
                { this.props.creature.legendary_actions &&
                <div>
                  <hr className='divider'/>
                  <h5>Legendary Actions</h5>
                  {this.displayAbilities(this.props.creature.legendary_actions)}
                </div>
                }
                
              </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
        </li>
        
    );
  }
}
 
export default Creature;