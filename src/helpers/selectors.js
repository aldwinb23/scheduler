
export function getAppointmentsForDay(state, day) {
  const objDay = state.days.find(x => x.name === day);

  if (!objDay) {
    return [];
  }

  return objDay.appointments.map(appointmentId => state.appointments[appointmentId])
}
