import React from "react";
import { Link } from "react-router-dom";
import {
   FaLock,
   FaRegTrashAlt,
   FaPen,
   FaEye,
   FaKey,
   FaUserLock,
   FaSyncAlt,
} from "react-icons/fa";
import { Tooltip as ReactTooltip } from "react-tooltip";
import style from "../../../../assets/scss/custom.module.scss";

const ActionButtons = ({ onDelete, isConfirmed, editUrl, viewUser }) => (
   <>

      <ul className={style.actionButtonList}>
         <li>
            <button 
               type="button" 
               className="login btn-action btn-primary"
               title="Login"
               data-tooltip-id="my-tooltip-1" 
            >
               <FaLock />
            </button>
            <button
               onClick={viewUser}
               type="button"
               className="btn-action btn-primary"
               title="View"
            >
               <FaEye />
            </button>
            <Link 
               to={editUrl} 
               className="edit btn-action btn-primary"
               title="Edit"
            >
               <FaPen />
            </Link>
            <button 
               type="button" 
               className="btn-action btn-primary"
               title="Change Password"
            >
               <FaKey />
            </button>
            <button 
               type="button" 
               className="btn-action btn-primary"
               title="Deactivate"
            >
               <FaUserLock />
            </button>
            {isConfirmed === "false" && (
               <button 
                  type="button" 
                  className="btn-action btn-primary"
                  title="Resend"
               >
                  <FaSyncAlt />
               </button>
            )}
            <button
               type="button"
               className="delete btn-action btn-primary red-bg"
               onClick={onDelete}>
               <FaRegTrashAlt />
            </button>
         </li>
      </ul>
   
      <ReactTooltip
         id="my-tooltip-1"
         place="bottom"
         content="login"
      />
   </>
);

export default ActionButtons;
