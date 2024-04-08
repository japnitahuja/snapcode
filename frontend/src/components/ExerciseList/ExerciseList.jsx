import React, { useState } from "react";
import "./ExerciseList.css"; 
import playpurple from "../../assets/play_purple.png"
import greencheckmark from "../../assets/green_checkmark.png"
import yellowstar from "../../assets/yellow-star.png"
import greyedit from "../../assets/grey-edit.png"
import rederror from "../../assets/red-error.png"
import {exercises} from "../../data/exercises"
import { Link } from "react-router-dom";



const statusIcons = {
  Enhanced: yellowstar,
  Completed: greencheckmark,
  InProgress: rederror,
};

function ExerciseList() {


  return (
      <div className="exercises-list">
        {exercises.map((exercise) => (
          <Link to={`/exerciseDashboard/${exercise.id}`} style={{textDecoration:"none",color:"black"}}>
          <div key={exercise.id} className="exercise-item">
            <span>{exercise.title}</span>
            <span className="exercise-icons">
            {exercise.status !== "NotStarted"? <img className="status-icon" src={statusIcons[exercise.status]} style={{marginRight:"2rem"}} />:null}
            {exercise.status === "NotStarted"? <img className="status-icon" src={playpurple}/>:<img className="status-icon" src={greyedit}/>}
            </span>
            
          </div>
          </Link>
          
        ))}
      </div>
  );
}

export default ExerciseList;
