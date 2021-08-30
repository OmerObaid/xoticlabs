import React from "react"

import activeBrandFolderIcon from '../../assets/images/active-brand-icon.png';
import brandFolderIcon from '../../assets/images/brand-icon.png';
import gearIcon from '../../assets/images/gear.png'

import { BRAND_PAGE_TITLE } from "../constants";
import { useEffect, useState } from 'react';
import { GeneralServices } from "../../jwt/_services/General.services";
import { FormDataHelper } from "../../jwt/_helpers/FormDataHelper";
import { BRANDS_LISTING } from "../../jwt/_services/axiousURL";
import { AuthenticationService } from "../../jwt/_services";
import { useDispatch, useSelector } from "react-redux";
import { setBrandList } from "../../redux/headerSettings/Action";

const BrandsListing = () => {

    const clientId = AuthenticationService.currentUserValue.id;
    const [brands, setBrands] = useState([]);
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

    return <>
        <section className="blp">
            <main className="cont">
                <div className="pageHead">
                    <h1>Brands</h1>
                    <button>+ Create brand</button>
                </div>
                <div className="brandsBody">
                    <h4>Brands <span>({brands.length})</span></h4>
                    <div className="brandsList">
                        {
                            brands.map((brand, key) => {
                                return <div className="brandsList_single" key={key}>
                                    <div className="brandsList_head">
                                        <div className="brandsList_left">
                                            <img src={brand.brand_id == headerSettings.activeBrandId ? activeBrandFolderIcon : brandFolderIcon} alt="brand-icon" />
                                            <h3>{brand.title}</h3>
                                        </div>
                                        <button>
                                            <img src={gearIcon} alt="gear" />
                                            <span>Options</span>
                                        </button>
                                    </div>
                                    <p className="brandsList-p">Used in 2 projects</p>
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
