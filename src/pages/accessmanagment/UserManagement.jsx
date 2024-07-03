import React from "react";
import UserManagementTable from "../../components/table/all-tables/usermanagementtable/UserManagementTable";
import TablePagesTitle from "../../components/table-pages-title/TablePagesTitle";
import AccessPageAction from "./page-action/AccessPageAction";
const UserManagement = () => {
   return (
      <>
        <TablePagesTitle
            mainTitle="User Management"
            content="Active Users"
        />
        <AccessPageAction 
            subheading="Active Users"
            alluser="/access/user"
            allUserTitle="All Users"
            createuser="/access/user/create-user"
            createUserTitle="Create User"
            deactivate="/access/user/deactivated"
            deactivateTitle="Deactivated Users"
            deleteuser="/access/user/deleted"
            deleteUserTitle="Deleted Users"
        />
         <div className="row mb-3 mx-0">
            <div className="col-12">
               <UserManagementTable />
            </div>
         </div>
      </>
   );
};

export default UserManagement;
