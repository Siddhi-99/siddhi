import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate for navigation
import { FiUsers, FiCalendar, FiBell, FiAward } from "react-icons/fi";
import { format } from "date-fns";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate(); // ✅ Initialize useNavigate

  const [userData, setUserData] = useState(null);

  // Fetch user data on component mount
  useEffect(() => {
    axios.get("http://localhost:3000/get-user")
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const stats = [
    { title: "Joined Clubs", count: 5, icon: <FiUsers />, color: "bg-blue-500", path: "/Clubs" },
    { title: "Upcoming Events", count: 3, icon: <FiCalendar />, color: "bg-green-500", path: "/Events" },
    { title: "Notifications", count: 12, icon: <FiBell />, color: "bg-yellow-500", path: "/Notifications" },
    { title: "Achievements", count: 8, icon: <FiAward />, color: "bg-purple-500", path: "/Achievements" },
  ];

  const upcomingEvents = [
    { title: "Tech Talk: AI in 2025", club: "Tech Club", date: "2025-03-15", time: "14:00" },
    { title: "Annual Cultural Fest", club: "Cultural Club", date: "2025-03-20", time: "10:00" },
    { title: "Debate Competition", club: "Debate Club", date: "2025-03-25", time: "15:30" },
  ];

  const recentActivity = [
    { action: "Joined Tech Club", time: "2 days ago", color: "bg-blue-400" },
    { action: "Registered for Tech Talk", time: "3 days ago", color: "bg-green-400" },
    { action: "Earned Achievement", time: "1 week ago", color: "bg-purple-400" },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Section with Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg flex items-center cursor-pointer hover:shadow-xl transition-all"
            onClick={() => navigate(stat.path)} // ✅ Navigate on Click
          >
            <div className={`w-12 h-12 ${stat.color} text-white flex items-center justify-center rounded-full text-xl`}>
              {stat.icon}
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-800">{stat.count}</h3>
              <p className="text-gray-600">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Events & Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📅 Upcoming Events</h2>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="p-4 bg-gray-100 rounded-lg">
                <h3 className="font-medium text-gray-800">{event.title}</h3>
                <p className="text-blue-500">{event.club}</p>
                <p className="text-gray-600">{format(new Date(event.date), "PPP")} at {event.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🔔 Recent Activity</h2>
          <div className="relative space-y-4">
            {/* Timeline line */}
            <div className="absolute left-5 top-0 bottom-6 w-[2px] bg-gray-300"></div>

            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start relative">
                {/* Timeline dot */}
                <div className={`w-3 h-3 ${activity.color} rounded-full mr-4`}></div>
                
                {/* Activity content */}
                <div>
                  <p className="font-medium text-gray-800">{activity.action}</p>
                  <p className="text-gray-600 text-sm">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
