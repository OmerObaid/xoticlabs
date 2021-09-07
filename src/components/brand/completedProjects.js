import { useState, useEffect } from "react";
import { useParams } from 'react-router';

const CompletedProjects = () => {

    const { id } = useParams();

    const [completedProjects, setCompletedProjects] = useState([]);
    const [allCompletedProjects, setAllCompletedProjects] = useState([]);

    const fetchCompletedProjects = () => {

    }

    useEffect(() => {
        fetchCompletedProjects();
    }, [id]);

    return (
        <>
            <div className="brandsBody productsBodyComplete">
                <div className="productList">
                    <div className="productList_single">
                        <div className="head">
                            <img className="productList_image" src="./images/active work image.png" alt="" />
                            <div className="productList_details">
                                <div className="heading">
                                    <h2>Infographic</h2>
                                    <div className="inProg">
                                        <span>Completed</span> <img src="./images/check circle white.png" alt="" />
                                    </div>
                                </div>
                            </div>
                            <button className="smile">
                                <img src="./images/smile.png" alt="" />
                            </button>
                        </div>
                        <div className="foot">
                            <div className="foot_single">
                                <h3>Created</h3>
                                <p>June 29, 2020</p>
                            </div>
                            <div className="foot_single">
                                <h3>Started</h3>
                                <p>June 29, 2020</p>
                            </div>
                            <div className="foot_single">
                                <h3>Completed</h3>
                                <p>June 29, 2020</p>
                            </div>
                            <div className="foot_single">
                                <h3>Design Recieved</h3>
                                <p>0</p>
                            </div>
                        </div>
                    </div>
                    <div className="productList_single">
                        <div className="head">
                            <img className="productList_image" src="./images/active work image.png" alt="" />
                            <div className="productList_details">
                                <div className="heading">
                                    <h2>Xotic Labs logo</h2>
                                    <div className="inProg">
                                        <span>Completed</span> <img src="./images/check circle white.png" alt="" />
                                    </div>
                                </div>
                            </div>
                            <button className="smile">
                                <img src="./images/smile.png" alt="" />
                            </button>
                        </div>
                        <div className="foot">
                            <div className="foot_single">
                                <h3>Created</h3>
                                <p>June 29, 2020</p>
                            </div>
                            <div className="foot_single">
                                <h3>Started</h3>
                                <p>June 29, 2020</p>
                            </div>
                            <div className="foot_single">
                                <h3>Completed</h3>
                                <p>June 29, 2020</p>
                            </div>
                            <div className="foot_single">
                                <h3>Design Recieved</h3>
                                <p>0</p>
                            </div>
                        </div>
                    </div>
                    <div className="productList_single">
                        <div className="head">
                            <img className="productList_image" src="./images/active work image.png" alt="" />
                            <div className="productList_details">
                                <div className="heading">
                                    <h2>Project Web App</h2>
                                    <div className="inProg">
                                        <span>Completed</span> <img src="./images/check circle white.png" alt="" />
                                    </div>
                                </div>
                            </div>
                            <button className="smile">
                                <img src="./images/smile.png" alt="" />
                            </button>
                        </div>
                        <div className="foot">
                            <div className="foot_single">
                                <h3>Created</h3>
                                <p>June 29, 2020</p>
                            </div>
                            <div className="foot_single">
                                <h3>Started</h3>
                                <p>June 29, 2020</p>
                            </div>
                            <div className="foot_single">
                                <h3>Completed</h3>
                                <p>June 29, 2020</p>
                            </div>
                            <div className="foot_single">
                                <h3>Design Recieved</h3>
                                <p>0</p>
                            </div>
                        </div>
                    </div>
                    <div className="productList_single">
                        <div className="head">
                            <img className="productList_image" src="./images/active work image.png" alt="" />
                            <div className="productList_details">
                                <div className="heading">
                                    <h2>Illustration</h2>
                                    <div className="inProg">
                                        <span>Completed</span> <img src="./images/check circle white.png" alt="" />
                                    </div>
                                </div>
                            </div>
                            <button className="smile">
                                <img src="./images/smile.png" alt="" />
                            </button>
                        </div>
                        <div className="foot">
                            <div className="foot_single">
                                <h3>Created</h3>
                                <p>June 29, 2020</p>
                            </div>
                            <div className="foot_single">
                                <h3>Started</h3>
                                <p>June 29, 2020</p>
                            </div>
                            <div className="foot_single">
                                <h3>Completed</h3>
                                <p>June 29, 2020</p>
                            </div>
                            <div className="foot_single">
                                <h3>Design Recieved</h3>
                                <p>0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CompletedProjects
