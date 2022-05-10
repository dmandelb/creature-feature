import React, { Component } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import AttributeDisplay from './AttributeDisplay';
import './Creature.css';

class Creature extends Component {
  constructor(){
    super();
    this.state = {
      proficiency: {
        '0': '+2',
        '1/8': '+2',
        '1/4': '+2',
        '1/2': '+2',
        '1': '+2',
        '2': '+2',
        '3': '+2',
        '4': '+2',
        '5': '+3',
        '6': '+3',
        '7': '+3',
        '8': '+3',
        '9': '+4',
        '10': '+4',
        '11': '+4',
        '12': '+4',
        '13': '+5',
        '14': '+5',
        '15': '+5',
        '16': '+5',
        '17': '+6',
        '18': '+6',
        '19': '+6',
        '20': '+6',
        '21': '+7',
        '22': '+7',
        '23': '+7',
        '24': '+7',
        '25': '+8',
        '26': '+8',
        '27': '+8',
        '28': '+8',
        '29': '+9',
        '30': '+9'
      }
    };
    this.displayAbilities = this.displayAbilities.bind(this);
    this.calculateMod = this.calculateMod.bind(this);
    this.displaySpeed = this.displaySpeed.bind(this);
    this.displaySkills = this.displaySkills.bind(this);
    this.savesCheck = this.savesCheck.bind(this);
    this.displaySaves = this.displaySaves.bind(this);
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
  displaySkills(skillsObj){
    return Object.entries(skillsObj).map((subArr)=>{
      return `${subArr[0].charAt(0).toUpperCase()+subArr[0].slice(1)} +${subArr[1]} `
    }).join(', ')
  }
  savesCheck(){
    return this.props.creature.charisma_save || this.props.creature.constitution_save || this.props.creature.dexterity_save || this.props.creature.intelligence_save || this.props.creature.strength_save || this.props.creature.wisdom_save;
  }
  displaySaves(){
    let savesObj = {
      CHA: 'charisma_save',
      CON: 'constitution_save',
      DEX: 'dexterity_save',
      INT: 'intelligence_save',
      STR: 'strength_save',
      WIS: 'wisdom_save'
    }
    Object.keys(savesObj).forEach((saveAbbr)=>{
      this.props.creature[savesObj[saveAbbr]] ? savesObj[saveAbbr] = this.props.creature[savesObj[saveAbbr]] : delete savesObj[saveAbbr];
    })
    return this.displaySkills(savesObj);
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
                <Col>
                <p>{this.props.creature.size} {this.props.creature.type}, {this.props.creature.alignment}<br/>
                <label>Challenge Rating:</label> {this.props.creature.challenge_rating}</p>
                <hr className='divider'/>
                </Col>
              </Row>
              <Row>
              <Col>
                <label>Armor Class:</label> {this.props.creature.armor_class}<br/>
                <label>Hit Points:</label> {this.props.creature.hit_points + ' (' + this.props.creature.hit_dice + ')'}<br/>
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
                { this.savesCheck() &&
                  <div>
                    <label>Saving Throws:</label> {this.displaySaves()}
                  </div>
                }
                { Object.keys(this.props.creature.skills).length > 0 &&
                  <div>
                    <label>Skills:</label> {this.displaySkills(this.props.creature.skills)}
                  </div>
                }
                { this.props.creature.condition_immunities &&
                  <div>
                    <label>Condition Immunities:</label> {this.props.creature.condition_immunities}
                  </div>
                }
                { this.props.creature.damage_immunities &&
                  <div>
                    <label>Damage Immunities:</label> {this.props.creature.damage_immunities}
                  </div>
                }
                { this.props.creature.damage_resistances &&
                  <div>
                    <label>Damage Resistances:</label> {this.props.creature.damage_resistances}
                  </div>
                }
                { this.props.creature.damage_vulnerabilities &&
                  <div>
                    <label>Damage Vulnerabilities:</label> {this.props.creature.damage_vulnerabilities}
                  </div>
                }
                { this.props.creature.senses &&
                  <div>
                    <label>Senses:</label> {this.props.creature.senses}
                  </div>
                }
                { this.props.creature.languages &&
                  <div>
                    <label>Languages:</label> {this.props.creature.languages}
                  </div>
                }
                <div>
                  <label>Proficiency Bonus:</label> {this.state.proficiency[this.props.creature.challenge_rating]}
                </div>
                <hr className='divider'/>
                { this.props.creature.special_abilities &&
                  <div>
                    {this.displayAbilities(this.props.creature.special_abilities)}
                  </div>
                }
              </Col>
              <Col>
                { this.props.creature.actions &&
                <div>
                  <h5 className='actiontitle'>
                    Actions
                    <hr/>
                  </h5>
                  {this.displayAbilities(this.props.creature.actions)}
                </div>
                }
                { this.props.creature.reactions &&
                <div>
                  <h5 className='actiontitle'>
                    Reactions
                    <hr/>
                  </h5>
                  {this.displayAbilities(this.props.creature.reactions)}
                </div>
                }
                { this.props.creature.legendary_actions &&
                <div>
                  <h5 className='actiontitle'>
                    Legendary Actions
                    <hr/>
                  </h5>
                  <p>{this.props.creature.legendary_desc}</p>
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