
import { useLocation } from "react-router-dom";
import Hero from "../../../components/ui/Hero";
import FacultyComponent from "../../../components/FacultyComponent";

const FacultyPage = () => {
  const location = useLocation();
  const path = location.pathname;

  let campusName = "";
  if (path.includes("/main")) {
    campusName = "Main Campus";
  } else if (path.includes("/law")) {
    campusName = "Law College";
  } else if (path.includes("/hala")) {
    campusName = "Hala Campus";
  }

  return (
    <div className="min-h-screen bg-white">
      <FacultyComponent filterCampus={campusName} />
    </div>
  );
};

export default FacultyPage;
