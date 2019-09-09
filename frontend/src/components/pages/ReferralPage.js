import ReferralTable from "../widgets/ReferralTable";
import React from "react";

const ReferralPage = props => {
  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          verticalAlign: "middle",
          lineHeight: "30px",
          marginTop: "60px",
          marginBottom: "30px"
        }}
      >
        Grow the web with Referrals!
      </h1>
      <ReferralTable />
    </div>
  );
};

export default ReferralPage;
