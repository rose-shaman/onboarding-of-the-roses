import React, { useState } from "react";
import { useParams } from "react-router-dom";
import events from "../data/events.json";
import allParticipants from "../data/participants.json";

function EventPage() {
  const { eventId } = useParams();
  const event = events.find((ev) => ev.id === eventId);
  const [participants, setParticipants] = useState(
    allParticipants[eventId] || []
  );
  const [form, setForm] = useState({ name: "", note: "" });

  if (!event) {
    return (
      <main className="neo" style={{ padding: "2rem", maxWidth: 500, margin: "2rem auto", textAlign: "center" }}>
        <h2 style={{ color: "#e573a6" }}>Event not found</h2>
        <p style={{ color: "#7a2f4d" }}>This event does not exist.</p>
      </main>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newParticipant = { ...form };
    const nextList = [...participants, newParticipant];
    setParticipants(nextList);
    setForm({ name: "", note: "" });
  };

  return (
    <main className="neo" style={{ padding: "2rem", maxWidth: 500, margin: "2rem auto" }}>
      <h2 style={{ color: "#e573a6" }}>{event.title}</h2>
      <div style={{ color: "#7a2f4d" }}>
        <b>Date:</b> {event.date} <b>Time:</b> {event.time}
      </div>
      <div style={{ margin: "1rem 0", color: "#7a2f4d" }}>{event.description}</div>
      <h3 style={{ color: "#e573a6" }}>Join This Event</h3>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
        <div style={{ marginBottom: 16 }}>
          <label>
            Name<br />
            <input className="neo-input" name="name" value={form.name} onChange={handleChange} required />
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>
            Note (optional)<br />
            <input className="neo-input" name="note" value={form.note} onChange={handleChange} />
          </label>
        </div>
        <button className="neo-btn" type="submit">Add me to the list</button>
      </form>
      <h3 style={{ marginTop: "2rem", color: "#e573a6" }}>Participants</h3>
      <ul>
        {participants.map((p, i) => (
          <li key={i} style={{ color: "#7a2f4d" }}>
            <b>{p.name}</b> {p.note && <span>- {p.note}</span>}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default EventPage;