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
            <main style={{ padding: "2rem" }}>
              <h2>Welcome to Rose Sisterhood Onboarding</h2>
              <p>
                <a href="/admin">Create a new event (admin)</a>
              </p>
              <p>
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