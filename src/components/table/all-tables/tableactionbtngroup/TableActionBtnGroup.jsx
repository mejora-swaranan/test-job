import React from "react";
import { Link } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import {
   FaLock,
   FaRegTrashAlt,
   FaPen,
   FaEye,
   FaKey,
   FaUserLock,
   FaSyncAlt,
   FaEnvelope,
   FaUserCheck
} from "react-icons/fa";
import style from "../../../../assets/scss/custom.module.scss";

const TableActionBtnGroup = ({
    loginUser,
    viewUser,
    editUrl,
    changePassword,
    deactivateUser,
    activateUser,
    reSend,
    reStore,
    onDelete,
    tooltips = {}
}) => {
    return (
        <>
            <ul className={style.actionButtonList}>
                <li>
                    {loginUser &&
                        <button
                            onClick={loginUser}
                            type="button"
                            className="login btn-action btn-primary"
                            data-tooltip-id={tooltips.loginUser?.id}
                        >
                            <FaLock />
                        </button>
                    }

                    {viewUser &&
                        <button
                            onClick={viewUser}
                            type="button"
                            className="btn-action btn-primary"
                            data-tooltip-id={tooltips.viewUser?.id}
                        >
                            <FaEye />
                        </button>
                    }

                    {editUrl &&
                        <Link
                            to={editUrl}
                            className="edit btn-action btn-primary"
                            data-tooltip-id={tooltips.editUrl?.id}
                        >
                            <FaPen />
                        </Link>
                    }

                    {changePassword &&
                        <button
                            onClick={changePassword}
                            type="button"
                            className="btn-action btn-primary"
                            data-tooltip-id={tooltips.changePassword?.id}
                        >
                            <FaKey />
                        </button>
                    }

                    {deactivateUser &&
                        <button
                            onClick={deactivateUser}
                            type="button"
                            className="btn-action btn-primary"
                            data-tooltip-id={tooltips.deactivateUser?.id}
                        >
                            <FaUserLock />
                        </button>
                    }

                    {activateUser &&
                        <button
                            onClick={activateUser}
                            type="button"
                            className="btn-action btn-primary"
                            data-tooltip-id={tooltips.activateUser?.id}
                        >
                            <FaUserCheck />
                        </button>
                    }

                    {reSend &&
                        <button
                            type="button"
                            className="btn-action btn-primary"
                            data-tooltip-id={tooltips.reSend?.id}
                            onClick={reSend}
                        >
                            <FaEnvelope />
                        </button>
                    }

                    {reStore &&
                        <button
                            type="button"
                            className="restore btn-action btn-primary"
                            data-tooltip-id={tooltips.reStore?.id}
                            onClick={reStore}
                        >
                            <FaSyncAlt />
                        </button>
                    }

                    {onDelete &&
                        <button
                            type="button"
                            className="delete btn-action btn-primary red-bg"
                            data-tooltip-id={tooltips.onDelete?.id}
                            onClick={onDelete}
                        >
                            <FaRegTrashAlt />
                        </button>
                    }
                </li>
            </ul>

            {Object.keys(tooltips).map(key => (
                <ReactTooltip
                    key={tooltips[key].id}
                    id={tooltips[key].id}
                    place={tooltips[key].place}
                    content={tooltips[key].content}
                />
            ))}
        </>
    );
};

export default TableActionBtnGroup;
