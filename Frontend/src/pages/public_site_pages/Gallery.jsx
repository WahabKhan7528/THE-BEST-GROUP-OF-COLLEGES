import { useState, useEffect } from "react";

import Section from "../../components/public_site/Section";
import Badge from "../../components/public_site/Badge";
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
      src: "https://placehold.co/800x600/E0F2FE/E0F2FE", // sky-100
    },
    {
      id: 2,
      category: "events",
      title: "Graduation Ceremony 2024",
      description: "Celebrating the achievements of our graduating class",
      src: "https://placehold.co/800x600/DBEAFE/DBEAFE", // blue-100
    },
    {
      id: 3,
      category: "facilities",
      title: "Law Library",
      description: "Our extensive law library with thousands of resources",
      src: "https://placehold.co/800x600/E0F2FE/E0F2FE", // sky-100
    },
    {
      id: 4,
      category: "students",
      title: "Student Life",
      description: "Students enjoying campus activities",
      src: "https://placehold.co/800x600/EFF6FF/EFF6FF", // blue-50
    },
    {
      id: 5,
      category: "campus",
      title: "Sports Ground",
      description: "State-of-the-art sports facilities",
      src: "https://placehold.co/800x600/DBEAFE/DBEAFE", // blue-100
    },
    {
      id: 6,
      category: "facilities",
      title: "Science Laboratory",
      description: "Modern equipped science labs",
      src: "https://placehold.co/800x600/E0F2FE/E0F2FE", // sky-100
    },
    {
      id: 7,
      category: "events",
      title: "Annual Sports Day",
      description: "Annual inter-campus sports competition",
      src: "https://placehold.co/800x600/EFF6FF/EFF6FF", // blue-50
    },
    {
      id: 8,
      category: "students",
      title: "Class Activities",
      description: "Interactive classroom sessions",
      src: "https://placehold.co/800x600/DBEAFE/DBEAFE", // blue-100
    },
    {
      id: 9,
      category: "facilities",
      title: "Computer Lab",
      description: "High-tech computer facilities",
      src: "https://placehold.co/800x600/E0F2FE/E0F2FE", // sky-100
    },
    {
      id: 10,
      category: "events",
      title: "Cultural Festival",
      description: "Celebrating diversity through culture",
      src: "https://placehold.co/800x600/EFF6FF/EFF6FF", // blue-50
    },
    {
      id: 11,
      category: "campus",
      title: "Campus Gardens",
      description: "Beautiful green spaces around campus",
      src: "https://placehold.co/800x600/DBEAFE/DBEAFE", // blue-100
    },
    {
      id: 12,
      category: "students",
      title: "Study Groups",
      description: "Collaborative learning sessions",
      src: "https://placehold.co/800x600/E0F2FE/E0F2FE", // sky-100
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
      {/* Filters */}
      <Section background="white" spacing="default">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-8xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="text-gradient">PHOTO GALLERY</span>
          </h2>
          <p className="text-gray-600">Explore our campus life, events, and facilities through our photo gallery</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all hover:scale-[1.02] active:scale-[0.98] ${isActive
                  ? "bg-primary-600 text-white shadow-lg"
                  : "bg-primary-100 text-gray-600 hover:bg-primary-200"
                  }`}
              >
                <filter.icon className="w-4 h-4" />
                <span>{filter.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? "bg-white/20" : "bg-gray-200"
                  }`}>
                  {filter.count}
                </span>
              </button>
            );
          })}
        </div>
      </Section>

      {/* Gallery Grid */}
      <Section background="gray" spacing="large">
        <div
          key={activeFilter}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredImages.map((image, idx) => (
            <div
              key={image.id}
              className="group flex flex-col overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 bg-white cursor-pointer border border-gray-100"
              onClick={() => openLightbox(image)}
            >
              {/* Image Section */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Hover Overlay with Zoom Icon */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                    <ZoomIn className="w-6 h-6 text-white" />
                  </div>
                </div>
                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold text-gray-700 bg-white/95 backdrop-blur-sm capitalize shadow-md">
                  {image.category}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5 flex flex-col flex-grow bg-blue-50/50 z-10 border-t-2 border-primary-100/30 group-hover:bg-blue-100/50 transition-colors duration-300">
                <h3 className="text-gray-900 text-lg font-bold mb-2 group-hover:text-primary-600 transition-colors">
                  {image.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {image.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600">No photos found</h3>
            <p className="text-gray-500">Try selecting a different category</p>
          </div>
        )}
      </Section>

      {/* Lightbox */}
      {selectedImage && (
        <div
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
          <div
            key={selectedImage.id}
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
              <Badge variant="solid" className="mb-2 bg-gray-900 capitalize">
                {selectedImage.category}
              </Badge>
              <h3 className="text-white text-xl font-bold mb-1">
                {selectedImage.title}
              </h3>
              <p className="text-gray-300">
                {selectedImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
