
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

