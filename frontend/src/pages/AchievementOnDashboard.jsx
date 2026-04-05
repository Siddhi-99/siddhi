import React from "react";

const Achievements = () => {
  const achievements = [
    {
      club: "Tech Club",
      image: "https://source.unsplash.com/300x200/?technology",
      description: "Won 1st place in AI Hackathon 2025.",
    },
    {
      club: "Cultural Club",
      image: "https://source.unsplash.com/300x200/?culture",
      description: "Best Performance Award in Inter-College Fest.",
    },
    {
      club: "Debate Club",
      image: "https://source.unsplash.com/300x200/?debate",
      description: "Secured National Debate Championship.",
    },
    {
      club: "Sports Club",
      image: "https://source.unsplash.com/300x200/?sports",
      description: "Winner of Annual Sports Meet 2025.",
    },
    {
      club: "Photography Club",
      image: "https://source.unsplash.com/300x200/?photography",
      description: "Best Photo Award in National Contest.",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">🏆 Club Achievements</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img src={achievement.image} alt={achievement.club} className="w-full h-48 object-cover" />
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{achievement.club}</h3>
              <p className="text-gray-600">{achievement.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
