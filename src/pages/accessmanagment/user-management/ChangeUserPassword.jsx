import React from "react";
import TablePagesTitle from "../../../components/table-pages-title/TablePagesTitle";
import AccessPageAction from "../page-action/AccessPageAction";

const ChangeUserPassword = () => {
   return (
      <>
         <TablePagesTitle
            mainTitle="User Management"
            content="Change Password"
         />
         <AccessPageAction
            subheading="Change Password for Mathew"
            alluser="/access/user"
            createuser="/access/user/create-user"
            deleteuser=""
         />
         <div className="row mb-3 mx-0">
            <div className="col-md-12 sale-leade-form mt-3">
               <form>
                  <div className="row mb-2">
                     <div className="col-sm-4">
                        <div className="input-title">
                           <label>Password</label>
                        </div>
                     </div>
                     <div className="col-sm-8">
                        <div className="input-group">
                           <input type="text" placeholder="Name" name="name" />
                        </div>
                     </div>
                  </div>

                  <div className="row mb-2">
                     <div className="col-sm-4">
                        <div className="input-title">
                           <label>Password Confirmation</label>
                        </div>
                     </div>
                     <div className="col-sm-8">
                        <div className="input-group">
                           <input
                              type="text"
                              placeholder="Password Confirmation"
                              name="password_confirmation"
                           />
                        </div>
                     </div>
                  </div>

                  <div className="row mt-4">
                     <div className="col-sm-8 offset-sm-5 d-flex d-sm-block justify-content-center justify-content-sm-start">
                        <button type="button" className="btn btn-red me-2">
                           Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                           Update
                        </button>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </>
   );
};

export default ChangeUserPassword;
