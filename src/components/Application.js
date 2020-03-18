import React, { useState } from "react";

import DayList from "./DayList";
import Appointment from "components/Appointment";
import "components/Application.scss";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0
  }
];

const appointments = [
  {
    id: 1,
    time: "12pm"
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png"
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Richard Dank",
      interviewer: {
        id: 3,
        name: "Whada Funk",
        avatar: "https://i.redd.it/x8hhr1z8han41.jpg"
      }
    }
  },
  {
    id: 4,
    time: "8pm",
    interview: {
      student: "Danklord Supreme",
      interviewer: {
        id: 3,
        name: "Da Undankest",
        avatar: "https://i.redd.it/t8wx28oto8n41.jpg"
      }
    }
  }
];

export default function Application(props) {
  const [day, setDay] = useState("Monday");
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
          <DayList days={days} day={day} setDay={day => setDay(day)} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments.map(val => (
          <Appointment key={val.id} {...val}></Appointment>
        ))}
        <Appointment key="last" time="8pm"></Appointment>
      </section>
    </main>
  );
}
