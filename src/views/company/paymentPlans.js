import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import proIcon from "../../assets/images/pro2.png";
import { FormDataHelper } from "../../jwt/_helpers/FormDataHelper";
import { GeneralServices } from "../../jwt/_services/General.services";
import {
  GET_NEXT_CHARGE_DATE,
  LIST_PLANS,
  PROJECT_LISTING,
  SUBSCRIBE_TO_PLAN,
} from "../../jwt/_services/axiousURL";
import { getClientId, getClientProfileId } from "../../helper/siteHelper";
import swal from "sweetalert";
import SubscribeButton from "./subscribeButton";
import { useDispatch } from "react-redux";
import { setAccountPlanTitle } from "../../redux/headerSettings/Action";

const PaymentPlans = ({ companyInfo, getCompanyInformationCallBack }) => {
  const [allPlans, setAllPlans] = useState([]);
  const [activePlan, setActivePlan] = useState({});
  const [nextChargeDate, setNextChargeDate] = useState("");
  const [allActiveProjects, setAllActiveProjects] = useState([]);
  const dispatch = useDispatch();

  const getPlans = () => {
    let helper = FormDataHelper();
    GeneralServices.postRequest(helper, LIST_PLANS).then((resp) => {
      console.log("i am all the plans", resp.data);
      let tmpPlans = resp.data;
      setAllPlans(tmpPlans);
    });
  };

  const getActivePlan = () => {
    let resp = allPlans.find((singlePlan) => {
      return singlePlan.id == companyInfo.plan_id;
    });
    return resp;
  };

  const getPlanByPlanId = (planId) => {
    return allPlans.find((singlePlan) => {
      return singlePlan.id == planId;
    });
  };

  const getNextChargeDate = () => {
    if (activePlan.id == undefined) return;

    let helper = FormDataHelper();
    helper.append("company_id", companyInfo.id);

    GeneralServices.postRequest(helper, GET_NEXT_CHARGE_DATE).then(
      (resp) => {
        setNextChargeDate(resp.data.current_period_end);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleSubscriblePlan = (planId, planTitle) => {
    swal({
      title: "Xotic-Labs",
      text: `Are you sure you want to change your plan to ${planTitle}?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((resp) => {
      if (resp) {
        let helper = FormDataHelper();
        helper.append("plan_id", planId);
        helper.append("client_profile_id", getClientProfileId());

        GeneralServices.postRequest(helper, SUBSCRIBE_TO_PLAN).then(
          (resp) => {
            swal(`Plan updated to ${planTitle}`, {
              icon: "success",
            });
            // setActivePlan(getPlanByPlanId(planId));
            dispatch(setAccountPlanTitle(planTitle));
            getCompanyInformationCallBack();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  };

  const moveExtraProjectToDefault = (planId) => {
    let userSelectedPlan = allPlans.filter((ele) => {
      return ele.id == planId;
    });

    console.log("userSelectedPlan", userSelectedPlan);
    console.log("activePlan", activePlan);
  };

  const fetchAllActiveProjects = () => {
    var helper = FormDataHelper();
    helper.append("status", "I");
    helper.append("client_id", getClientId());

    await GeneralServices.postRequest(helper, PROJECT_LISTING).then(
      (successResponse) => {
        let allActiveProjects = successResponse.data;
        setAllActiveProjects(allActiveProjects);
      },
      (errorResponse) => {
        setAllActiveProjects([]);
      }
    );

    // let resp = await GeneralServices.postRequest(helper, PROJECT_LISTING);
    // return await resp;
  };

  (async () => {
    console.log("fucking fuck omg", await fetchAllActiveProjects());
  })();

  moveExtraProjectToDefault(6);
  useEffect(() => {
    getPlans();
  }, [companyInfo]);

  useEffect(() => {
    let plan = getActivePlan();
    if (plan) setActivePlan(plan);
  }, [allPlans]);

  useEffect(() => {
    getNextChargeDate();
  }, [activePlan]);

  return (
    <>
      <div>
        <div className="container con-2 ">
          {companyInfo.is_canceled != "Y" && (
            <div className="scale-pro">
              <h3>
                <img src={proIcon} className="scale-img" alt="" />
                <span className="black">
                  {companyInfo.is_pause === "Y"
                    ? `Active Plan: ON PAUSE`
                    : `Active Plan: ${activePlan.title}`}
                </span>
              </h3>
            </div>
          )}

          {companyInfo.is_canceled != "Y" && (
            <div className="scale">
              <p className="hh">
                {companyInfo.is_pause === "Y"
                  ? `Subscription $14.99 USD/month`
                  : `Subscription $${activePlan.price} USD/month`}
              </p>
              {/* <p className="hh"> Designer. Glan Alfanso</p>
            <p className="hh"> Plan details </p> */}
              <p className="hh">
                <span className="blue">Next Charge Date: {nextChargeDate}</span>
              </p>
            </div>
          )}

          {allPlans.map((singlePlan) => {
            return (
              <div key={singlePlan.id}>
                <div className="scale-pro">
                  <h3>
                    <FontAwesomeIcon icon={faPlus} />
                    <span className="black">{` ${singlePlan.title}`} </span>
                  </h3>
                </div>
                <div className="scale ">
                  <p className="plan-desc">{singlePlan.description}</p>
                  <p className="plan-desc">
                    <FontAwesomeIcon
                      icon={faBook}
                      style={{ color: "#38cc85" }}
                    />
                    <span className="blue">
                      <a
                        href="https://xoticlabs.com/pricing/"
                        target={"_blank"}
                        style={{ color: "#00ab92" }}
                      >
                        {` Plan Details`}
                      </a>
                    </span>
                  </p>

                  <SubscribeButton
                    companyInfo={companyInfo}
                    plandId={singlePlan.id}
                    title={singlePlan.title}
                    activePlanId={activePlan.id}
                    handleSubscriblePlan={handleSubscriblePlan}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PaymentPlans;
