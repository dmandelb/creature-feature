import React, { Component } from 'react';
import { Container, Row, Col, Card, Table, ListGroupItem } from 'react-bootstrap';
import AttributeDisplay from './AttributeDisplay';
import './Creature.css';
var {challengeRatingData} = require('./CRData');

class Creature extends Component {
  constructor(){
    super();
    this.state = {
      cardDisplay: 'none'
    };
    this.displayAbilities = this.displayAbilities.bind(this);
    this.calculateMod = this.calculateMod.bind(this);
    this.displaySpeed = this.displaySpeed.bind(this);
    this.displaySkills = this.displaySkills.bind(this);
    this.savesCheck = this.savesCheck.bind(this);
    this.displaySaves = this.displaySaves.bind(this);
    this.toggleCardDisplay = this.toggleCardDisplay.bind(this);
    this.renderExpandOrCollapse = this.renderExpandOrCollapse.bind(this);
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
      STR: 'strength_save',
      DEX: 'dexterity_save',
      CON: 'constitution_save',
      INT: 'intelligence_save',
      WIS: 'wisdom_save',
      CHA: 'charisma_save'
    }
    Object.keys(savesObj).forEach((saveAbbr)=>{
      this.props.creature[savesObj[saveAbbr]] ? savesObj[saveAbbr] = this.props.creature[savesObj[saveAbbr]] : delete savesObj[saveAbbr];
    })
    return this.displaySkills(savesObj);
  }
  toggleCardDisplay(){
    let newDisplay = (this.state.cardDisplay === 'none'? 'flex': 'none');
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
        <Card style={{display: this.state.cardDisplay}}>
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
                <Table responsive>
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
                  <label>Proficiency Bonus:</label> {challengeRatingData[this.props.creature.challenge_rating].proficiency}
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
        </ListGroupItem>
        
    );
  }
}
 
export default Creature;