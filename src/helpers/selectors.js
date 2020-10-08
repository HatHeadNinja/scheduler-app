// get appointments for a specific day
export function getAppointmentsForDay(state, day) {
  let appointmentList = [];

  const filteredDays = state.days.filter((item) => item.name === day);

  if (filteredDays.length) {
    for (let appointment of filteredDays[0].appointments) {
      appointmentList.push(state.appointments[appointment]);
    }
  }
  return appointmentList;
};

// get interview info
export function getInterview(state, interview) {
  if (interview) {
    return {
      ...interview,
      interviewer: state.interviewers[interview.interviewer],
    };
  }
  // no interview provided
  return null;
};

// get interviews for a specific day
export function getInterviewersForDay(state, day) {
  let interviewersList = [];

  const filteredDays = state.days.filter((item) => item.name === day);

  if (filteredDays.length) {
    for (let interviewer of filteredDays[0].interviewers) {
      interviewersList.push(state.interviewers[interviewer]);
    }
  }
  return interviewersList;
};