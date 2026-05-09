import {Navigate,Outlet} from 'react-router-dom'
import { useSelector } from 'react-redux';

import React from 'react'

function ProtectedRoute() {
    const {user,loading} = useSelector((state) => state.auth);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

return (
    <div>
      <Outlet />
    </div>
  )
}

export default ProtectedRoute
