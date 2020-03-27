import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // reloads data from the database, and then setState
  function getData() {
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
    return axios.put(`/api/appointments/${id}`, { interview }).then(getData);
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then(getData);
  }

  return { state, setState, getData, bookInterview, cancelInterview };
}
