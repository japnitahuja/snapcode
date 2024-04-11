import React, { useState } from "react";
import "./ExerciseList.css"; 
import playpurple from "../../assets/play_purple.png"
import greencheckmark from "../../assets/green_checkmark.png"
import yellowstar from "../../assets/yellow-star.png"
import greyedit from "../../assets/grey-edit.png"
import rederror from "../../assets/red-error.png"
import {exercises} from "../../data/exercises"
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/authContext";



const statusIcons = {
  Enhanced: yellowstar,
  Completed: greencheckmark,
  InProgress: rederror,
};

function ExerciseList() {
  const {setCurrentExercise} = useAuthContext();

  return (
      <div className="exercises-list">
        {exercises.map((exercise) => (
          <Link key={exercise.id} to={`/exerciseDashboard/${exercise.id}`} style={{textDecoration:"none",color:"black"}}>
          <div className="exercise-item" onClick={()=>{setCurrentExercise(exercise.id)}}>
            <span>{`Exercise ${exercise.id+1}: ${exercise.title}`}</span>
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
