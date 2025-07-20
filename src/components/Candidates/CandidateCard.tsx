import React from 'react';
import { MapPin, Clock, Star, ExternalLink } from 'lucide-react';
import { Candidate } from '../../types';
import { format } from 'date-fns';

interface CandidateCardProps {
  candidate: Candidate;
  onSelect: (candidate: Candidate) => void;
}

const CandidateCard = ({ candidate, onSelect }: CandidateCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-blue-100 text-blue-800';
      case 'screening': return 'bg-yellow-100 text-yellow-800';
      case 'interview': return 'bg-purple-100 text-purple-800';
      case 'assessment': return 'bg-orange-100 text-orange-800';
      case 'offer': return 'bg-green-100 text-green-800';
      case 'hired': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'not_responding': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={candidate.avatar || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1'}
            alt={candidate.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
            <p className="text-sm text-gray-600">{candidate.position}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">{candidate.rating}</span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
            {candidate.status}
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {candidate.skills.slice(0, 3).map((skill) => (
          <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">
            {skill}
          </span>
        ))}
        {candidate.skills.length > 3 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">
            +{candidate.skills.length - 3} more
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{candidate.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{candidate.experience} years</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">${candidate.salary_expectation.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Expected</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Applied {format(new Date(candidate.applied_date), 'MMM d, yyyy')}</p>
            <p className="text-xs text-gray-500">Source: {candidate.source}</p>
          </div>
          <button
            onClick={() => onSelect(candidate)}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
          >
            <span className="text-sm">View Details</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;