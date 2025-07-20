import React, { useState } from 'react';
import { Calendar, Clock, Video, Phone, MapPin, Plus, Filter, Search } from 'lucide-react';
import { mockInterviews } from '../data/mockData';
import { Interview } from '../types';
import { format, parseISO } from 'date-fns';
import ScheduleInterviewModal from '../components/Interviews/ScheduleInterviewModal';
import EditInterviewModal from '../components/Interviews/EditInterviewModal';

const Interviews = () => {
  const [interviews] = useState<Interview[]>(mockInterviews);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'rescheduled': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      case 'in_person': return <MapPin className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const filteredInterviews = interviews.filter(interview => {
    if (filterStatus !== 'all' && interview.status !== filterStatus) return false;
    if (selectedDate && interview.date !== selectedDate) return false;
    if (searchQuery && !interview.candidate_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !interview.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleEditInterview = (interview: Interview) => {
    setSelectedInterview(interview);
    setIsEditModalOpen(true);
  };

  const upcomingInterviews = filteredInterviews.filter(interview => 
    interview.status === 'scheduled' && new Date(interview.date) >= new Date()
  );

  const pastInterviews = filteredInterviews.filter(interview => 
    interview.status === 'completed' || new Date(interview.date) < new Date()
  );

  const InterviewCard = ({ interview }: { interview: Interview }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            {getTypeIcon(interview.type)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{interview.title}</h3>
            <p className="text-sm text-gray-600">{interview.candidate_name}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(interview.status)}`}>
          {interview.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{format(parseISO(interview.date), 'MMM d, yyyy')}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{interview.time} ({interview.duration} min)</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Interviewer: {interview.interviewer_name}
        </div>
        <div className="flex space-x-2">
          {interview.meeting_link && (
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
              Join Meeting
            </button>
          )}
          <button 
            onClick={() => handleEditInterview(interview)}
            className="px-3 py-1 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50"
          >
            Edit
          </button>
        </div>
      </div>

      {interview.feedback && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Overall Rating:</span>
            <span className="text-sm font-bold text-blue-600">{interview.feedback.overall_rating}/5</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">{interview.feedback.comments}</p>
        </div>
      )}
    </div>
  );

  return (
    <>
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Interview Management</h1>
          <p className="text-gray-600 mt-1">Schedule and manage candidate interviews</p>
        </div>
        <button 
          onClick={() => setIsScheduleModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          <span>Schedule Interview</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search interviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="rescheduled">Rescheduled</option>
          </select>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Upcoming Interviews */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Upcoming Interviews ({upcomingInterviews.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingInterviews.map((interview) => (
            <InterviewCard key={interview.id} interview={interview} />
          ))}
        </div>
        {upcomingInterviews.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No upcoming interviews scheduled</p>
          </div>
        )}
      </div>

      {/* Past Interviews */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Past Interviews ({pastInterviews.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastInterviews.map((interview) => (
            <InterviewCard key={interview.id} interview={interview} />
          ))}
        </div>
        {pastInterviews.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No past interviews found</p>
          </div>
        )}
      </div>
    </div>

    <ScheduleInterviewModal 
      isOpen={isScheduleModalOpen} 
      onClose={() => setIsScheduleModalOpen(false)} 
    />
    
    <EditInterviewModal 
      interview={selectedInterview}
      isOpen={isEditModalOpen} 
      onClose={() => {
        setIsEditModalOpen(false);
        setSelectedInterview(null);
      }} 
    />
    </>
  );
};

export default Interviews;