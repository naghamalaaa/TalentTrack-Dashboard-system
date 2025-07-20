import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, Calendar, Clock, Video, Phone, MapPin, User, Plus, Link, Bell } from 'lucide-react';
import { RootState } from '../../store';
import { Interview, Candidate } from '../../types';
import toast from 'react-hot-toast';
import { format, addDays } from 'date-fns';

interface ScheduleInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateId?: string;
}

const ScheduleInterviewModal = ({ isOpen, onClose, candidateId }: ScheduleInterviewModalProps) => {
  const dispatch = useDispatch();
  const { candidates } = useSelector((state: RootState) => state.candidates);
  const { currentUser } = useSelector((state: RootState) => state.user);
  
  const [formData, setFormData] = useState({
    candidate_id: candidateId || '',
    title: '',
    date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    time: '14:00',
    duration: 60,
    type: 'video' as 'phone' | 'video' | 'in_person',
    interviewer_id: currentUser?.id || '1',
    location: '',
    meeting_link: '',
    notes: '',
    send_reminders: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const interviewers = [
    { id: '1', name: 'Sarah Johnson', role: 'Senior HR Manager', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1' },
    { id: '2', name: 'Mike Chen', role: 'Technical Lead', avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1' },
    { id: '3', name: 'Emma Rodriguez', role: 'HR Specialist', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1' },
    { id: '4', name: 'David Kim', role: 'Department Head', avatar: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1' }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  const durationOptions = [
    { value: 30, label: '30 minutes' },
    { value: 45, label: '45 minutes' },
    { value: 60, label: '1 hour' },
    { value: 90, label: '1.5 hours' },
    { value: 120, label: '2 hours' }
  ];

  const interviewTemplates = [
    { id: 'technical', name: 'Technical Interview', duration: 90 },
    { id: 'behavioral', name: 'Behavioral Interview', duration: 60 },
    { id: 'cultural', name: 'Cultural Fit Interview', duration: 45 },
    { id: 'final', name: 'Final Interview', duration: 60 },
    { id: 'phone_screening', name: 'Phone Screening', duration: 30 }
  ];

  const selectedCandidate = candidates.find(c => c.id === formData.candidate_id);
  const selectedInterviewer = interviewers.find(i => i.id === formData.interviewer_id);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              name === 'duration' ? parseInt(value) : value
    }));
  };

  const generateMeetingLink = () => {
    if (formData.type === 'video') {
      const meetingId = Math.random().toString(36).substring(2, 15);
      setFormData(prev => ({
        ...prev,
        meeting_link: `https://meet.google.com/${meetingId}`
      }));
      toast.success('Meeting link generated!');
    }
  };

  const applyTemplate = (template: typeof interviewTemplates[0]) => {
    setFormData(prev => ({
      ...prev,
      title: `${template.name} - ${selectedCandidate?.position || 'Position'}`,
      duration: template.duration
    }));
  };

  const validateForm = () => {
    if (!formData.candidate_id) {
      toast.error('Please select a candidate');
      return false;
    }
    if (!formData.title.trim()) {
      toast.error('Interview title is required');
      return false;
    }
    if (!formData.date) {
      toast.error('Interview date is required');
      return false;
    }
    if (!formData.time) {
      toast.error('Interview time is required');
      return false;
    }
    if (formData.type === 'in_person' && !formData.location.trim()) {
      toast.error('Location is required for in-person interviews');
      return false;
    }
    if (formData.type === 'video' && !formData.meeting_link.trim()) {
      toast.error('Meeting link is required for video interviews');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newInterview: Interview = {
        id: `interview_${Date.now()}`,
        candidate_id: formData.candidate_id,
        candidate_name: selectedCandidate?.name || '',
        interviewer_id: formData.interviewer_id,
        interviewer_name: selectedInterviewer?.name || '',
        title: formData.title,
        date: formData.date,
        time: formData.time,
        duration: formData.duration,
        type: formData.type,
        status: 'scheduled',
        location: formData.location,
        meeting_link: formData.meeting_link,
        notes: formData.notes,
        reminders_sent: false
      };

      // In a real app, this would dispatch to Redux store
      console.log('New interview scheduled:', newInterview);
      
      toast.success('Interview scheduled successfully! All participants have been notified.');
      onClose();
      
      // Reset form
      setFormData({
        candidate_id: candidateId || '',
        title: '',
        date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
        time: '14:00',
        duration: 60,
        type: 'video',
        interviewer_id: currentUser?.id || '1',
        location: '',
        meeting_link: '',
        notes: '',
        send_reminders: true
      });
    } catch (error) {
      toast.error('Failed to schedule interview. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Schedule Interview</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Interview Templates */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Quick Templates</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {interviewTemplates.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => applyTemplate(template)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
                >
                  <div className="font-medium">{template.name}</div>
                  <div className="text-xs text-gray-500">{template.duration} min</div>
                </button>
              ))}
            </div>
          </div>

          {/* Candidate Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Candidate <span className="text-red-500">*</span>
            </label>
            <select
              name="candidate_id"
              value={formData.candidate_id}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select a candidate</option>
              {candidates.map((candidate) => (
                <option key={candidate.id} value={candidate.id}>
                  {candidate.name} - {candidate.position}
                </option>
              ))}
            </select>
            {selectedCandidate && (
              <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedCandidate.avatar || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1'}
                    alt={selectedCandidate.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{selectedCandidate.name}</div>
                    <div className="text-sm text-gray-600">{selectedCandidate.position}</div>
                    <div className="text-sm text-gray-500">{selectedCandidate.email}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Interview Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interview Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Technical Interview - Frontend Developer"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interviewer <span className="text-red-500">*</span>
              </label>
              <select
                name="interviewer_id"
                value={formData.interviewer_id}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                {interviewers.map((interviewer) => (
                  <option key={interviewer.id} value={interviewer.id}>
                    {interviewer.name} - {interviewer.role}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                min={format(new Date(), 'yyyy-MM-dd')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time <span className="text-red-500">*</span>
              </label>
              <select
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                {timeSlots.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {durationOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Interview Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Interview Type <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-4">
              <label className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                formData.type === 'video' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'
              }`}>
                <input
                  type="radio"
                  name="type"
                  value="video"
                  checked={formData.type === 'video'}
                  onChange={handleInputChange}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <Video className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Video Call</span>
              </label>

              <label className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                formData.type === 'phone' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'
              }`}>
                <input
                  type="radio"
                  name="type"
                  value="phone"
                  checked={formData.type === 'phone'}
                  onChange={handleInputChange}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <Phone className="w-5 h-5 text-green-600" />
                <span className="font-medium">Phone Call</span>
              </label>

              <label className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                formData.type === 'in_person' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'
              }`}>
                <input
                  type="radio"
                  name="type"
                  value="in_person"
                  checked={formData.type === 'in_person'}
                  onChange={handleInputChange}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <MapPin className="w-5 h-5 text-purple-600" />
                <span className="font-medium">In Person</span>
              </label>
            </div>
          </div>

          {/* Location or Meeting Link */}
          {formData.type === 'in_person' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Conference Room A, 5th Floor"
                required
              />
            </div>
          )}

          {formData.type === 'video' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meeting Link <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-2">
                <input
                  type="url"
                  name="meeting_link"
                  value={formData.meeting_link}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://meet.google.com/abc-defg-hij"
                  required
                />
                <button
                  type="button"
                  onClick={generateMeetingLink}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-1"
                >
                  <Link className="w-4 h-4" />
                  <span>Generate</span>
                </button>
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interview Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add any specific instructions, questions to focus on, or preparation notes..."
            />
          </div>

          {/* Reminders */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="send_reminders"
              name="send_reminders"
              checked={formData.send_reminders}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="send_reminders" className="flex items-center space-x-2 text-sm text-gray-700">
              <Bell className="w-4 h-4" />
              <span>Send automated reminders to all participants</span>
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Scheduling...</span>
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Interview</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleInterviewModal;