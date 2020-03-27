import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  // const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  // console.log("state:", state);

  function getData() {
    // console.log("getData", state);

    return Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers"))
    ]).then(all => {
      return setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }

  useEffect(() => {
    getData();
  }, []);

  function bookInterview(id, interview) {
    // const appointment = {
    //   ...state.appointments[id],
    //   interview: { ...interview }
    // };
    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // };
    return axios.put(`/api/appointments/${id}`, { interview }).then(getData);
  }

  function cancelInterview(id) {
    // const appointments = {
    //   ...state.appointments,
    //   [id]: { ...state.appointments[id], interview: null }
    // };
    return axios.delete(`/api/appointments/${id}`).then(getData);
  }

  return { state, setState, getData, bookInterview, cancelInterview };
}
