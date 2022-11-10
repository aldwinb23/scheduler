
export function getAppointmentsForDay(state, day) {
  const objDay = state.days.find(x => x.name === day);

  if (!objDay) {
    return [];
  }

  return objDay.appointments.map(appointmentId => state.appointments[appointmentId])
}


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

  for (let dayObj of state.days) {
    if (dayObj.name === day) {
      interviewers = dayObj.interviewers;
    }
  }

  const interviewerList = interviewers.map((id) => {
    for (let interviewer in state.interviewers) {
      if (Number(interviewer) === id) {
        return state.interviewers[interviewer];
      }
    } 
    return null;
  })

  return interviewerList;

};
