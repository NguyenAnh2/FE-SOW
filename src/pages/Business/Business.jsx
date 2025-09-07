import { FaSearchPlus, FaCloudUploadAlt } from "react-icons/fa";
import "./Business.css";
import { useState } from "react";

export function Business() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    address2: "",
    postcode: "",
    city: "",
    reference: "",
    phone: "",
    email: "",
    accountNo: "",
    orgNumber: "",
    homepage: "",
  });

  const [useLogo, setUseLogo] = useState(true);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <div className="businessContainer">
      <div className="businessContent">
        <div className="businessCard businessCardInput">
          <p className="cardNote">
            Your business details. To update them - just change them
          </p>

          <div className="formGroupBusiness">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>

          <div className="formGroupBusiness">
            <label>Address</label>
            <input
              type="text"
              placeholder="Enter address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
          </div>

          <div className="formGroupBusiness">
            <label>Address 2</label>
            <input
              type="text"
              placeholder="Enter address 2"
              value={formData.address2}
              onChange={(e) => handleInputChange("address2", e.target.value)}
            />
          </div>

          <div className="formGroupBusiness row">
            <div className="postcodeInput">
              <label>Postcode</label>
              <input
                type="text"
                placeholder="Enter postcode"
                value={formData.postcode}
                onChange={(e) => handleInputChange("postcode", e.target.value)}
              />
            </div>
            <div className="cityInput">
              <label>City</label>
              <input
                type="text"
                placeholder="Enter city"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
              />
            </div>
          </div>

          <div className="formGroupBusiness">
            <label>Our reference</label>
            <input
              type="text"
              placeholder="Enter reference"
              className="w-80"
              value={formData.reference}
              onChange={(e) => handleInputChange("reference", e.target.value)}
            />
          </div>

          <div className="formGroupBusiness">
            <label>Phone</label>
            <input
              type="text"
              placeholder="Enter phone"
              className="w-80"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />
          </div>

          <div className="formGroupBusiness">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-80"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>

          <div className="formGroupBusiness">
            <label>Account no.</label>
            <input
              type="text"
              placeholder="Enter account number"
              className="w-80"
              value={formData.accountNo}
              onChange={(e) => handleInputChange("accountNo", e.target.value)}
            />
          </div>

          <div className="formGroupBusiness">
            <label>Org. Number</label>
            <input
              type="text"
              placeholder="Enter org number"
              className="w-80"
              value={formData.orgNumber}
              onChange={(e) => handleInputChange("orgNumber", e.target.value)}
            />
          </div>

          <div className="formGroupBusiness">
            <label>Homepage</label>
            <input
              type="text"
              placeholder="Enter homepage"
              className="w-80"
              value={formData.homepage}
              onChange={(e) => handleInputChange("homepage", e.target.value)}
            />
          </div>

          <p className="cardNote">
            To change settings - click Settings at the top
          </p>
        </div>

        <span className="line"></span>

        <div className="businessCardPicture">
          <div className="businessCard businessCardLogo">
            <p className="cardTitle">Our Logo</p>
            <img
              src="/sverige43.jpg"
              alt="Logo"
              className="cardImage"
            />
            <div className="toggleRow">
              <p>Use logo</p>
              <div className="toggleOptions">
                <span
                  className={useLogo ? "toggleActive" : ""}
                  onClick={() => setUseLogo(true)}
                >
                  Yes
                </span>
                <span
                  className={!useLogo ? "toggleActive" : ""}
                  onClick={() => setUseLogo(false)}
                >
                  No
                </span>
              </div>
            </div>
            <div className="actionRow">
              <p>Choose logo</p>
              <button className="actionBtnBusiness">
                <p>Upload new</p>
                <span>
                  <FaCloudUploadAlt />
                </span>
              </button>
            </div>
            <div className="actionRow">
              <p>Preview logo</p>
              <button className="actionBtnBusiness">
                <p>Preview</p>
                <span>
                  <FaSearchPlus />
                </span>
              </button>
            </div>
          </div>

          <div className="businessCard businessCardProfile">
            <p className="cardTitle">Profile picture</p>
            <img
              src="/sverige43.jpg"
              alt="Profile"
              className="cardImage circle"
            />
            <div className="profileActions">
              <button className="actionBtnBusiness">
                <p>Edit Original</p>
                <span>
                  <FaCloudUploadAlt />
                </span>
              </button>
              <button className="actionBtnBusiness">
                <p>Upload New</p>
                <span>
                  <FaCloudUploadAlt />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
