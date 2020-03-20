export function getAppointmentsForDay(state, day) {
  const output = [];
  const dayID = state.days.find(value => value.name === day);
  console.log(dayID);
  const appointmentIDs = dayID ? dayID.appointments : [];
  console.log(state.appointments);
  for (const id of appointmentIDs) {
    if (state.appointments[id]) {
      output.push(state.appointments[id]);
    }
  }

  return output;
}
