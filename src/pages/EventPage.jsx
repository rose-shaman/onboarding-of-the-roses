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
      <main style={{ padding: "2rem" }}>
        <h2>Event not found</h2>
        <p>This event does not exist.</p>
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
    <main style={{ padding: "2rem" }}>
      <h2>{event.title}</h2>
      <div>
        <b>Date:</b> {event.date} <b>Time:</b> {event.time}
      </div>
      <div style={{ margin: "1rem 0" }}>{event.description}</div>
      <h3>Join This Event</h3>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div>
          <label>
            Name<br />
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Note (optional)<br />
            <input name="note" value={form.note} onChange={handleChange} />
          </label>
        </div>
        <button type="submit">Add me to the list</button>
      </form>
      <h3 style={{ marginTop: "2rem" }}>Participants</h3>
      <ul>
        {participants.map((p, i) => (
          <li key={i}>
            <b>{p.name}</b> {p.note && <span>- {p.note}</span>}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default EventPage;