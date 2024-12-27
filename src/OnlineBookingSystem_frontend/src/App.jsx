import React, { useState } from 'react';

function App() {
  
  const [books, setBooks] = useState([
    { id: 1, title: 'The Adventures of Huckleberry Finn', author: 'Mark Twain' },
    { id: 2, title: 'The Three Musketeers', author: 'Author 2' },
    { id: 3, title: 'harry potter', author: 'J. K. Rowling' },
    { id: 4, title: 'Crime and Punishment', author: 'Fyodor Dostoyevsky' },
    { id: 5, title: '20,000 Leagues Under the Sea', author: 'Jules Verne' }
  ]);

  const [selectedBook, setSelectedBook] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({ date: '', time: '', customer: '', book: null });

  // Add a new booking
  const handleAddBooking = () => {
    if (!newBooking.date || !newBooking.time || !newBooking.customer || !newBooking.book) {
      alert('Please fill in all fields and select a book');
      return;
    }
    setBookings([...bookings, newBooking]);
    setNewBooking({ date: '', time: '', customer: '', book: null });
  };

  // Edit booking details
  const handleEditBooking = (index) => {
    const bookingToEdit = bookings[index];
    setNewBooking(bookingToEdit);
    setSelectedBook(bookingToEdit.book);
  };

  const handleSaveEdit = () => {
    const updatedBookings = bookings.map((booking, index) =>
      booking === newBooking ? newBooking : booking
    );
    setBookings(updatedBookings);
    setNewBooking({ date: '', time: '', customer: '', book: null });
  };

  // Cancel booking
  const handleCancelBooking = (index) => {
    const updatedBookings = bookings.filter((_, i) => i !== index);
    setBookings(updatedBookings);
  };

  return (
    <div className="App">
      <h1>Online Booking System</h1>

      <div className="booking-form">
        <input
          type="date"
          value={newBooking.date}
          onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
        />
        <input
          type="time"
          value={newBooking.time}
          onChange={(e) => setNewBooking({ ...newBooking, time: e.target.value })}
        />
        <input
          type="text"
          placeholder="Customer Name"
          value={newBooking.customer}
          onChange={(e) => setNewBooking({ ...newBooking, customer: e.target.value })}
        />

        <select
          value={selectedBook ? selectedBook.id : ''}
          onChange={(e) => {
            const bookId = parseInt(e.target.value);
            const book = books.find((b) => b.id === bookId);
            setSelectedBook(book);
            setNewBooking({ ...newBooking, book });
          }}
        >
          <option value="">Select a Book</option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title} by {book.author}
            </option>
          ))}
        </select>

        {newBooking.book && <p>Selected Book: {newBooking.book.title}</p>}

        {bookings.includes(newBooking) ? (
          <button onClick={handleSaveEdit}>Save Changes</button>
        ) : (
          <button onClick={handleAddBooking}>Add Booking</button>
        )}
      </div>

      <h2>Bookings</h2>
      <ul className="booking-list">
        {bookings.map((booking, index) => (
          <li key={index}>
            <p>Date: {booking.date}</p>
            <p>Time: {booking.time}</p>
            <p>Customer: {booking.customer}</p>
            <p>Book: {booking.book.title} by {booking.book.author}</p>
            <button onClick={() => handleEditBooking(index)}>Edit</button>
            <button onClick={() => handleCancelBooking(index)}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;