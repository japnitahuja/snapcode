import React, { useState } from "react";
import "./ExerciseList.css"; 
import playpurple from "../../assets/play_purple.png"
import greencheckmark from "../../assets/green_checkmark.png"
import yellowstar from "../../assets/yellow-star.png"
import greyedit from "../../assets/grey-edit.png"
import rederror from "../../assets/red-error.png"

const exercises = [
  { id: 1, title: 'Exercise 1: Heading Tags', status: 'Enhanced' },
  { id: 2, title: 'Exercise 2: HTML Structure', status: 'Completed' },
  { id: 3, title: 'Exercise 3: Title Tags', status: 'InProgress' },
  { id: 4, title: 'Exercise 4: Paragraph Tag', status: 'NotStarted' },
];

const statusIcons = {
  Enhanced: yellowstar,
  Completed: greencheckmark,
  InProgress: rederror,
};

function ExerciseList() {
  return (
      <div className="exercises-list">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="exercise-item">
            <span>{exercise.title}</span>
            <span className="exercise-icons">
            {exercise.status !== "NotStarted"? <img className="status-icon" src={statusIcons[exercise.status]} style={{marginRight:"2rem"}} />:null}
            {exercise.status === "NotStarted"? <img className="status-icon" src={playpurple}/>:<img className="status-icon" src={greyedit}/>}
            </span>
            
          </div>
        ))}
      </div>
  );
}

export default ExerciseList;
