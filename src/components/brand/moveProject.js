import crossIcon from '../../assets/images/header-icons/cross-sign.png';
import moveAndSwitchIcon from '../../assets/images/move-project-icons/icon Move and switch projects.png';
import checkCircleIcon from '../../assets/images/move-project-icons/check circle.png';

const MoveProject = () => {
    return (
        <>
            <div className="moveOverLay">
                <div className="move-switch">
                    <img src={crossIcon} alt="" className="move-cross" />
                    <div className="head">
                        <img src={moveAndSwitchIcon} alt="" />
                        <h2>Move and switch projects</h2>
                    </div>
                    <div className="body">
                        <p>
                            Your plan allows <span>1</span> active project(s). Choose an active project to switch
                            with or <span>upgrade</span> to get higher output.
                        </p>
                        <p>Switch with this project:</p>
                        <div className="activeProject">
                            <input type="checkbox" name="actProj" id="actProj" hidden />
                            <label htmlFor="actProj">
                                <img src={checkCircleIcon} alt="" />
                            </label>
                            <h3>Captain Marvel: Landing Page Design</h3>
                        </div>
                        <p className="note">
                            <span>Alert</span> : Only Active projects will be worked on. No designs or revisions
                            will be submitted for projects in Queue.
                        </p>
                    </div>
                    <div className="foot">
                        <button>Cancel</button>
                        <button>Upgrade</button>
                        <button>Switch</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MoveProject