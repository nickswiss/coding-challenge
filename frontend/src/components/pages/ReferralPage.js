import ReferralApp from "../widgets/ReferralApp";
import React from "react";

const ReferralPage = props => {
  /*
  Referral page hosting ReferralApp
   */
  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          verticalAlign: "middle",
          lineHeight: "30px",
          marginTop: "60px",
          marginBottom: "30px",
          color: "#556cd6"
        }}
      >
        Grow the web with Referrals!
      </h1>
      <ReferralApp />
    </div>
  );
};

export default ReferralPage;
