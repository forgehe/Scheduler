// returns array of appointments matched for that day
export function getAppointmentsForDay(state, day) {
  const output = [];
  const dayID = state.days.find(value => value.name === day);
  const appointmentIDs = dayID ? dayID.appointments : [];
  for (const id of appointmentIDs) {
    let appointment = state.appointments[id];
    if (appointment) {
      output.push(appointment);
    }
  }

  return output;
}
// returns interview object with proper format
export function getInterview(state, interview) {
  if (interview) {
    const id = interview.interviewer;
    const newInterview = { ...interview };
    newInterview.interviewer = { ...state.interviewers[id] };
    return newInterview;
  } else {
    return null;
  }
}
// returns an array of interviewers for that day
export function getInterviewersForDay(state, day) {
  const output = [];
  const matchedDay = state.days.find(value => value.name === day);
  const interviewArr = matchedDay ? matchedDay.interviewers : [];
  for (const id of interviewArr) {
    let interview = state.interviewers[id];
    if (interview) {
      output.push(interview);
    }
  }
  return output;
}
