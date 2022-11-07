
export function getAppointmentsForDay(state, day) {
  const objDay = state.days.find(x => x.name === day);

  if (!objDay) {
    return [];
  }

  return objDay.appointments.map(appointmentId => state.appointments[appointmentId])
}


// export function getInterviewersForDay(state, day) {
//   const objDay = state.days.find(x => x.name === day);

//   if (!objDay) { return []; }

//   console.log("objDay:", objDay.name)

//   const appy = state.appointments[5].interview;

//   console.log("appy:", appy);

//   const test = appy.interviewer;

//   console.log("interviewer id:", test);

//   // return objDay.appointments.map(appointmentId => state.appointments[appointmentId])
//   console.log("test:", objDay.appointments.map(appointmentId => state.appointments[appointmentId]));
// }


export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewId = interview.interviewer;
  const interviewer = state.interviewers[interviewId];

  const result = {
    student: interview.student,
    interviewer: interviewer
  }

  return result;
}



export function getInterviewersForDay(state, day) {
  
  let interviewers = [];
  // console.log("day:", day)

  for (let dayObj of state.days) {
    // console.log("days:", dayObj)
    if (dayObj.name === day) {
      // interviewers = dayObj.appointments;
      interviewers = dayObj.interviewers;
      // console.log("ints:", interviewers);
    }
  }

  const interviewerList = interviewers.map((id) => {
    // console.log("id:", id)
    // console.log("stateint:", state.interviewers);
    for (let interviewer in state.interviewers) {
      if (Number(interviewer) === id) {
        return state.interviewers[interviewer];
      }
    } 
    return null;
  })

  return interviewerList;

};


// export function getInterviewersForDay(state, day) {
  
//   let interviewers = [];

//   for (let dayObj of state.days) {
//     if (dayObj.name === day) {
//       interviewers = dayObj.interviewers;
//     }
//   }
//   console.log("ints:", interviewers);
//   let interviewerList = interviewers.map((id) => {
//     for (let interviewer in state.interviewers) {
//       if (Number(interviewer) === id) {
//         return state.interviewers[interviewer];
//       }
//     } 
//     return null;
//   })

//   return interviewerList;

// };