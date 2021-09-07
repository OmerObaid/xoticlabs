import waitingIcon from '../../assets/images/brand-page-icons/waiting.png'
import activeWorkIcon from '../../assets/images/brand-page-icons/active work image.png'
import gearIcon from '../../assets/images/gear.png'
import deleteIcon from '../../assets/images/brand-listing-icon/icon Delete project.png';
import editIcon from '../../assets/images/brand-listing-icon/icon Edit project.png';
import checkCircle from '../../assets/images/check circle.png';
import moveToActiveIcon from '../../assets/images/icon Move to active.png';
import duplicateProjectIcon from '../../assets/images/icon Duplicate project.png'

import { useState, useEffect } from "react";
import { FormDataHelper } from '../../jwt/_helpers/FormDataHelper';
import { PROJECT_LISTING } from '../../jwt/_services/axiousURL';
import { GeneralServices } from "../../jwt/_services/General.services";
import { useParams } from 'react-router';

const ActiveProjects = ({ filterText, ...props }) => {

    const { id } = useParams();

    const [projects, setProjects] = useState([]);
    const [allProjects, setAllProjects] = useState([]);

    const [queueProjects, setQueueProjects] = useState([]);
    const [allQueueProjects, setAllQueueProjects] = useState([]);

    console.log(filterText);

    const fetchProjects = (projectStatus) => {

        var helper = FormDataHelper();
        helper.append('brand_id', id);
        helper.append('status', projectStatus);

        GeneralServices.postRequest(helper, PROJECT_LISTING).then(
            (successResponse) => {
                const projects = successResponse.data;
                if (projectStatus === 'I') {
                    setProjects(projects);
                    setAllProjects(projects);
                }
                else {
                    setQueueProjects(projects);
                    setAllQueueProjects(projects);
                }
            },
            (errorResponse) => {
                if (projectStatus === 'I') setProjects([]);
                else setQueueProjects([]);
            }
        )
    }

    useEffect(() => {
        fetchProjects('I');
        fetchProjects('Q');
    }, [id])

    useEffect(() => {
        if (filterText == '') {
            setProjects(allProjects);
            setQueueProjects(allQueueProjects);
        }

        setProjects(allProjects.filter((project) => { return project.title.includes(filterText) }));
        setQueueProjects(allQueueProjects.filter((project) => { return project.title.includes(filterText) }));

    }, [filterText])

    return (
        <>
            <div className="brandsBody productsBody">
                <h4 className="productsBody_head">Active <span>({projects.length})</span></h4>
                {
                    projects.map((project) => {

                        return <div className="productList" key={project.project_id}>
                            <div className="productList_single">
                                <img className="productList_image" src={activeWorkIcon} alt="" />
                                <div className="productList_details">
                                    <div className="heading">
                                        <h2>{project.title}</h2>
                                        <div className="inProg">
                                            <span>In Progress</span> <img src={waitingIcon} alt="" />
                                        </div>
                                    </div>
                                    <img src="./images/project person.png" alt="" className="person" />
                                </div>
                                <button className="option">
                                    <img src={gearIcon} alt="" /> <span>Options</span>
                                    <ul className="optionMenu">
                                        <h3>Options</h3>
                                        <li><img src={checkCircle} alt="" />Mark as complete</li>
                                        <li>
                                            <img src={duplicateProjectIcon} alt="" />Duplicate project
                                        </li>
                                        <li><img src={editIcon} alt="" />Edit project</li>
                                        <li><img src={deleteIcon} alt="" />Delete project</li>
                                    </ul>
                                </button>
                            </div>
                        </div>
                    })
                }
                <h4 className="productsBody_head">Queue <span>({queueProjects.length})</span></h4>
                {
                    queueProjects.map((project) => {
                        return <div className="productList_single" key={project.project_id}>
                            <div className="productList_details">
                                <div className="heading">
                                    <h2>{project.title}</h2>
                                </div>
                            </div>
                            <button className="option">
                                <img src={gearIcon} alt="" /> <span>Options</span>
                                <ul className="optionMenu">
                                    <h3>Options</h3>
                                    <li><img src={checkCircle} alt="" />Mark as complete</li>
                                    <li>
                                        <img src={duplicateProjectIcon} alt="" />Duplicate project
                                    </li>
                                    <li className="mta">
                                        <img src={moveToActiveIcon} alt="" />Move to active
                                    </li>
                                    <li><img src={editIcon} alt="" />Edit project</li>
                                    <li><img src={deleteIcon} alt="" />Delete project</li>
                                </ul>
                            </button>
                        </div>
                    })
                }
            </div>
        </>
    )
}

export default ActiveProjects
