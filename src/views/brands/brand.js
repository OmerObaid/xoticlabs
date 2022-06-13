import searchIcon from "../../assets/images/brand-page-icons/magnifying-glass.png";
import { useState } from "react";
import ActiveProjects from "../../components/brand/activeProjects";
import CompletedProjects from "../../components/brand/completedProjects";
import DraftProjects from "../../components/brand/draftProjects";
import { isAccountPaused } from "../../helper/accountHelper";
import { useSelector } from "react-redux";

const Brand = (props) => {
  const [searchText, setSearchText] = useState("");
  const [showActiveProjects, setShowActiveProjects] = useState(true);
  const [showCompletedProjects, setShowCompletedProjects] = useState(false);
  const [showDraftsProjects, setShowDraftsProjects] = useState(false);
  const headerSettings = useSelector((state) => state.headerSettings);

  const handleActiveProjectsClick = () => {
    setShowActiveProjects(true);
    setShowCompletedProjects(false);
    setShowDraftsProjects(false);
    setSearchText("");
  };
  const handleCompletedProjectsClick = () => {
    setShowActiveProjects(false);
    setShowCompletedProjects(true);
    setShowDraftsProjects(false);
    setSearchText("");
  };
  const handleDraftsProjectsClick = () => {
    setShowActiveProjects(false);
    setShowCompletedProjects(false);
    setShowDraftsProjects(true);
    setSearchText("");
  };

  const handleNewProjectClick = () => {
    const { from } = props.location.state || {
      from: { pathname: "/createProject" },
    };
    props.history.push(from);
  };

  return (
    <>
      <section className="blp plp">
        <main className="cont">
          <div className="pageHead">
            <h1>Projects</h1>
            <ul className="filterProjects">
              <li
                onClick={handleActiveProjectsClick}
                className={showActiveProjects ? "selected" : ""}
              >
                Active
              </li>
              <li
                onClick={handleCompletedProjectsClick}
                className={showCompletedProjects ? "selected" : ""}
              >
                Complete
              </li>
              <li
                onClick={handleDraftsProjectsClick}
                className={showDraftsProjects ? "selected" : ""}
              >
                Drafts
              </li>
            </ul>
            <div className="inputDiv">
              <img src={searchIcon} alt="" />
              <input
                placeholder="Search"
                type="search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            {!isAccountPaused(headerSettings) && (
              <button onClick={handleNewProjectClick}>+ New project</button>
            )}
          </div>
          {showActiveProjects && (
            <ActiveProjects filterText={searchText} props={props} />
          )}
          {showCompletedProjects && (
            <CompletedProjects filterText={searchText} props={props} />
          )}
          {showDraftsProjects && (
            <DraftProjects filterText={searchText} props={props} />
          )}
        </main>
      </section>
    </>
  );
};

export default Brand;
