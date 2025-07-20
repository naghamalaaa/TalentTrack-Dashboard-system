import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { mockAnalytics } from '../data/mockData';
import MetricsCard from '../components/Dashboard/MetricsCard';
import { Users, Clock, TrendingUp, Target } from 'lucide-react';

const Analytics = () => {
  const timeToHireData = [
    { month: 'Jan', days: 32 },
    { month: 'Feb', days: 29 },
    { month: 'Mar', days: 31 },
    { month: 'Apr', days: 28 },
    { month: 'May', days: 25 },
    { month: 'Jun', days: 28 },
  ];

  const teamPerformanceData = Object.entries(mockAnalytics.team_performance).map(([name, score]) => ({
    name: name.split(' ')[0],
    score,
  }));

  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
        <p className="text-gray-600 mt-1">Track your recruitment performance and identify areas for improvement</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard
          title="Total Candidates"
          value={mockAnalytics.total_candidates}
          change="12%"
          changeType="increase"
          icon={Users}
          iconColor="text-blue-600"
        />
        <MetricsCard
          title="Active Positions"
          value={mockAnalytics.active_positions}
          change="8%"
          changeType="increase"
          icon={Target}
          iconColor="text-green-600"
        />
        <MetricsCard
          title="Avg. Time to Hire"
          value={`${mockAnalytics.time_to_hire} days`}
          change="5%"
          changeType="decrease"
          icon={Clock}
          iconColor="text-orange-600"
        />
        <MetricsCard
          title="Pipeline Conversion"
          value="10%"
          change="2%"
          changeType="increase"
          icon={TrendingUp}
          iconColor="text-purple-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Time to Hire Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeToHireData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="days" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={teamPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#059669" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Reports */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">247</div>
            <div className="text-sm text-gray-600">Total Applications</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">24</div>
            <div className="text-sm text-gray-600">Successful Hires</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">28</div>
            <div className="text-sm text-gray-600">Days Avg. Hiring Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;