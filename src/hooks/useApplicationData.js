import React, { useState, useEffect } from "react";
import axios from "axios";

import { getSpotsForDay } from "../helpers/selectors";

export default function useApplicationData() {
  const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  console.log("state", state);

  useEffect(() => {
    const apiDays = axios.get("/api/days");
    const apiAppointments = axios.get("/api/appointments");
    const apiInterviewers = axios.get("/api/interviewers");

    Promise.all([
      Promise.resolve(apiDays),
      Promise.resolve(apiAppointments),
      Promise.resolve(apiInterviewers)
    ]).then(all => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, [bookInterview, cancelInterview]);

  function bookInterview(id, interview) {
    // console.log("bookInterview", id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // setState(prev => ({ ...prev, appointments }));
    return axios.put(`/api/appointments/${id}`, { interview });
  }

  function cancelInterview(id) {
    // console.log("cancelInterview", id);
    const appointments = {
      ...state.appointments,
      [id]: { ...state.appointments[id], interview: null }
    };
    // setState(prev => ({ ...prev, appointments }));
    return axios.delete(`/api/appointments/${id}`);
  }

  return { state, setDay, bookInterview, cancelInterview };
}
