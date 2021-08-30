
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setActiveBrandId } from "../redux/headerSettings/Action";


const HeaderBrandListing = ({ brands }) => {

    const dispatch = useDispatch();
    const setActiveBrand = (brandId) => {
        dispatch(setActiveBrandId(brandId));
    }

    return (
        <>
            <ul className="dropList active">
                {
                    brands.map((brand, key) => {
                        return <li key={key}><Link onClick={() => setActiveBrand(brand.brand_id)} className="headerBrandList">{brand.title}</Link></li>
                    })
                }
            </ul>
        </>
    )
}

export default HeaderBrandListing