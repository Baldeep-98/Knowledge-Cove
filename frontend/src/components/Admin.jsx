import React from "react";

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
      </header>
      <div className="dashboard-content">
        <section className="upload-book-section">
          <h2>Upload New Book</h2>
          <form className="upload-book-form">
            <div className="form-group">
              <label htmlFor="book-picture">Book Picture:</label>
              <input type="file" id="book-picture" />
            </div>
            <div className="form-group">
              <label htmlFor="book-name">Book Name:</label>
              <input type="text" id="book-name" />
            </div>
            <div className="form-group">
              <label htmlFor="author-name">Author Name:</label>
              <input type="text" id="author-name" />
            </div>
            <div className="form-group">
              <label htmlFor="long-discription">Long Discription:</label>
              <input type="text" id="long-discription" />
            </div>
            <div className="form-group">
              <label htmlFor="short-discription">Short Discription:</label>
              <input type="text" id="short-discription" />
            </div>
            <button type="submit" className="submit-button">Add Book</button>
          </form>
        </section>

        <section className="manage-reservation-section">
          <h2>Manage Room Reservation Slots</h2>
          <form className="reservation-form">
            <div className="form-group">
              <label htmlFor="room-name">Room Name:</label>
              <input type="text" id="room-name" />
            </div>
            <div className="form-group">
              <label htmlFor="reservation-date">Reservation Date:</label>
              <input type="date" id="reservation-date" />
            </div>
            <div className="form-group">
              <label htmlFor="start-time">Start Time:</label>
              <input type="time" id="start-time" />
            </div>
            <div className="form-group">
              <label htmlFor="end-time">End Time:</label>
              <input type="time" id="end-time" />
            </div>
            <button type="submit" className="submit-button">Add Slot</button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;
