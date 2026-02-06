import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", name: "All" },
    { id: "campus", name: "Campus" },
    { id: "events", name: "Events" },
    { id: "students", name: "Students" },
    { id: "facilities", name: "Facilities" },
  ];

  const images = [
    {
      id: 1,
      category: "campus",
      title: "Main Campus Building",
      src: "https://placehold.co/800x600?text=Campus+Building",
    },
    {
      id: 2,
      category: "events",
      title: "Graduation Ceremony 2024",
      src: "https://placehold.co/800x600?text=Graduation",
    },
    {
      id: 3,
      category: "facilities",
      title: "Law Library",
      src: "https://placehold.co/800x600?text=Library",
    },
    {
      id: 4,
      category: "students",
      title: "Student Life",
      src: "https://placehold.co/800x600?text=Student+Life",
    },
    {
      id: 5,
      category: "campus",
      title: "Sports Ground",
      src: "https://placehold.co/800x600?text=Sports+Ground",
    },
    {
      id: 6,
      category: "facilities",
      title: "Science Laboratory",
      src: "https://placehold.co/800x600?text=Laboratory",
    },
    {
      id: 7,
      category: "events",
      title: "Annual Sports Day",
      src: "https://placehold.co/800x600?text=Sports+Day",
    },
    {
      id: 8,
      category: "students",
      title: "Class Activities",
      src: "https://placehold.co/800x600?text=Class+Activities",
    },
    {
      id: 9,
      category: "facilities",
      title: "Computer Lab",
      src: "https://placehold.co/800x600?text=Computer+Lab",
    },
  ];

  const filteredImages =
    activeFilter === "all"
      ? images
      : images.filter((img) => img.category === activeFilter);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20 pt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Gallery</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our campus life, events, and facilities through our photo
              gallery
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors
                  ${
                    activeFilter === filter.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredImages.map((image, idx) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group relative overflow-hidden rounded-lg shadow-lg bg-white"
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white text-lg font-bold">
                        {image.title}
                      </h3>
                      <p className="text-gray-300 text-sm capitalize">
                        {image.category}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg mb-8">
            Be part of our vibrant academic community and create your own
            success story.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
            Apply Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
