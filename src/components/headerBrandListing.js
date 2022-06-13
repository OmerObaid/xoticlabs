import { useDispatch } from "react-redux";
import { setActiveBrandId } from "../redux/headerSettings/Action";

const HeaderBrandListing = ({
  brands,
  ulClass,
  headerSubMenuClossCallBack = null,
  ...props
}) => {
  const dispatch = useDispatch();

  const setActiveBrand = (brandId) => {
    dispatch(setActiveBrandId(brandId));
    if (headerSubMenuClossCallBack != null) headerSubMenuClossCallBack();

    const { from } = {
      from: { pathname: `/brand/${brandId}` },
    };

    props.history.push(from);
  };

  return (
    <>
      <ul style={{ overflowY: "scroll", height: "200px" }} className={ulClass}>
        {brands.map((brand, key) => {
          return (
            <li key={key}>
              <a
                onClick={() => setActiveBrand(brand.brand_id)}
                className="headerBrandList"
              >
                {brand.title}
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default HeaderBrandListing;
