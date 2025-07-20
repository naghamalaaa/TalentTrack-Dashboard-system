import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useAuth = () => {
  const { currentUser, isAuthenticated } = useSelector((state: RootState) => state.user);
  
  return {
    user: currentUser,
    isAuthenticated,
    isHRManager: currentUser?.role === 'senior_hr_manager',
    isRecruiter: currentUser?.role === 'junior_recruiter',
    isDepartmentHead: currentUser?.role === 'department_head',
  };
};