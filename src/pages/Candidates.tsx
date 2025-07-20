import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import CandidateCard from '../components/Candidates/CandidateCard';
import CandidateDetailsModal from '../components/Candidates/CandidateDetailsModal';
import { Candidate } from '../types';

const Candidates = () => {
  const { candidates, searchQuery } = useSelector((state: RootState) => state.candidates);
  const { filters } = useSelector((state: RootState) => state.filters);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Filter candidates based on search query and filters
  const filteredCandidates = candidates.filter(candidate => {
    // Search filter
    if (searchQuery && !candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !candidate.position.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }

    // Skills filter
    if (filters.skills?.length && !filters.skills.some(skill => candidate.skills.includes(skill))) {
      return false;
    }

    // Experience filter
    if (filters.experience?.min && candidate.experience < filters.experience.min) {
      return false;
    }
    if (filters.experience?.max && candidate.experience > filters.experience.max) {
      return false;
    }

    // Location filter
    if (filters.location?.length && !filters.location.includes(candidate.location)) {
      return false;
    }

    // Status filter
    if (filters.status?.length && !filters.status.includes(candidate.status)) {
      return false;
    }

    // Source filter
    if (filters.source?.length && !filters.source.includes(candidate.source)) {
      return false;
    }

    return true;
  });

  const handleCandidateSelect = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsModalOpen(false);
    setSelectedCandidate(null);
  };

  return (
    <>
      <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Candidates</h1>
        <p className="text-gray-600 mt-1">
          {filteredCandidates.length} candidates found
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            onSelect={handleCandidateSelect}
          />
        ))}
      </div>

      {filteredCandidates.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">No candidates found</div>
          <p className="text-gray-500 mt-2">Try adjusting your search criteria or filters</p>
        </div>
      )}
      </div>

      <CandidateDetailsModal
        candidate={selectedCandidate}
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetails}
      />
    </>
  );
};

export default Candidates;