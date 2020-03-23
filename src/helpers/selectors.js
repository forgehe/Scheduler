export function getAppointmentsForDay(state, day) {
  const output = [];
  const dayID = state.days.find(value => value.name === day);
  const appointmentIDs = dayID ? dayID.appointments : [];
  for (const id of appointmentIDs) {
    let appointment = state.appointments[id];
    // if (appointment.interview) {
    //   output.push(setInterview(state, appointment));
    // } else if (appointment) {
    //   output.push(appointment);
    // }
    if (appointment) {
      output.push(appointment);
    }
  }

  return output;
}

// const setInterview = (state, appointment) => {
//   const id = appointment.interview.interviewer;
//   const interviewer = { ...state.interviewers[id] };
//   appointment.interview.interviewer = interviewer;
//   return appointment;
// };

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
