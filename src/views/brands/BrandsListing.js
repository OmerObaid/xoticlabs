import React from "react"

import activeBrandFolderIcon from '../../assets/images/active-brand-icon.png';
import brandFolderIcon from '../../assets/images/brand-icon.png';
import gearIcon from '../../assets/images/gear.png'

import editIcon from '../../assets/images/brand-listing-icon/icon Edit project.png';
import deleteIcon from '../../assets/images/brand-listing-icon/icon Delete project.png'

import { BRAND_PAGE_TITLE } from "../constants";
import { useEffect, useState } from 'react';
import { GeneralServices } from "../../jwt/_services/General.services";
import { FormDataHelper } from "../../jwt/_helpers/FormDataHelper";
import { BRANDS_LISTING, BRAND_DELETE } from "../../jwt/_services/axiousURL";
import { AuthenticationService } from "../../jwt/_services";
import { useDispatch, useSelector } from "react-redux";
import { setBrandList } from "../../redux/headerSettings/Action";

import swal from 'sweetalert';
import CreateNewBrand from "../../components/brand/createNewBrand";


const BrandsListing = () => {

    const clientId = AuthenticationService.currentUserValue.id;
    const [brands, setBrands] = useState([]);
    const [showCreateNewBrand, setShowCreateNewBrand] = useState(false);
    const dispatch = useDispatch();
    const headerSettings = useSelector(state => state.headerSettings);

    useEffect(() => {
        fetchBrands();
        document.title = BRAND_PAGE_TITLE;
    }, []);

    const fetchBrands = () => {
        var bodyHelper = FormDataHelper();
        bodyHelper.append('client_id', clientId);

        GeneralServices.postRequest(bodyHelper, BRANDS_LISTING).then(
            (successResponse) => {
                setBrands(successResponse.data);
                dispatch(setBrandList(successResponse.data));
            },
            (errorResponse) => { console.log('brand listing error', errorResponse); }
        );
    };

    const getTitle = (title) => {
        var length = 7;
        if (title == null) return "";
        if (title.length <= length) return title;

        title = title.substring(0, length);
        return title + " ...";
    }

    const closeCreateNewBrandOverlay = () =>{
        setShowCreateNewBrand(false);
    }

    const deleteProject = (brandId) => {

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    var helper = FormDataHelper();
                    helper.append('brand_id', brandId);
                    GeneralServices.postRequest(helper, BRAND_DELETE).then(
                        (successResponse) => {
                            swal("Brand has been deleted!", {
                                icon: "success",
                            });
                            fetchBrands();
                        },
                        (errorResponse) => {
                            console.log('failed to delete the brand');
                        }
                    );
                } else {
                    console.log('User oppted to not delete the brand');
                }
            });
    }

    return <>
        <section className="blp">
            <main className="cont">
                <div className="pageHead">
                    <h1>Brands</h1>
                    <button onClick={() => setShowCreateNewBrand(true)}>+ Create brand</button>
                </div>

                {showCreateNewBrand && <CreateNewBrand crossButtonCallBack={closeCreateNewBrandOverlay} />}

                <div className="brandsBody">
                    <h4>Brands <span>({brands.length})</span></h4>
                    <div className="brandsList">
                        {
                            brands.map((brand, key) => {
                                return <div className="brandsList_single" key={key}>
                                    <div className="brandsList_head">
                                        <div className="brandsList_left">
                                            <img src={brand.brand_id == headerSettings.activeBrandId ? activeBrandFolderIcon : brandFolderIcon} alt="brand-icon" />
                                            <h3>{getTitle(brand.title)}</h3>
                                        </div>
                                        <button className="option">
                                            <img src={gearIcon} alt="gear-icon" /> <span>Options</span>
                                            <ul className="optionMenu">
                                                <h3>Options</h3>
                                                <li><img src={editIcon} alt="" />Edit Brand</li>
                                                <li onClick={() => deleteProject(brand.brand_id)}><img src={deleteIcon} alt="" />Delete Brand</li>
                                            </ul>
                                        </button>
                                    </div>
                                    <p className="brandsList-p">Used in {brand.used_id} projects</p>
                                </div>
                            })
                        }
                    </div>
                </div>
            </main>
        </section>
    </>
}

export default BrandsListing
