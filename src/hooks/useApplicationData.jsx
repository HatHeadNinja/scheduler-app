import { useState, useEffect } from "react";
import axios from 'axios';

export function useApplicationData () {

  // update spots remaining for the day
  const updateSpots = function (increment) {
    const copiedDays = [...state.days];
    const updateDays = copiedDays.map((day) => {
      if (state.day === day.name) {
        return { ...day, spots: day.spots + increment };
      }
      return day;
    });
    return updateDays;
  };

  // book an interview
  const bookInterview = (appointmentId, interview, create) => {

    const appointment = {
      ...state.appointments[appointmentId],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [appointmentId]: appointment
    }
    // make call to scheduler-api to add new appointment
    return axios.put(`/api/appointments/${appointmentId}`, appointment)
      .then(res => {

        // for spots remaining
        let updatedDays = [];
        if (create) {
          updatedDays = updateSpots(-1);
        } else {
          updatedDays = updateSpots(0);
        }
          setState((prev) => ({
            ...prev,
            appointments,
            days: updatedDays,
        }))
      })
  }
  // cancel an interview
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // Increment spots
    const days = [...state.days];
    for (let dayIndex in days) {
      let day = days[dayIndex];
      if (day.appointments.includes(id)) {
        const newDay = { ...day, spots: day.spots + 1 };
        days[dayIndex] = newDay;
      }
    }
    // delete appointment via scheduler-api
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => setState({ ...state, appointments, days }));
  };

  // set initial state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  // retrieve data from the scheduler-api
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then(response => {
      setState(prev => ({
        ...prev, 
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data
      }))
    })
  }, [])
  
  // set the day
  const setDay = day => 
    setState(prev => ({
      ...prev,
      day: day
    }))

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}