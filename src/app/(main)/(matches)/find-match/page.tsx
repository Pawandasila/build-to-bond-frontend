"use client";

import React from "react";
import { MatchHeader, MatchFallback, MatchCard } from "./_components";
import { MatchUser } from "./types";

const page = () => {
  const handleFilterClick = () => {
    // TODO: Implement filter functionality
    console.log("Filter clicked");
  };

  const handleRefresh = () => {
    // TODO: Implement match finding functionality
    console.log("Finding matches...");
  };

  const handleLike = (userId: string) => {
    console.log("Liked user:", userId);
  };

  const handlePass = (userId: string) => {
    console.log("Passed user:", userId);
  };

  // Dummy data for match cards
  const dummyMatches: MatchUser[] = [
    {
      _id: "1",
      firstName: "Emma",
      lastName: "Johnson",
      age: 26,
      profilePicture: "https://i.pinimg.com/736x/79/43/be/7943be8d78be7e10f5c4f270b386755f.jpg",
      bio: "Love hiking, photography, and good coffee. Looking for someone to explore the world with!",
      location: {
        city: "New York",
        country: "USA"
      },
      occupation: "Software Engineer",
      education: "Computer Science, NYU",
      interests: ["Photography", "Hiking", "Coffee", "Travel", "Books"],
      compatibility: 92,
      distance: 5
    },
    {
      _id: "2",
      firstName: "Sarah",
      lastName: "Williams",
      age: 28,
      profilePicture: "https://i.pinimg.com/736x/ee/3c/70/ee3c70861f89fbabf2132e544bee7d9a.jpg",
      bio: "Yoga instructor and food enthusiast. Believe in living life to the fullest!",
      location: {
        city: "Los Angeles",
        country: "USA"
      },
      occupation: "Yoga Instructor",
      education: "Wellness Studies, UCLA",
      interests: ["Yoga", "Cooking", "Music", "Art", "Meditation"],
      compatibility: 87,
      distance: 12
    },
    {
      _id: "3",
      firstName: "Jessica",
      lastName: "Davis",
      profilePicture: "https://i.pinimg.com/736x/51/2f/03/512f03d5b6a387f7e468700dc3aa87fa.jpg",
      age: 24,
      bio: "Artist and dreamer. Love painting, music, and meaningful conversations.",
      location: {
        city: "San Francisco",
        country: "USA"
      },
      occupation: "Graphic Designer",
      education: "Fine Arts, SFAI",
      interests: ["Art", "Music", "Movies", "Dancing", "Nature"],
      compatibility: 89,
      distance: 8
    },
    {
      _id: "4",
      firstName: "Olivia",
      lastName: "Martinez",
      age: 25,
      profilePicture: "https://i.pinimg.com/736x/6b/10/36/6b1036e7ad1571dfc2bc1b1b0f0fa780.jpg",
      bio: "Medical student who loves traveling and trying new cuisines. Always up for an adventure!",
      location: {
        city: "Miami",
        country: "USA"
      },
      occupation: "Medical Student",
      education: "Medicine, University of Miami",
      interests: ["Travel", "Cooking", "Reading", "Swimming", "Volunteering"],
      compatibility: 94,
      distance: 3
    },
    {
      _id: "5",
      firstName: "Sophia",
      lastName: "Chen",
      age: 27,
      profilePicture: "https://i.pinimg.com/1200x/57/38/13/57381305647d560708de3d83a1cfbb36.jpg",
      bio: "Marketing professional with a passion for fitness and outdoor activities. Love weekend getaways!",
      location: {
        city: "Seattle",
        country: "USA"
      },
      occupation: "Marketing Manager",
      education: "Business Administration, UW",
      interests: ["Fitness", "Hiking", "Marketing", "Photography", "Wine Tasting"],
      compatibility: 85,
      distance: 15
    },
    {
      _id: "6",
      firstName: "Ava",
      lastName: "Thompson",
      age: 23,
      profilePicture: "https://i.pinimg.com/736x/70/e5/5a/70e55a1f07ae10ca2c48829173213cb3.jpg",
      bio: "Fashion designer and coffee addict. Looking for someone who appreciates creativity and good vibes!",
      location: {
        city: "Austin",
        country: "USA"
      },
      occupation: "Fashion Designer",
      education: "Fashion Design, Parsons",
      interests: ["Fashion", "Coffee", "Design", "Music Festivals", "Vintage Shopping"],
      compatibility: 91,
      distance: 7
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <MatchHeader onFilterClick={handleFilterClick} />
        
        {/* Match Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyMatches.map((match) => (
            <MatchCard 
              key={match._id}
              user={match}
              onLike={handleLike}
              onPass={handlePass}
            />
          ))}
        </div>
        
        {/* Show fallback if no matches */}
        {dummyMatches.length === 0 && (
          <MatchFallback onRefresh={handleRefresh} />
        )}
      </div>
    </div>
  );
};

export default page;
