import Hero from "../../../components/ui/Hero";
import Section from "../../../components/ui/Section";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import { Users, Calendar, MapPin, Activity, Music, Mic, Palette, Dribbble, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const StudentLifePage = () => {
  const societies = [
    {
      name: "Debating Club",
      description: "Sharpen your public speaking and argumentation skills. Join us for weekly debates and national competitions.",
      members: 120,
      icon: Mic,
      color: "red",
      meeting: "Fridays, 4 PM"
    },
    {
      name: "Literary Society",
      description: "A haven for book lovers, writers, and poets. We organize poetry slams, book readings, and writing workshops.",
      members: 150,
      icon: Users,
      color: "blue",
      meeting: "Wednesdays, 3 PM"
    },
    {
      name: "Arts & Culture",
      description: "Celebrating creativity through painting, drama, and photography. Showcase your talent in our annual exhibitions.",
      members: 200,
      icon: Palette,
      color: "sky",
      meeting: "Tuesdays, 2 PM"
    },
    {
      name: "Sports Committee",
      description: "Promoting physical fitness and team spirit. Organizing inter-departmental leagues and sports galas.",
      members: 300,
      icon: Dribbble,
      color: "cyan",
      meeting: "Daily Training"
    },
  ];

  const campusHighlights = [
    {
      title: "Student Center",
      description: "The heart of student activities. A place to relax, play indoor games, and socialize.",
      icon: Activity
    },
    {
      title: "Cafeteria",
      description: "Serving delicious and hygienic food. The perfect spot for lunch breaks and coffee chats.",
      icon: Music
    },
    {
      title: "Gymnasium",
      description: "Fully equipped gym for fitness enthusiasts. Professional trainers available.",
      icon: Dribbble
    },
    {
      title: "Green Lawns",
      description: "Lush green spaces perfect for outdoor study sessions and relaxation.",
      icon: MapPin
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Section spacing="large">
        <Section.Header
          title="Student Societies & Clubs"
          description="Find your tribe. Pursue your passions outside the classroom."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {societies.map((society, idx) => (
            <motion.div
              key={society.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="h-full flex flex-col text-center items-center p-6 border-t-4 rounded-3xl border-t-primary-500">
                <div className="p-4 rounded-full bg-primary-100 text-primary-600 mb-4 ring-8 ring-primary-50/50">
                  <society.icon className="w-8 h-8" />
                </div>

                <h3 className="text-xl font-bold mb-2 text-gray-900">{society.name}</h3>
                <p className="text-gray-600 text-sm mb-6 flex-grow">{society.description}</p>

                <div className="w-full space-y-2">
                  <Badge variant="secondary" className="w-full justify-center py-1">
                    <Users className="w-3 h-3 mr-1" /> {society.members} Members
                  </Badge>
                  <Badge variant="outline" className="w-full justify-center py-1 text-xs">
                    <Calendar className="w-3 h-3 mr-1" /> {society.meeting}
                  </Badge>
                </div>

                <Button size="sm" variant="ghost" className="mt-4 text-blue-600 hover:text-blue-800 p-0 h-auto hover:bg-transparent" onClick={() => { }}>
                  Join Now <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="bg-gradient-to-r from-primary-700 via-primary-600 to-accent-600 text-white overflow-hidden relative">
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="bg-primary-500/20 text-primary-200 border-primary-400/30 mb-4">Campus Vibes</Badge>
            <h2 className="text-4xl font-bold mb-6">A Campus That Never Sleeps</h2>
            <p className="text-blue-100 text-lg leading-relaxed mb-8">
              From early morning study sessions in the library to late-night sports matches, our campus is always buzzing with energy. Discover the perfect balance between academic rigor and social fun.
            </p>
            <ul className="grid grid-cols-2 gap-4 mb-8">
              {campusHighlights.map(highlight => (
                <li key={highlight.title} className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/10">
                    <highlight.icon className="w-5 h-5 text-cyan-300" />
                  </div>
                  <span className="font-semibold">{highlight.title}</span>
                </li>
              ))}
            </ul>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900" onClick={() => { }}>
              Explore Gallery
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-lg transform translate-y-8 aspect-video group">
                <iframe
                  className="w-full h-full object-cover"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&controls=0&rel=0" // Placeholder video
                  title="Campus Life Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors pointer-events-none" />
              </div>
              <img src="https://placehold.co/400x400?text=Sports" alt="Campus Sports" className="rounded-3xl shadow-lg" />
            </motion.div>
            <motion.div
              initial={{ y: -20 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 pt-8"
            >
              <img src="https://placehold.co/400x400?text=Cafeteria" alt="Campus Cafeteria" className="rounded-3xl shadow-lg" />
              <img src="https://placehold.co/400x500?text=Concert" alt="Campus Concert" className="rounded-3xl shadow-lg" />
            </motion.div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default StudentLifePage;
