import React, {useEffect} from 'react'
import { Navigate,Outlet,useNavigate } from 'react-router'
import swal from 'sweetalert'
function Admin_auth() {
    const aid=sessionStorage.getItem('aid');
return aid?<Outlet/>: <Navigate to="/login" replace />;

}

export default Admin_auth
