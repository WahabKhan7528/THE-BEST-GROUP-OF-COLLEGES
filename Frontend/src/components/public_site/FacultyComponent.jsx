import { useState, useMemo } from "react";

import { Mail, GraduationCap, Award } from "lucide-react";
import Section from "./Section";
import Card from "./Card";
import Button from "../shared/Button";
import { facultyData } from "../../data/facultyMembersData";

const FacultyComponent = ({ filterCampus }) => {
  const [activeTab, setActiveTab] = useState("All Campuses");

  // Get unique campuses for tabs
  const campuses = useMemo(() => {
    return ["All Campuses", "Main Campus", "Law College", "Hala Campus"];
  }, []);

  // Filter data logic
  const displayedData = useMemo(() => {
    let data = facultyData;

    // 1. If filterCampus prop exists, show ONLY that campus data
    if (filterCampus) {
      return { [filterCampus]: data.filter((f) => f.campus === filterCampus) };
    }

    // 2. If viewing via Tab system
    if (activeTab === "All Campuses") {
      // Group by Campus
      return data.reduce((acc, faculty) => {
        if (!acc[faculty.campus]) {
          acc[faculty.campus] = [];
        }
        acc[faculty.campus].push(faculty);
        return acc;
      }, {});
    } else {
      // Show single campus
      return { [activeTab]: data.filter((f) => f.campus === activeTab) };
    }
  }, [filterCampus, activeTab]);

  return (
    <div className="min-h-screen bg-white">
      {/* Show Tabs ONLY if not filtering by specific campus prop */}
      {!filterCampus && (
        <Section
          className="bg-neutral-50 border-b border-gray-200"
          spacing="small"
        >
          {/* Mobile: Dropdown */}
          <div className="md:hidden flex justify-center px-4">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full max-w-md px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm"
            >
              {campuses.map((campus) => (
                <option key={campus} value={campus}>
                  {campus}
                </option>
              ))}
            </select>
          </div>

          {/* Desktop: Tabs */}
          <div className="hidden md:flex justify-center">
            <div className="inline-flex p-1 bg-white rounded-2xl border border-gray-200 shadow-sm">
              {campuses.map((campus) => (
                <button
                  key={campus}
                  onClick={() => setActiveTab(campus)}
                  className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === campus
                      ? "bg-primary-600 text-white shadow-md"
                      : "text-gray-500 hover:text-primary-600 hover:bg-gray-50"
                    }`}
                >
                  {campus}
                </button>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* Render Faculty Groups (Key will be Campus Name) */}
      {Object.entries(displayedData).map(([campusName, members], cIdx) => (
        <Section
          key={campusName}
          className={cIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}
          spacing="large"
        >
          {/* Show header only if showing All Campuses view, to separate the sections */}
          {!filterCampus && activeTab === "All Campuses" && (
            <Section.Header
              title={campusName}
              description={`Distinguished faculty members of ${campusName}.`}
              centered
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {members.map((faculty) => (
              <div key={faculty.id}>
                <Card
                  hover
                  className="h-full flex flex-col items-center text-center p-5 md:p-6 rounded-2xl md:rounded-3xl border-t-3 md:border-t-4 border-t-primary-600"
                >
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden mb-5 md:mb-6 border-3 md:border-4 border-primary-50 shadow-inner">
                    <img
                      src={faculty.image}
                      alt={faculty.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                    {faculty.name}
                  </h3>
                  <p className="text-sm md:text-base text-primary-600 font-medium mb-4">
                    {faculty.designation}
                  </p>

                  <div className="w-full border-t border-gray-100 my-4" />

                  <div className="space-y-2.5 md:space-y-3 w-full text-left flex-grow">
                    <div className="flex items-start gap-2.5 md:gap-3">
                      <GraduationCap className="w-4 h-4 md:w-5 md:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="block text-xs md:text-sm font-semibold text-gray-700">
                          Qualification
                        </span>
                        <span className="text-xs md:text-sm text-gray-600">
                          {faculty.education}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 md:gap-3">
                      <Award className="w-4 h-4 md:w-5 md:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="block text-xs md:text-sm font-semibold text-gray-700">
                          Specialization
                        </span>
                        <span className="text-xs md:text-sm text-gray-600">
                          {faculty.subject}
                        </span>
                      </div>
                    </div>
                    {faculty.awards && faculty.awards.length > 0 && (
                      <div className="flex items-start gap-2.5 md:gap-3">
                        <Award className="w-4 h-4 md:w-5 md:h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="block text-xs md:text-sm font-semibold text-gray-700">
                            Awards
                          </span>
                          <ul className="list-disc list-inside text-xs md:text-sm text-gray-600">
                            {faculty.awards.map((award, idx) => (
                              <li key={idx}>{award}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 md:mt-6 flex justify-center gap-3 w-full">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full text-gray-600 border-gray-200 hover:border-primary-600 hover:text-primary-600 rounded-full text-sm"
                      onClick={() =>
                        (window.location.href = `mailto:${faculty.email}`)
                      }
                    >
                      <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 md:mr-2" />{" "}
                      Contact
                    </Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </Section>
      ))}
    </div>
  );
};

export default FacultyComponent;
