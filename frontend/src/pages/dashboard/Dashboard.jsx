import React from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";

const Dashboard = () => {
  return (
    <DashboardLayout header="Dashboard">
      <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200" />
        <div className="bg-white rounded-xl border border-gray-200" />
        <div className="bg-white rounded-xl border border-gray-200" />
        <div className="col-span-3 bg-white rounded-xl border border-gray-200" />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
