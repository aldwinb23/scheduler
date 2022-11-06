
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


