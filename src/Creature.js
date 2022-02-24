import React, { Component } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import AttributeDisplay from './AttributeDisplay';
import './Creature.css';

class Creature extends Component {
  constructor(){
    super();
    this.displayAbilities = this.displayAbilities.bind(this);
    this.calculateMod = this.calculateMod.bind(this);
    this.displaySpeed = this.displaySpeed.bind(this);
  }
  displayAbilities(abilitiesArray){
    return abilitiesArray.map((ability, index) =>{
      return <span key={index}><label>{ability.name}</label><p>{ability.desc}</p></span>
    })
  }
  calculateMod(score){
    let strVal;
    let numVal = Math.floor((score-10)/2);
    if (numVal >= 0) {
      strVal = '+' + numVal;
    } else {
      strVal = numVal.toString();
    }
    return strVal;
  }
  displaySpeed(){
    let speedStr = `${this.props.creature.speed.walk} ft.`;
    let speedTypes = ['burrow', 'climb', 'fly', 'swim'];
    for (let i = 0; i < speedTypes.length; i++) {
      if (this.props.creature.speed[speedTypes[i]]) {
        speedStr += `, ${speedTypes[i]} ${this.props.creature.speed[speedTypes[i]]} ft.`
      }
    }
    return speedStr;
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
                <label>Challenge Rating:</label> {this.props.creature.challenge_rating}<br/>
                <label>Armor Class:</label> {this.props.creature.armor_class}<br/>
                <label>Speed:</label> {this.displaySpeed()}
                <Table>
                  <thead>
                    <tr>
                      <th>STR</th>
                      <th>DEX</th>
                      <th>CON</th>
                      <th>INT</th>
                      <th>WIS</th>
                      <th>CHA</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{this.props.creature.strength}({this.calculateMod(this.props.creature.strength)})</td>
                      <td>{this.props.creature.dexterity}({this.calculateMod(this.props.creature.dexterity)})</td>
                      <td>{this.props.creature.constitution}({this.calculateMod(this.props.creature.constitution)})</td>
                      <td>{this.props.creature.intelligence}({this.calculateMod(this.props.creature.intelligence)})</td>
                      <td>{this.props.creature.wisdom}({this.calculateMod(this.props.creature.wisdom)})</td>
                      <td>{this.props.creature.charisma}({this.calculateMod(this.props.creature.charisma)})</td>
                    </tr>
                  </tbody>
                </Table>
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