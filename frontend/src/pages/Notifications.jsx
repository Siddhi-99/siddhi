import React, { useState } from "react";

function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "event",
      title: "New Event: Tech Talk",
      message: "Tech Club is organizing a Tech Talk on AI in 2025.",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "club",
      title: "Club Application Accepted",
      message: "Your application to join the Tech Club has been accepted.",
      time: "1 day ago",
    },
    {
      id: 3,
      type: "interview",
      title: "Interview Scheduled",
      message: "Your interview for Tech Lead position has been scheduled.",
      time: "2 days ago",
    },
  ]);

  const [reminders, setReminders] = useState([
    {
      id: 1,
      title: "Tech Talk",
      datetime: "2025-03-15 at 14:00",
    },
    {
      id: 2,
      title: "Cultural Club Meeting",
      datetime: "2025-03-16 at 15:30",
    },
  ]);

  const [showPopup, setShowPopup] = useState(false);

  // Function to mark a single notification as read
  const markAsRead = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  // Function to remove a single reminder
  const removeReminder = (id) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  // Function to clear all notifications and reminders
  const markAllAsRead = () => {
    setNotifications([]);
    setReminders([]);
    setShowPopup(true);

    // Hide popup after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <div className="p-8">
      {/* Pop-up Notification */}
      {showPopup && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          ✅ You have no new notifications or reminders!
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
        <button
          onClick={markAllAsRead}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Mark all as read
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Notifications List */}
        <div className="md:col-span-2 space-y-4">
          {notifications.length === 0 ? (
            <p className="text-gray-600 text-lg text-center">No new notifications 🎉</p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="bg-white p-5 rounded-lg shadow-md flex items-start border-l-4 border-purple-500 hover:shadow-lg transition"
              >
                {/* Icon */}
                <div className="mr-4 text-purple-600 text-2xl">
                  {notification.type === "event" && "📅"}
                  {notification.type === "club" && "👥"}
                  {notification.type === "interview" && "📋"}
                </div>

                {/* Notification Content */}
                <div className="flex-1">
                  <h3 className="text-gray-900 font-medium mb-1">{notification.title}</h3>
                  <p className="text-gray-600">{notification.message}</p>
                  <p className="text-sm text-gray-500 mt-2">{notification.time}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="text-blue-600 hover:underline"
                  >
                    Mark as read
                  </button>
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="text-gray-400 hover:text-red-500 text-xl leading-none"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Upcoming Reminders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Reminders</h2>
          {reminders.length === 0 ? (
            <p className="text-gray-600 text-center">No upcoming reminders 🎉</p>
          ) : (
            <div className="space-y-4">
              {reminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="flex justify-between items-center border-b pb-3 last:border-b-0"
                >
                  <div>
                    <h3 className="text-gray-900 mb-1">{reminder.title}</h3>
                    <p className="text-gray-600">{reminder.datetime}</p>
                  </div>
                  <span className="text-gray-400 text-2xl">🔔</span>
                  <button
                    onClick={() => removeReminder(reminder.id)}
                    className="text-gray-400 hover:text-red-500 text-xl leading-none"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
