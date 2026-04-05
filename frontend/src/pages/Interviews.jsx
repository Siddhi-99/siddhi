import React from "react";
import { format } from "date-fns";

function Interviews() {
  const interviews = [
    {
      position: "Tech Lead",
      club: "Tech Club",
      date: "2025-03-15",
      time: "14:00",
      duration: "45 mins",
      meetLink: "https://meet.google.com/example-tech",
    },
    {
      position: "Event Coordinator",
      club: "Cultural Club",
      date: "2025-03-16",
      time: "15:30",
      duration: "30 mins",
      meetLink: "https://meet.google.com/example-cultural",
    },
    {
      position: "Debate Captain",
      club: "Debate Club",
      date: "2025-03-17",
      time: "10:00",
      duration: "60 mins",
      meetLink: "https://meet.google.com/example-debate",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Interview Schedule</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {interviews.map((interview, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            
            {/* Position Tag */}
            <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold inline-block mb-4">
              {interview.position}
            </div>

            {/* Club Name */}
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{interview.club}</h3>

            {/* Date & Time */}
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center">
                <span className="mr-2">📅</span>
                {format(new Date(interview.date), "PPP")}
              </div>
              <div className="flex items-center">
                <span className="mr-2">⏰</span>
                {interview.time} ({interview.duration})
              </div>
            </div>

            {/* Meet Link */}
            <div className="mt-4">
              <p className="text-gray-700 font-medium">🔗 Meet Link:</p>
              <a 
                href={interview.meetLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {interview.meetLink}
              </a>
            </div>

            {/* Separator & Time Info */}
            <div className="mt-4 pt-4 border-t border-gray-300">
              <p className="text-gray-600">
                Time until interview: <span className="font-semibold text-black">Interview time!</span>
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Interviews;
