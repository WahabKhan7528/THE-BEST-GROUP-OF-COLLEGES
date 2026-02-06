import { Link } from "react-router-dom";
import Card from "../components/ui/Card";
import Section from "../components/ui/Section";

export default function Colleges() {
  const colleges = [
    {
      id: 1,
      name: "Main Campus",
      path: "/campuses/main",
      description:
        "Our flagship campus offering comprehensive academic programs",
      image: "/src/assets/main-campus.jpg",
    },
    {
      id: 2,
      name: "Law College",
      path: "/campuses/law",
      description: "Dedicated to legal education and justice studies",
      image: "/src/assets/law-college.jpg",
    },
    {
      id: 3,
      name: "Hala Campus",
      path: "/campuses/hala",
      description: "Modern campus with state-of-the-art facilities",
      image: "/src/assets/hala-campus.jpg",
    },
  ];

  return (
    <Section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Colleges
          </h1>
          <p className="text-lg text-gray-600">
            Explore our diverse range of colleges and campuses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {colleges.map((college) => (
            <Link to={college.path} key={college.id}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg mb-4 flex items-center justify-center text-white text-center p-4">
                  <span className="text-lg font-semibold">{college.name}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {college.name}
                </h3>
                <p className="text-gray-600 mb-4">{college.description}</p>
                <span className="text-blue-600 font-semibold hover:text-blue-700">
                  Learn More →
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}
