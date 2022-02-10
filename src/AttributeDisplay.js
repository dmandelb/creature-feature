function AttributeDisplay(props) {
  return ( 
    <div className="col-sm">
      <span className="font-weight-bold">{props.title}: </span>
      {props.value}
    </div>
   );
}

export default AttributeDisplay;