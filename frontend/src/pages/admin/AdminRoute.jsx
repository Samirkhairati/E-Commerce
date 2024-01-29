import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.isAdmin ?
    (
      <>
        <Outlet />
      </>)
    :
    (
      <>
        {toast.info("You are not authorized to view this page")}
        <Navigate to="/login" replace />
      </>
    );
};
export default AdminRoute;