import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Users, Calendar, TrendingUp, Clock, Award, Target } from 'lucide-react';
import { setCurrentUser } from '../store/userSlice';
import { setCandidates } from '../store/candidatesSlice';
import { mockUser, mockCandidates, mockAnalytics } from '../data/mockData';
import MetricsCard from '../components/Dashboard/MetricsCard';
import PipelineChart from '../components/Dashboard/PipelineChart';
import SourceChart from '../components/Dashboard/SourceChart';

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize mock data
    dispatch(setCurrentUser(mockUser));
    dispatch(setCandidates(mockCandidates));
  }, [dispatch]);

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold">Welcome back, {mockUser.name}!</h1>
        <p className="mt-2 opacity-90">Here's what's happening with your recruitment pipeline today.</p>
      </div>

      {/* Metrics Grid */}
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
          title="Interviews This Week"
          value={mockAnalytics.interviews_scheduled}
          change="15%"
          changeType="increase"
          icon={Calendar}
          iconColor="text-purple-600"
        />
        <MetricsCard
          title="Avg. Time to Hire"
          value={`${mockAnalytics.time_to_hire} days`}
          change="5%"
          changeType="decrease"
          icon={Clock}
          iconColor="text-orange-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PipelineChart data={mockAnalytics.pipeline_conversion} />
        <SourceChart data={mockAnalytics.source_effectiveness} />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">Ahmed Hassan moved to Interview stage</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">New candidate Fatima Al-Zahra applied for UX Designer position</p>
              <p className="text-xs text-gray-500">4 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">Interview scheduled with Omar Khalil for tomorrow</p>
              <p className="text-xs text-gray-500">6 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;