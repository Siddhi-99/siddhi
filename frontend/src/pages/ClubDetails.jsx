import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ClubDetails = () => {
  const { clubName } = useParams();
  const navigate = useNavigate();
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Convert URL-friendly name back to original name
  const originalClubName = clubName.replace(/-/g, " ");

  useEffect(() => {
    const fetchClubDetails = async () => {
      try {
        setLoading(true);
        // First, get all clubs to find the one with matching name
        const response = await axios.get("http://localhost:8000/clubs");
        const clubs = response.data.clubs;
        
        // Find the club with matching name (case-insensitive)
        const foundClub = clubs.find(
          c => c.name.toLowerCase() === originalClubName.toLowerCase()
        );
        
        if (foundClub) {
          setClub(foundClub);
        } else {
          setError("Club not found");
        }
      } catch (error) {
        console.error("Error fetching club details:", error);
        setError("Failed to load club details");
      } finally {
        setLoading(false);
      }
    };

    fetchClubDetails();
  }, [clubName, originalClubName]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-cover bg-center flex items-center justify-center px-6 py-10"
           style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?club,event')" }}>
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-4xl w-full text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-xl text-gray-600">Loading club details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-cover bg-center flex items-center justify-center px-6 py-10"
           style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?club,event')" }}>
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-4xl w-full text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-xl text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/clubs')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Back to Clubs
          </button>
        </div>
      </div>
    );
  }

  // No club found
  if (!club) {
    return (
      <div className="min-h-screen bg-cover bg-center flex items-center justify-center px-6 py-10"
           style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?club,event')" }}>
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-4xl w-full text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Club Not Found</h1>
          <p className="text-xl text-gray-600 mb-6">The club you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/clubs')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Back to Clubs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-6 py-10"
      style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?club,event')" }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-4xl w-full">
        {/* Back Button */}
        <button
          onClick={() => navigate('/clubs')}
          className="mb-6 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300"
        >
          ← Back to Clubs
        </button>

        {/* Club Name */}
        <h1 className="text-5xl font-extrabold text-gray-900 text-center capitalize">
          {club.name}
        </h1>

        {/* Club Photos Section */}
        {club.clubPhotos && club.clubPhotos.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {club.clubPhotos.map((photo, index) => (
              <img 
                key={index}
                src={photo} 
                className="rounded-lg shadow-md w-full h-48 object-cover" 
                alt={`Club photo ${index + 1}`}
                onError={(e) => {
                  e.target.src = `https://source.unsplash.com/random/400x300?club&${index}`;
                }}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <img 
              src="https://source.unsplash.com/random/400x300?club" 
              className="rounded-lg shadow-md w-full h-48 object-cover" 
              alt="Club" 
            />
            <img 
              src="https://source.unsplash.com/random/400x300?event" 
              className="rounded-lg shadow-md w-full h-48 object-cover" 
              alt="Event" 
            />
            <img 
              src="https://source.unsplash.com/random/400x300?team" 
              className="rounded-lg shadow-md w-full h-48 object-cover" 
              alt="Team" 
            />
          </div>
        )}

        {/* Club Description */}
        <p className="mt-6 text-xl text-gray-800 text-center leading-relaxed">
          {club.description}
        </p>

        {/* Achievements Section */}
        {club.achievements && (
          <div className="mt-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900">🏆 Achievements</h2>
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
              <p className="text-lg text-gray-700">{club.achievements}</p>
            </div>
            <button
              onClick={() => navigate(`/clubs/${clubName}/achievements`)}
              className="mt-4 px-6 py-2 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              View All Achievements
            </button>
          </div>
        )}

        {/* Objectives Section */}
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center">🎯 Objectives</h2>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-lg text-gray-700">{club.objectives}</p>
          </div>
        </div>

        {/* Club Leadership Section */}
        <div className="mt-10">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">👥 Club Leadership</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Teacher/Coordinator */}
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Faculty Advisor</h3>
              <div className="flex flex-col items-center">
                <div className="relative">
                  {club.teacherPhoto ? (
                    <img
                      src={club.teacherPhoto}
                      className="w-24 h-24 rounded-full shadow-lg border-4 border-blue-500 object-cover"
                      alt="Faculty Advisor"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className={`w-24 h-24 rounded-full shadow-lg border-4 border-blue-500 bg-gray-300 flex items-center justify-center ${club.teacherPhoto ? 'hidden' : 'flex'}`}
                    style={{ display: club.teacherPhoto ? 'none' : 'flex' }}
                  >
                    <span className="text-2xl">👨‍🏫</span>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-xl font-semibold text-gray-900">{club.teacher}</h4>
                  <p className="text-lg text-gray-600">Faculty Advisor</p>
                </div>
              </div>
            </div>

            {/* Head Student */}
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Head Student</h3>
              <div className="flex flex-col items-center">
                <div className="relative">
                  {club.headPhoto ? (
                    <img
                      src={club.headPhoto}
                      className="w-24 h-24 rounded-full shadow-lg border-4 border-green-500 object-cover"
                      alt="Head Student"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className={`w-24 h-24 rounded-full shadow-lg border-4 border-green-500 bg-gray-300 flex items-center justify-center ${club.headPhoto ? 'hidden' : 'flex'}`}
                    style={{ display: club.headPhoto ? 'none' : 'flex' }}
                  >
                    <span className="text-2xl">👨‍🎓</span>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-xl font-semibold text-gray-900">{club.headStudent}</h4>
                  <p className="text-lg text-gray-600">Head Student</p>
                </div>
              </div>
            </div>

            {/* Co-Head */}
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Co-Head</h3>
              <div className="flex flex-col items-center">
                <div className="relative">
                  {club.coHeadPhoto ? (
                    <img
                      src={club.coHeadPhoto}
                      className="w-24 h-24 rounded-full shadow-lg border-4 border-purple-500 object-cover"
                      alt="Co-Head"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className={`w-24 h-24 rounded-full shadow-lg border-4 border-purple-500 bg-gray-300 flex items-center justify-center ${club.coHeadPhoto ? 'hidden' : 'flex'}`}
                    style={{ display: club.coHeadPhoto ? 'none' : 'flex' }}
                  >
                    <span className="text-2xl">👩‍🎓</span>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-xl font-semibold text-gray-900">{club.coHead}</h4>
                  <p className="text-lg text-gray-600">Co-Head</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Join Club Button */}
        <div className="mt-10 text-center">
          <button
            onClick={() => {
              // You can implement join club functionality here
              
            }}
            className="px-8 py-3 bg-green-600 text-white text-xl font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300"
          >
            🤝 Join This Club
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
