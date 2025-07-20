import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, Search } from 'lucide-react';
import { RootState } from '../../store';
import { setFilters, clearFilters, toggleFilterPanel } from '../../store/filtersSlice';

const FilterPanel = () => {
  const dispatch = useDispatch();
  const { filters, isFilterOpen } = useSelector((state: RootState) => state.filters);

  if (!isFilterOpen) return null;

  const skillOptions = ['React', 'TypeScript', 'Python', 'Node.js', 'SQL', 'GraphQL', 'Figma', 'Adobe XD'];
  const locationOptions = ['Dubai, UAE', 'Riyadh, Saudi Arabia', 'Abu Dhabi, UAE', 'Kuwait City, Kuwait'];
  const statusOptions = ['applied', 'screening', 'interview', 'assessment', 'offer', 'hired', 'rejected', 'not_responding'];
  const sourceOptions = ['LinkedIn', 'Company Website', 'Indeed', 'Referral', 'Other'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
      <div className="w-80 bg-white h-full overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Filter Candidates</h2>
            <button
              onClick={() => dispatch(toggleFilterPanel())}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Skills</label>
            <div className="space-y-2">
              {skillOptions.map((skill) => (
                <label key={skill} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.skills?.includes(skill) || false}
                    onChange={(e) => {
                      const currentSkills = filters.skills || [];
                      const newSkills = e.target.checked
                        ? [...currentSkills, skill]
                        : currentSkills.filter(s => s !== skill);
                      dispatch(setFilters({ skills: newSkills }));
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{skill}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Experience (years)</label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Min"
                value={filters.experience?.min || ''}
                onChange={(e) => dispatch(setFilters({ 
                  experience: { ...filters.experience, min: parseInt(e.target.value) || 0 } 
                }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.experience?.max || ''}
                onChange={(e) => dispatch(setFilters({ 
                  experience: { ...filters.experience, max: parseInt(e.target.value) || 100 } 
                }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Location</label>
            <div className="space-y-2">
              {locationOptions.map((location) => (
                <label key={location} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.location?.includes(location) || false}
                    onChange={(e) => {
                      const currentLocations = filters.location || [];
                      const newLocations = e.target.checked
                        ? [...currentLocations, location]
                        : currentLocations.filter(l => l !== location);
                      dispatch(setFilters({ location: newLocations }));
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{location}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Status</label>
            <div className="space-y-2">
              {statusOptions.map((status) => (
                <label key={status} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.status?.includes(status) || false}
                    onChange={(e) => {
                      const currentStatuses = filters.status || [];
                      const newStatuses = e.target.checked
                        ? [...currentStatuses, status]
                        : currentStatuses.filter(s => s !== status);
                      dispatch(setFilters({ status: newStatuses }));
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 capitalize">{status}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Source */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Source</label>
            <div className="space-y-2">
              {sourceOptions.map((source) => (
                <label key={source} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.source?.includes(source) || false}
                    onChange={(e) => {
                      const currentSources = filters.source || [];
                      const newSources = e.target.checked
                        ? [...currentSources, source]
                        : currentSources.filter(s => s !== source);
                      dispatch(setFilters({ source: newSources }));
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{source}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex space-x-3">
            <button
              onClick={() => dispatch(clearFilters())}
              className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Clear All
            </button>
            <button
              onClick={() => dispatch(toggleFilterPanel())}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;