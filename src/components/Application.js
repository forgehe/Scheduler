import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "./DayList";
import Appointment from "components/Appointment";
import "components/Application.scss";

import { getAppointmentsForDay, getInterview } from "../helpers/selectors";

// const appointments = [
//   {
//     id: 1,
//     time: "12pm"
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png"
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Richard Dank",
//       interviewer: {
//         id: 3,
//         name: "Whada Funk",
//         avatar: "https://i.redd.it/x8hhr1z8han41.jpg"
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "8pm",
//     interview: {
//       student: "Danklord Supreme",
//       interviewer: {
//         id: 3,
//         name: "Da Undankest",
//         avatar: "https://i.redd.it/t8wx28oto8n41.jpg"
//       }
//     }
//   }
// ];

export default function Application(props) {
  // const [days, setDays] = useState([]);
  // const [day, setDay] = useState("Monday");
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState({ ...state, days });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });

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
        ...state,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={day => setDay(day)}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{schedule}</section>
    </main>
  );
}
