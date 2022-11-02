
import React from "react";
import DayListItem from "components/DayListItem"

export default function DayList(props){
  console.log(props)
  // const listItems = props.days.map((day) => <li>{day.name}</li> )
  const listItems = props.days.map((day) => 
    <DayListItem 
      key={day.id}
      id={day.id} 
      name={day.name} 
      spots={day.spots}
      selected={day.name===props.day}
      setDay={props.setDay}
    />
  )
  
  return(
    <ul>
      {listItems}     
    </ul>
  )
}
