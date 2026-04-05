import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);  // Store events data from API
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state
  const [selectedFilter, setSelectedFilter] = useState("all"); 

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://localhost:8000/events/public");
      console.log("Events response:", response.data);
      
      // Handle the API response structure
      if (response.data.success && response.data.events) {
        setEvents(response.data.events);
      } else if (Array.isArray(response.data)) {
        setEvents(response.data);
      } else {
        setEvents([]);
      }
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to load events. Please try again.");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Filtering Logic
  const currentDate = new Date();
  const upcomingEvents = events.filter(event => new Date(event.date) >= currentDate);
  const pastEvents = events.filter(event => new Date(event.date) < currentDate);

  let displayedEvents = events;
  if (selectedFilter === "upcoming") displayedEvents = upcomingEvents;
  if (selectedFilter === "past") displayedEvents = pastEvents;

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Events</h1>
        <div className="flex space-x-4">
          <button 
            onClick={fetchEvents}
            disabled={loading}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition disabled:opacity-50"
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
          <button 
            onClick={() => setSelectedFilter("all")}
            className={`px-5 py-2 rounded-lg shadow-md transition ${selectedFilter === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`}
          >
            All Events
          </button>
          <button 
            onClick={() => setSelectedFilter("upcoming")}
            className={`px-5 py-2 rounded-lg shadow-md transition ${selectedFilter === "upcoming" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`}
          >
            Upcoming
          </button>
          <button 
            onClick={() => setSelectedFilter("past")}
            className={`px-5 py-2 rounded-lg shadow-md transition ${selectedFilter === "past" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`}
          >
            Past
          </button>
        </div>
      </div>

      {/* Events Grid */}
      {displayedEvents.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Events Found</h3>
          <p className="text-gray-500">
            {selectedFilter === "all" 
              ? "No events are currently available." 
              : selectedFilter === "upcoming" 
                ? "No upcoming events scheduled." 
                : "No past events found."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {displayedEvents.map((event, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img src={event.image} alt={event.title} className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-4">{event.description}</p>

              {/* Event Details */}
              <div className="grid grid-cols-2 gap-4 text-gray-600 mb-4">
                <div className="flex items-center">
                  <span className="mr-2">📅</span>
                  {format(new Date(event.date), "PPP")}
                </div>
                <div className="flex items-center">
                  <span className="mr-2">⏰</span>
                  {event.time}
                </div>
                <div className="flex items-center">
                  <span className="mr-2">📍</span>
                  {event.location}
                </div>
                <div className="flex items-center">
                  <span className="mr-2">👥</span>
                  {event.attendees} attendees
                </div>
              </div>

              {/* Conditional Buttons */}
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-medium">{event.club}</span>
                
                {selectedFilter !== "past" ? (
                  <button 
                    onClick={() => navigate(`/register-form?club=${encodeURIComponent(event.club)}`)}
                    className="border border-blue-600 text-black font-bold px-4 py-1.5 rounded hover:bg-blue-700 hover:text-white transition"
                  >
                    Register Now!!
                  </button>
                ) : (
                  <div className="space-y-3">
                    <button 
                      className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                    >
                      Give Feedback
                    </button>
                    <button 
                      className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
                    >
                      Upload Photos
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  );
}

export default Events;
