import PublicButton from "../../../components/shared/PublicButton";
import SectionHeader from "../../../components/public_site/SectionHeader";
import { useParams } from "react-router-dom";

const campusSocieties = {
  main: [
    {
      name: "Tech Society",
      description:
        "A hub for tech enthusiasts to collaborate on projects, attend workshops, and participate in hackathons.",
      members: "110+",
    },
    {
      name: "Debate Club",
      description:
        "Sharpen your public speaking and critical thinking skills through regular debates and competitions.",
      members: "90+",
    },
    {
      name: "Sports Club",
      description:
        "Join teams for cricket, football, badminton, and more. Regular tournaments and fitness events.",
      members: "200+",
    },
    {
      name: "Art & Culture Society",
      description:
        "Celebrate creativity with art exhibitions, music, drama, and cultural festivals.",
      members: "70+",
    },
  ],
  law: [
    {
      name: "Moot Court Society",
      description:
        "Practice advocacy and legal argumentation in simulated court settings.",
      members: "60+",
    },
    {
      name: "Legal Aid Club",
      description:
        "Engage in community service by providing legal awareness and support under faculty supervision.",
      members: "40+",
    },
    {
      name: "Debate & Oratory Club",
      description:
        "Focus on legal debates, public speaking, and inter-college competitions.",
      members: "55+",
    },
    {
      name: "Sports & Wellness Club",
      description:
        "Promote physical and mental well-being through sports and wellness activities.",
      members: "80+",
    },
  ],
  hala: [
    {
      name: "Science Society",
      description:
        "Explore science beyond the classroom with experiments, fairs, and guest lectures.",
      members: "50+",
    },
    {
      name: "Entrepreneurship Club",
      description:
        "Develop business ideas, attend workshops, and connect with local entrepreneurs.",
      members: "35+",
    },
    {
      name: "Cultural Club",
      description:
        "Celebrate regional traditions, organize cultural nights, and promote diversity.",
      members: "60+",
    },
    {
      name: "Sports Club",
      description:
        "Participate in a variety of sports and fitness activities tailored for Hala campus students.",
      members: "90+",
    },
  ],
};

const campusHighlights = [
  { title: "Student Center" },
  { title: "Cafeteria" },
  { title: "Gymnasium" },
  { title: "Green Lawns" },
];

const StudentLifePage = () => {
  const { campus } = useParams();
  const campusKey = campus && campusSocieties[campus] ? campus : "main";
  const societies = campusSocieties[campusKey];

  return (
    <div className="min-h-screen bg-white font-sans">
      <section className="relative overflow-hidden bg-college-navy text-white pt-16 sm:pt-24 pb-12 sm:pb-20 rounded-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            badge="Campus Life"
            title={
              <>
                Vibrant <span className="text-college-gold">Student Life</span>
              </>
            }
            description="Step beyond the classroom and immerse yourself in a world of creativity, leadership, and community."
            variant="dark"
            className="max-w-4xl mx-auto !mb-0 "
          />
        </div>
      </section>

      <section className="relative overflow-hidden bg-white text-college-navy py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            badge="Join the Community"
            title="Societies & Clubs"
            description="Discover your passions and build lasting friendships through our diverse range of student-led organizations."
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {societies.map((society) => (
              <div
                key={society.name}
                className="bg-white border border-gray-200 overflow-hidden transition-all duration-300 ease-out h-full flex flex-col items-center text-center p-8 border-t-4 border-t-college-gold rounded-lg shadow-sm hover:shadow-2xl hover:-translate-y-1.5 cursor-pointer group"
              >
                <h3 className="text-2xl font-serif font-bold mb-4 text-college-navy group-hover:text-college-gold transition-colors duration-300">
                  {society.name}
                </h3>
                <p className="text-gray-600 text-sm mb-8 flex-grow leading-relaxed">
                  {society.description}
                </p>
                <div className="w-full space-y-3 mt-auto">
                  <div className="flex items-center justify-center gap-2 py-2 px-4 bg-college-navy/5 rounded-lg text-sm text-college-navy font-bold border border-college-navy/10">
                    {society.members} Members
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Campus Highlights */}
      <section className="relative overflow-hidden bg-college-navy text-white py-14 sm:py-20 md:py-24 lg:py-32 rounded-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="mb-6">
                <span className="inline-flex items-center font-bold tracking-wider uppercase rounded transition-all duration-200 px-3 py-1 text-xs bg-college-gold/10 text-college-gold border border-college-gold/30">
                  Campus Vibes
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 md:mb-6 text-white leading-tight uppercase tracking-wider">
                A Campus <span className="text-college-gold">Full of Life</span>
              </h2>
              <div className="w-20 h-1 bg-college-gold mb-8" />
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                From morning discussions in the green lawns to high-energy
                sports tournaments, our campus provides the perfect ecosystem
                for a balanced and fulfilling student experience.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-10">
                {campusHighlights.map((highlight) => (
                  <div
                    key={highlight.title}
                    className="flex items-center gap-4 group"
                  >
                    <div className="p-3 rounded bg-white/10 group-hover:bg-college-gold transition-colors duration-300 flex-shrink-0">
                      <span className="w-6 h-6 block bg-college-gold group-hover:bg-college-navy rounded-sm" />
                    </div>
                    <span className="font-bold text-white text-base tracking-wide">
                      {highlight.title}
                    </span>
                  </div>
                ))}
              </div>
              <PublicButton
                to="/gallery"
                variant="secondary"
                size="lg"
                shape="slanted"
              >
                Gallery
              </PublicButton>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="overflow-hidden rounded-lg shadow-2xl h-64">
                  <img
                    src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=600"
                    alt="Campus Sports"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="overflow-hidden rounded-lg shadow-2xl h-80">
                  <img
                    src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=600"
                    alt="Campus Hall"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="space-y-6 pt-12">
                <div className="overflow-hidden rounded-lg shadow-2xl h-80">
                  <img
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600"
                    alt="Campus Cafeteria"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="overflow-hidden rounded-lg shadow-2xl h-64">
                  <img
                    src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600"
                    alt="Campus Event"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentLifePage;
