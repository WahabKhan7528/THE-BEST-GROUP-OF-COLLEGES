import PublicButton from "../../../components/shared/PublicButton";
import GSAPReveal from "../../../components/shared/GSAPReveal";
import SectionHeader from "../../../components/public_site/SectionHeader";
import Card from "../../../components/public_site/Card";
import CampusCta from "../../../components/public_site/CampusCta";

const facilitiesData = [
  {
    category: "Academic Infrastructure",
    badge: "Learning Spaces",
    description: "World-class learning environments designed to foster creativity and innovation.",
    items: [
      {
        name: "Smart Classrooms",
        description:
          "Air-conditioned classrooms equipped with multimedia projectors, smart boards, and high-speed internet to facilitate interactive learning.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
      },
      {
        name: "Digital Libraries",
        description:
          "Access to thousands of e-books, journals, and research papers along with quiet study zones and discussion rooms.",
        image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800",
      },
      {
        name: "Science Labs",
        description:
          "State-of-the-art Physics, Chemistry, and Biology laboratories ensuring practical exposure for science students.",
        image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800",
      },
      {
        name: "Computer Centers",
        description:
          "Advanced computing facilities with the latest software development tools and high-performance workstations.",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
      },
    ],
  },
  {
    category: "Student Support & Services",
    badge: "Campus Life",
    description: "Ensuring a comfortable and holistic campus experience for every student.",
    items: [
      {
        name: "Cafeteria",
        description:
          "A hygienic and vibrant space serving nutritious meals and snacks. A perfect spot for students to socialize.",
        image: "https://images.unsplash.com/photo-1567529684892-09290a1b2d05?auto=format&fit=crop&q=80&w=800",
      },
      {
        name: "Sports Complex",
        description:
          "Indoor and outdoor sports facilities including cricket grounds, basketball courts, and a gymnasium.",
        image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=800",
      },
      {
        name: "Medical Centre",
        description:
          "On-campus medical assistance with qualified staff to handle health emergencies and routine checkups.",
        image: "https://images.unsplash.com/photo-1519494026892-50bb7a77a0cd?auto=format&fit=crop&q=80&w=800",
      },
      {
        name: "Transport Service",
        description:
          "Safe and reliable transport fleet covering all major routes of the city for students and faculty.",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800",
      },
    ],
  },
];

const FacilitiesPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Page Header */}
      <section className="relative overflow-hidden bg-college-navy text-white pt-32 pb-20 rounded-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <GSAPReveal>
            <SectionHeader
              badge="Facilities"
              title={<>World-Class <span className="text-college-gold">Facilities</span></>}
              description="We provide state-of-the-art infrastructure and services to ensure a conducive environment for both academic and personal growth."
              variant="dark"
              centered
              className="max-w-4xl mx-auto !mb-0"
            />
          </GSAPReveal>
        </div>
      </section>

      {facilitiesData.map((category, catIdx) => (
        <section
          key={category.category}
          className={`relative overflow-hidden ${catIdx % 2 === 0 ? "bg-white text-college-navy" : "bg-gray-50 text-college-navy"} py-12 md:py-16`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeader
              badge={category.badge}
              title={category.category}
              description={category.description}
              variant="light"
              centered
            />

            <GSAPReveal stagger={0.2} className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {category.items.map((facility) => (
                <Card
                  key={facility.name}
                  className="group"
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={facility.image}
                      alt={facility.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-serif font-bold text-college-navy mb-4">{facility.name}</h3>
                    <p className="text-gray-600 text-base leading-relaxed">{facility.description}</p>
                  </div>
                </Card>
              ))}
            </GSAPReveal>
          </div>
        </section>
      ))}

      <CampusCta
        title="Experience It"
        highlightedWord="Firsthand"
        description="We invite you to visit our campus and see our facilities in person. Our admissions team is ready to show you around."
        primaryButton={{ text: "Schedule a Visit", to: "/contact" }}
        secondaryButton={{ text: "Apply for Admission", to: "/admissions" }}
      />
    </div>
  );
};

export default FacilitiesPage;