import Section from "../../../components/public_site/Section";
import Card from "../../../components/public_site/Card";
import Button from "../../../components/shared/Button";
import { Wifi, Library, Coffee, Stethoscope, Dumbbell, Monitor, FlaskConical, Bus, ArrowRight } from "lucide-react";


const FacilitiesPage = () => {
  const facilities = [
    {
      category: "Academic Infrastructure",
      description: "World-class learning environments designed to foster creativity and innovation.",
      items: [
        {
          name: "Smart Classrooms",
          description: "Air-conditioned classrooms equipped with multimedia projectors, smart boards, and high-speed internet to facilitate interactive learning.",
          icon: Monitor,
          color: "blue",
          image: "https://placehold.co/600x400?text=Classroom"
        },
        {
          name: "Digital Libraries",
          description: "Access to thousands of e-books, journals, and research papers along with quiet study zones and discussion rooms.",
          icon: Library,
          color: "amber",
          image: "https://placehold.co/600x400?text=Library"
        },
        {
          name: "Science Labs",
          description: "State-of-the-art Physics, Chemistry, and Biology laboratories ensuring practical exposure for science students.",
          icon: FlaskConical,
          color: "emerald",
          image: "https://placehold.co/600x400?text=Science+Lab"
        },
        {
          name: "Computer Centers",
          description: "Advanced computing facilities with the latest software development tools and high-performance workstations.",
          icon: Wifi,
          color: "purple",
          image: "https://placehold.co/600x400?text=Computer+Lab"
        },
      ],
    },
    {
      category: "Student Support & Services",
      description: "Ensuring a comfortable and holistic campus experience for every student.",
      items: [
        {
          name: "Cafeteria",
          description: "A hygienic and vibrant space serving nutritious meals and snacks. A perfect spot for students to socialize.",
          icon: Coffee,
          color: "orange",
          image: "https://placehold.co/600x400?text=Cafeteria"
        },
        {
          name: "Sports Complex",
          description: "Indoor and outdoor sports facilities including cricket grounds, basketball courts, and a gymnasium.",
          icon: Dumbbell,
          color: "red",
          image: "https://placehold.co/600x400?text=Sports"
        },
        {
          name: "Medical Centre",
          description: "On-campus medical assistance with qualified staff to handle health emergencies and routine checkups.",
          icon: Stethoscope,
          color: "cyan",
          image: "https://placehold.co/600x400?text=Medical"
        },
        {
          name: "Transport Service",
          description: "Safe and reliable transport fleet covering all major routes of the city for students and faculty.",
          icon: Bus,
          color: "yellow",
          image: "https://placehold.co/600x400?text=Transport"
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {facilities.map((category, catIdx) => (
        <Section key={category.category} background={catIdx % 2 !== 0 ? "gray" : "white"} spacing="large">
          <Section.Header
            title={category.category}
            description={category.description}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {category.items.map((facility, idx) => (
              <div
                key={facility.name}
              >
                <Card hover className="h-full overflow-hidden p-0 rounded-2xl md:rounded-3xl">
                  <div className="h-56 md:h-64 overflow-hidden relative group">
                    <img
                      src={facility.image}
                      alt={facility.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-end p-4 md:p-6">
                      <div className="text-white">
                        <div className="p-1.5 md:p-2 rounded-xl md:rounded-2xl bg-primary-500/30 backdrop-blur-md inline-flex items-center justify-center mb-2">
                          <facility.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </div>
                        <h3 className="text-xl md:text-2xl text-white font-bold">{facility.name}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 md:p-6">
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      {facility.description}
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </Section>
      ))}

      <Section className="text-center">
        <div
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Experience It Yourself</h2>
          <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
            We invite you to visit our campus and see our facilities firsthand. Book a guided tour today.
          </p>
          <Button size="lg" variant="primary" className="border-white hover:bg-primary-50" to="/contact">
            Schedule a Visit <ArrowRight />
          </Button>
        </div>
      </Section>
    </div>
  );
};

export default FacilitiesPage;
