import React from 'react';
import StatCard from '../../components/DashboardComponents/Cards';
import LineChart from '../../components/DashboardComponents/LineChart';
import NotificationPanel from '../../components/DashboardComponents/NotificationPanel';
import RecentApplicants from '../../components/DashboardComponents/RecentApplicants';
import Images from '../../assets/Images';
import RecentPraposals from '../../components/DashboardComponents/RecentPraposals';

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2  lg:grid-cols-4 gap-6">
        <StatCard
          title="Earning to Date"
          value="₹80"
          img={Images.Card1}
          color="bg-purple-500"
        />
        <StatCard
          title="Avg. Selling Price"
          value="₹192"
          img={Images.Card2}
          color="bg-purple-500"
        />
        <StatCard
          title="On-Time Delivery"
          value="80%"
          img={Images.Card3}
          color="bg-purple-500"
        />
        <StatCard
          title="Orders Completed"
          value="80"
          img={Images.Card4}
          color="bg-purple-500"
        />
      </div>

      {/* Chart and Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LineChart />
        </div>
        <div>
          <NotificationPanel />
        </div>
      </div>

      {/* Milestone Table */}
      <div className="overflow-x-auto w-full">
        <RecentApplicants />
      </div>

      {/* Recent Service Orders */}
      <div className="overflow-x-auto w-full">
        <RecentPraposals />
      </div>
    </div>
  );
};

export default Dashboard;
