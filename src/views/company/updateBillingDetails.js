import React from "react";

const UpdateBillingDetails = ({ billingDetaill, closePopup }) => {
  const [allCountries, setAllCountries] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);

  const handleCountryChange = (e, handleChange) => {
    let tmpStates = allStates.filter((state) => {
      return state.country_id == e.target.value;
    });
    setFilteredStates(tmpStates);
    handleChange(e);
  };
  const fetchCountries = () => {
    let helper = FormDataHelper();
    GeneralServices.postRequest(helper, LIST_COUNTRIES).then((resp) => {
      let countries = resp.data;
      setAllCountries(countries);
      fetchStates();
    });
  };
  const fetchStates = () => {
    let helper = FormDataHelper();
    GeneralServices.postRequest(helper, LIST_STATES).then((resp) => {
      let states = resp.data;
      setAllStates(states);

      let tmpStates;
      console.log("asdsadd", user);
      if (user.country_id != null || user.state_id != "0") {
        tmpStates = states.filter((state) => {
          return state.country_id == user.country_id;
        });
      } else {
        tmpStates = states;
      }

      setFilteredStates(tmpStates);
    });
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <>
      <div id="myModal" className="modal" style={{ display: "block" }}>
        <div className="modal-content">
          <span onClick={closePopup} className="close">
            &times;
          </span>
          <div className="center-text">Update billing details</div>
          <Formik
            enableReinitialize={true}
            initialValues={{
              primaryAddress: billingDetaill.address1
                ? billingDetaill.address1
                : "",
              secondaryAddress: billingDetaill.address2
                ? billingDetaill.address2
                : "",
              city: billingDetaill.city ? billingDetaill.city : "",
              stateId: billingDetaill.state_id ? billingDetaill.state_id : "",
              postalCode: billingDetaill.zip_code
                ? billingDetaill.zip_code
                : "",
              countryId: billingDetaill.country_id
                ? billingDetaill.country_id
                : "",
            }}
            validationSchema={Yup.object().shape({
              primaryAddress: Yup.string().required(
                "Address line 1 is required"
              ),
            })}
            onSubmit={(values, actions) => {
              console.log(values);

              let helper = FormDataHelper();
              helper.append("client_id", getClientId());
              helper.append("address1", values.primaryAddress);
              helper.append("address2", values.secondaryAddress);
              helper.append("city", values.city);
              helper.append("state_id", values.stateId);
              helper.append("zip_code", values.postalCode);
              helper.append("state_id", values.stateId);
            }}
          >
            {({ isSubmitting, setFieldValue, values, handleChange }) => (
              <Form>
                <div className="container">
                  <div>
                    <div className="label-space">
                      <label className="pop-label" htmlFor="adress">
                        <b>Address1</b>
                      </label>
                    </div>
                    <Field
                      type="text"
                      placeholder="Address"
                      name="primaryAddress"
                      className="namep"
                    />
                  </div>
                  <div>
                    <div className="label-space">
                      <label className="pop-label" htmlFor="adress1">
                        <b> Address2 </b>
                      </label>
                    </div>
                    <Field
                      type="text"
                      placeholder="Address2"
                      name="secondaryAddress"
                      className="namep"
                    />
                  </div>
                  <div className="parent-select">
                    <div style={{ flex: 1 }}>
                      <div>
                        <div className="label-space">
                          <label className="pop-label" htmlFor="address">
                            <b>City </b>
                          </label>
                        </div>
                        <Field
                          type="text"
                          placeholder="Enter City"
                          name="city"
                          className="city"
                        />
                      </div>
                      <div>
                        <div className="label-space">
                          <label className="pop-label" htmlFor="address1">
                            <b>ZIP / postal code</b>
                          </label>
                        </div>
                        <Field
                          type="text"
                          placeholder="----"
                          name="postalCode"
                          className="city"
                        />
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div>
                        <div className="label-space">
                          <label className="state-label" htmlFor="adress1">
                            <b>State</b>
                          </label>
                        </div>
                        <Field
                          as="select"
                          className="country-state"
                          name="stateId"
                        >
                          {filteredStates &&
                            filteredStates.map((state) => {
                              return (
                                <option key={state.id} value={state.id}>
                                  {state.title}
                                </option>
                              );
                            })}
                        </Field>
                      </div>
                      <div>
                        <div className="label-space">
                          <label className="pop-label" htmlFor="adress1">
                            <b>Country</b>
                          </label>
                        </div>
                        <Field
                          as="select"
                          className="state-picker"
                          name="countryId"
                          onChange={(e) => handleCountryChange(e, handleChange)}
                        >
                          {allCountries &&
                            allCountries.map((country) => {
                              return (
                                <option key={country.id} value={country.id}>
                                  {country.title}
                                </option>
                              );
                            })}
                        </Field>
                      </div>
                    </div>
                  </div>
                  <div className="last-btn-pp">
                    <button className="last-btn" type="submit">
                      Save Changes
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default UpdateBillingDetails;
