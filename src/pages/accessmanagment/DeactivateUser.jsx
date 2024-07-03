import React from 'react';
import TablePagesTitle from "../../components/table-pages-title/TablePagesTitle";
import AccessPageAction from "./page-action/AccessPageAction";
import DeactivateUserTable from '../../components/table/all-tables/usermanagementtable/DeactivateUserTable';


const DeactivateUser = () => {
    return (
        <>
            <TablePagesTitle
                mainTitle="User Management"
                content="Deactivated Users"
            />
            <AccessPageAction 
                subheading="Deactivated Users"
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
                    <DeactivateUserTable/>
                </div>
            </div>
        </>
    );
};

export default DeactivateUser;