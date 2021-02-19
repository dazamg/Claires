import React from "react";
import AdminNav from '../nav/AdminNav'

const AdminDashboard = () => {

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div>
          <h4 className="text-center mm">Admin Dashboard</h4>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
