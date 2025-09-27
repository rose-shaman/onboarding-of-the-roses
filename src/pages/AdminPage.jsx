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
    <main style={{ padding: "2rem" }}>
      <h2>Create a New Event</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div>
          <label>Title<br />
            <input name="title" value={form.title} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>Date<br />
            <input type="date" name="date" value={form.date} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>Time<br />
            <input type="time" name="time" value={form.time} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>Description<br />
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} />
          </label>
        </div>
        <button type="submit">Create Event</button>
      </form>
      {createdLink && (
        <div style={{ marginTop: 20 }}>
          <b>Event created!</b>
          <div>
            Share this link: <a href={createdLink}>{window.location.origin + createdLink}</a>
          </div>
        </div>
      )}
    </main>
  );
}

export default AdminPage;