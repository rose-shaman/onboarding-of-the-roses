import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import EventPage from "./pages/EventPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/event/:eventId" element={<EventPage />} />
        <Route
          path="/"
          element={
            <main className="neo" style={{ padding: "2rem", maxWidth: 500, margin: "2rem auto", textAlign: "center" }}>
              <h2 style={{ color: "#e573a6" }}>Welcome to Rose Sisterhood Onboarding</h2>
              <p>
                <a className="neo-btn" href="/admin">Create a new event (admin)</a>
              </p>
              <p style={{ color: "#7a2f4d" }}>
                If you received an event link, open it to view and join the event!
              </p>
            </main>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;