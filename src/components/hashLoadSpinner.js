import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";

const override = css`
  display: block;
  margin: 0 auto;
  /* border-color: red; */
`;

const HashLoadSpinner = () => {

    // const [loading, setLoading] = useState(true);
    // const [color, setColor] = useState("#4ba893");

    return (
        <>
            <HashLoader color="#4ba893" loading={true} css={override} size={60} />
        </>
    )
}

export default HashLoadSpinner
