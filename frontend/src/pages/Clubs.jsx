import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Clubs() {
  const navigate = useNavigate();
  
  // 🔹 State for handling form visibility and selected club
  const [selectedClub, setSelectedClub] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [clubs, setClubs] = useState([]);

  const clubImages = [
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800",
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800"
  ];

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/clubs");
        const clubsData = response.data.clubs.map((club, index) => ({
          ...club,
          image: clubImages[index % clubImages.length] // Assign a static image
        }));
        setClubs(clubsData);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };
    fetchClubs();
  }, []);

  // 🔹 Function to open the Join Club form
  const openForm = (clubName) => {
    setSelectedClub(clubName);
    setIsFormOpen(true);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Clubs</h1>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {clubs.map((club, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => navigate(`/clubs/${club.name.replace(/\s+/g, '-').toLowerCase()}`)}
          >
            <img src={club.image} alt={club.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{club.name}</h3>
              <p className="text-gray-600 mb-4">{club.description}</p>
              <div className="flex items-center text-gray-600 justify-between">
                <span>👨‍🏫 {club.teacher}</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering club details redirection
                    openForm(club.name);
                  }}
                  className="font-bold text-green-600 text-xl hover:text-blue-500 transition-all duration-200"
                >
                  🤝 Join Club!
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Join Club Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-black p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Join {selectedClub}</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Student Name" className="w-full p-2 border rounded" required />
              <input type="email" placeholder="Email" className="w-full p-2 border rounded" required />
              <input type="tel" placeholder="Phone Number" className="w-full p-2 border rounded" required />
              
              <select className="w-full p-2 border rounded" required>
                <option value="">Select Year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>

              <select className="w-full p-2 border rounded" required>
                <option value="">Select Branch</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="MECH">MECH</option>
              </select>

              <input type="text" placeholder="Class" className="w-full p-2 border rounded" required />
              <input type="file" className="w-full p-2 border rounded" required />
              <textarea placeholder="Why should we take you?" className="w-full p-2 border rounded" rows="3" required></textarea>

              <div className="flex justify-between">
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Submit</button>
                <button type="button" onClick={() => setIsFormOpen(false)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Clubs;
