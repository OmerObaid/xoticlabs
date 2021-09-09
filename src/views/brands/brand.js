import searchIcon from '../../assets/images/brand-page-icons/magnifying-glass.png';
import ActiveProjects from "../../components/brand/activeProjects";
import { useState } from 'react';
import CompletedProjects from '../../components/brand/completedProjects';

const Brand = () => {

    const [searchText, setSearchText] = useState('');
    const [showActiveProjects, setShowActiveProjects] = useState(true);
    const [showCompletedProjects, setShowCompletedProjects] = useState(false);
    const [showDraftsProjects, setShowDraftsProjects] = useState(false);

    const handleActiveProjectsClick = () => {
        setShowActiveProjects(true);
        setShowCompletedProjects(false);
        setShowDraftsProjects(false);
        setSearchText('');
    }
    const handleCompletedProjectsClick = () => {
        setShowActiveProjects(false);
        setShowCompletedProjects(true);
        setShowDraftsProjects(false);
        setSearchText('');
    }
    const handleDraftsProjectsClick = () => {
        setShowActiveProjects(false);
        setShowCompletedProjects(false);
        setShowDraftsProjects(true);
        setSearchText('');
    }

    return (
        <>
            <section className="blp plp">
                <main className="cont">
                    <div className="pageHead">
                        <h1>Projects</h1>
                        <ul className="filterProjects">
                            <li onClick={handleActiveProjectsClick} className={showActiveProjects ? "selected" : ""}>Active</li>
                            <li onClick={handleCompletedProjectsClick} className={showCompletedProjects ? "selected" : ""} >Complete</li>
                            <li onClick={handleDraftsProjectsClick} className={showDraftsProjects ? "selected" : ""} >Drafts</li>
                        </ul>
                        <div className="inputDiv">
                            <img src={searchIcon} alt="" />
                            <input placeholder="Search" type="search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                        </div>
                        <button>+ New project</button>
                    </div>
                    {showActiveProjects && <ActiveProjects filterText={searchText} />}
                    {showCompletedProjects && <CompletedProjects filterText={searchText} />}

                </main>
            </section>
        </>
    )
}

export default Brand
