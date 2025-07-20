import React from 'react';
import { useState } from 'react';
import { Search, Filter, Plus, Download, FileSpreadsheet } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setSearchQuery } from '../../store/candidatesSlice';
import { toggleFilterPanel } from '../../store/filtersSlice';
import AddCandidateModal from '../Candidates/AddCandidateModal';
import toast from 'react-hot-toast';

const Header = () => {
  const dispatch = useDispatch();
  const { searchQuery, candidates } = useSelector((state: RootState) => state.candidates);
  const { isFilterOpen } = useSelector((state: RootState) => state.filters);
  const [isAddCandidateOpen, setIsAddCandidateOpen] = useState(false);

  const handleExport = () => {
    // Simulate export functionality
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          // Create a simple CSV export
          const csvContent = [
            ['Name', 'Position', 'Status', 'Experience', 'Location', 'Applied Date'],
            ...candidates.map(candidate => [
              candidate.name,
              candidate.position,
              candidate.status,
              `${candidate.experience} years`,
              candidate.location,
              candidate.applied_date
            ])
          ].map(row => row.join(',')).join('\n');
          
          const blob = new Blob([csvContent], { type: 'text/csv' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `candidates_export_${new Date().toISOString().split('T')[0]}.csv`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
          
          resolve('Export completed');
        }, 2000);
      }),
      {
        loading: 'Preparing export...',
        success: 'Candidates exported successfully!',
        error: 'Export failed. Please try again.'
      }
    );
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search candidates, positions, or skills..."
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => dispatch(toggleFilterPanel())}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                isFilterOpen
                  ? 'bg-blue-50 border-blue-200 text-blue-600'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleExport}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <FileSpreadsheet className="w-5 h-5" />
              <span>Export</span>
            </button>
            <button 
              onClick={() => setIsAddCandidateOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Candidate</span>
            </button>
          </div>
        </div>
      </header>
      
      <AddCandidateModal 
        isOpen={isAddCandidateOpen} 
        onClose={() => setIsAddCandidateOpen(false)} 
      />
    </>
  );
};

export default Header;