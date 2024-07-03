import UserManagement from "../pages/accessmanagment/UserManagement";
import DeleteUser from "../pages/accessmanagment/DeleteUser";
import CreateUser from "../pages/accessmanagment/user-management/CreateUser";
import ViewUser from "../pages/accessmanagment/user-management/ViewUser";
import ChangeUserPassword from "../pages/accessmanagment/user-management/ChangeUserPassword";
import DeactivateUser from "../pages/accessmanagment/DeactivateUser";

export const routes = [
   { path: "/access/user", element: <UserManagement /> },
   { path: "/access/user/deleted", element: <DeleteUser /> },
   { path: "/access/user/create-user", element: <CreateUser /> },
   { path: "/access/user/view-user/:userId", element: <ViewUser /> },
   { path: "/access/user/change-password", element: <ChangeUserPassword /> },
   { path: "/access/user/deactivated", element: <DeactivateUser /> },
];

