import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  // const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    // console.log("useEffect");

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
  }

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      getData(interview);
      return new Promise((resolve, reject) => {
        resolve(interview);
        reject(interview);
      });
    });
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then(getData);
  }

  return { state, setState, bookInterview, cancelInterview };
}
