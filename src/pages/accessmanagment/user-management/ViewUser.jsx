import React from "react";
import Style from "./../../../assets/scss/custom.module.scss";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import UserOverview from "./tab-item/UserOverview";
// import UserHistory from "./tab-item/UserHistory";
import TablePagesTitle from "../../../components/table-pages-title/TablePagesTitle";
import AccessPageAction from "../page-action/AccessPageAction";

const ViewUser = () => {
   return (
      <>
        <TablePagesTitle
            mainTitle="User Management"
            content="View User"
        />
        <AccessPageAction 
            subheading="View User"
            alluser="/access/user"
            allUserTitle="All Users"
            createuser="/access/user/create-user"
            createUserTitle="Create User"
            deactivate="#"
            deactivateTitle="Deactivated Users"
            deleteuser="/access/user/deleted"
            deleteUserTitle="Deleted Users"
        />
         <div className="row mb-3 mx-0">
            <div
               className={`${Style.tabContainerCustom} tabcontainercustom col-md-12 mt-3`}>
               <Tabs defaultActiveKey="User_Overview" className="mb-3">
                  <Tab eventKey="User_Overview" title="Overview">
                     <UserOverview />
                  </Tab>
                  {/* <Tab eventKey="User_History" title="History">
                     <UserHistory />
                  </Tab> */}
               </Tabs>
            </div>
         </div>
      </>
   );
};

export default ViewUser;
