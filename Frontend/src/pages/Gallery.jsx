import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "../components/ui/Hero";
import Section from "../components/ui/Section";
import Badge from "../components/ui/Badge";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  Building,
  Calendar,
  Users,
  Laptop,
  ZoomIn
} from "lucide-react";

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);

  const filters = [
    { id: "all", name: "All Photos", icon: Camera, count: 12 },
    { id: "campus", name: "Campus", icon: Building, count: 3 },
    { id: "events", name: "Events", icon: Calendar, count: 3 },
    { id: "students", name: "Students", icon: Users, count: 3 },
    { id: "facilities", name: "Facilities", icon: Laptop, count: 3 },
  ];

  const images = [
    {
      id: 1,
      category: "campus",
      title: "Main Campus Building",
      description: "The iconic main building of our institution",
      src: "https://placehold.co/800x600?text=Campus+Building",
    },
    {
      id: 2,
      category: "events",
      title: "Graduation Ceremony 2024",
      description: "Celebrating the achievements of our graduating class",
      src: "https://placehold.co/800x600?text=Graduation",
    },
    {
      id: 3,
      category: "facilities",
      title: "Law Library",
      description: "Our extensive law library with thousands of resources",
      src: "https://placehold.co/800x600?text=Library",
    },
    {
      id: 4,
      category: "students",
      title: "Student Life",
      description: "Students enjoying campus activities",
      src: "https://placehold.co/800x600?text=Student+Life",
    },
    {
      id: 5,
      category: "campus",
      title: "Sports Ground",
      description: "State-of-the-art sports facilities",
      src: "https://placehold.co/800x600?text=Sports+Ground",
    },
    {
      id: 6,
      category: "facilities",
      title: "Science Laboratory",
      description: "Modern equipped science labs",
      src: "https://placehold.co/800x600?text=Laboratory",
    },
    {
      id: 7,
      category: "events",
      title: "Annual Sports Day",
      description: "Annual inter-campus sports competition",
      src: "https://placehold.co/800x600?text=Sports+Day",
    },
    {
      id: 8,
      category: "students",
      title: "Class Activities",
      description: "Interactive classroom sessions",
      src: "https://placehold.co/800x600?text=Class+Activities",
    },
    {
      id: 9,
      category: "facilities",
      title: "Computer Lab",
      description: "High-tech computer facilities",
      src: "https://placehold.co/800x600?text=Computer+Lab",
    },
    {
      id: 10,
      category: "events",
      title: "Cultural Festival",
      description: "Celebrating diversity through culture",
      src: "https://placehold.co/800x600?text=Cultural+Fest",
    },
    {
      id: 11,
      category: "campus",
      title: "Campus Gardens",
      description: "Beautiful green spaces around campus",
      src: "https://placehold.co/800x600?text=Gardens",
    },
    {
      id: 12,
      category: "students",
      title: "Study Groups",
      description: "Collaborative learning sessions",
      src: "https://placehold.co/800x600?text=Study+Groups",
    },
  ];

  const filteredImages =
    activeFilter === "all"
      ? images
      : images.filter((img) => img.category === activeFilter);



  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage.id
    );
    let newIndex;
    if (direction === "next") {
      newIndex = (currentIndex + 1) % filteredImages.length;
    } else {
      newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    }
    setSelectedImage(filteredImages[newIndex]);
  };

  useEffect(() => {
    if (selectedImage) {
      // Lock scroll
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e) => {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") navigateImage("prev");
        if (e.key === "ArrowRight") navigateImage("next");
      };

      window.addEventListener("keydown", handleKeyDown);

      // Cleanup
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [selectedImage, filteredImages]);



  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero
        title="Photo Gallery"
        description="Explore our campus life, events, and facilities through our photo gallery"
        image="https://placehold.co/1920x800?text=Gallery"
        centered
      />

      {/* Stats */}
      <Section
        className="bg-gradient-to-r from-primary-700 via-primary-600 to-accent-600 -mt-16 relative z-20"
        spacing="default"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { value: "500+", label: "Photos" },
            { value: "50+", label: "Events Covered" },
            { value: "3", label: "Campuses" },
            { value: "10+", label: "Albums" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
              <div className="text-white/80 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Filters */}
      <Section background="white" spacing="default">
        <div className="flex flex-wrap justify-center gap-3">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${isActive
                  ? "bg-gray-900 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                <filter.icon className="w-4 h-4" />
                <span>{filter.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? "bg-white/20" : "bg-gray-200"
                  }`}>
                  {filter.count}
                </span>
              </motion.button>
            );
          })}
        </div>
      </Section>

      {/* Gallery Grid */}
      <Section background="gray" spacing="large">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredImages.map((image, idx) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer bg-white"
                onClick={() => openLightbox(image)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium text-white bg-gray-900/80 backdrop-blur-sm capitalize">
                    {image.category}
                  </div>

                  {/* Zoom Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>

                  {/* Title & Description */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white text-lg font-bold mb-1">
                      {image.title}
                    </h3>
                    <p className="text-gray-300 text-sm line-clamp-2">
                      {image.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600">No photos found</h3>
            <p className="text-gray-500">Try selecting a different category</p>
          </div>
        )}
      </Section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image Lightbox"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("prev");
              }}
              className="absolute left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("next");
              }}
              className="absolute right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.div
              key={selectedImage.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-5xl max-h-[80vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                <Badge className="mb-2 bg-gray-900 text-white border-0 capitalize">
                  {selectedImage.category}
                </Badge>
                <h3 className="text-white text-xl font-bold mb-1">
                  {selectedImage.title}
                </h3>
                <p className="text-gray-300">
                  {selectedImage.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
