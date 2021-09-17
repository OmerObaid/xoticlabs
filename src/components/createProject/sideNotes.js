import checkCircle from "../../assets/images/check circle.png";
import fourArrowIcon from "../../assets/images/create-project/four-arrow.png";

const SideNotes = () => {
  return (
    <>
      <div className="noteOne note">
        <img src={fourArrowIcon} alt="dragArrow" />
        <h3>What to include</h3>
        <ul>
          <li>
            <img src={checkCircle} alt="check circle" className="checkImg" />
            <p>Clear description of what you want</p>
          </li>
          <li>
            <img src={checkCircle} alt="check circle" className="checkImg" />
            <p>How/where design will be used</p>
          </li>
          <li>
            <img src={checkCircle} alt="check circle" className="checkImg" />
            <p>3-4 concepts that you like</p>
          </li>
          <li>
            <img src={checkCircle} alt="check circle" className="checkImg" />
            <p>What you like from examples</p>
          </li>
          <li>
            <img src={checkCircle} alt="check circle" className="checkImg" />
            <p>Dimensions</p>
          </li>
          <li>
            <img src={checkCircle} alt="check circle" className="checkImg" />
            <p>Color preferences</p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideNotes;
