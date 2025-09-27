import React, { useState } from "react";
import events from "../data/events.json";

function AdminPage() {
  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
  });
  const [createdLink, setCreatedLink] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // For demo: generates a random ID and logs event to console.
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Date.now().toString();
    const newEvent = { id, ...form };
    // In real app, save newEvent to backend/db here.
    // For demo, just log and show link.
    console.log("Created event:", newEvent);
    setCreatedLink(`/event/${id}`);
    setForm({
      title: "",
      date: "",
      time: "",
      description: "",
    });
  };

  return (
    <main className="neo" style={{ padding: "2rem", maxWidth: 500, margin: "2rem auto" }}>
      <h2 style={{ color: "#e573a6" }}>Create a New Event</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
        <div style={{ marginBottom: 16 }}>
          <label>Title<br />
            <input className="neo-input" name="title" value={form.title} onChange={handleChange} required />
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Date<br />
            <input className="neo-input" type="date" name="date" value={form.date} onChange={handleChange} required />
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Time<br />
            <input className="neo-input" type="time" name="time" value={form.time} onChange={handleChange} required />
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Description<br />
            <textarea className="neo-input" name="description" value={form.description} onChange={handleChange} rows={3} />
          </label>
        </div>
        <button className="neo-btn" type="submit">Create Event</button>
      </form>
      {createdLink && (
        <div className="neo" style={{ marginTop: 20, padding: 16, textAlign: "center" }}>
          <b style={{ color: "#e573a6" }}>Event created!</b>
          <div>
            Share this link: <a href={createdLink}>{window.location.origin + createdLink}</a>
          </div>
        </div>
      )}
    </main>
  );
}

export default AdminPage;