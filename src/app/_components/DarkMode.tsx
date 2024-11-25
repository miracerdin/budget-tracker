import { useContext } from 'react';
import { BudgetContext } from '@/context/BudgetContext';
import { BsSun, BsMoon } from 'react-icons/bs';

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useContext(BudgetContext);

  return (
    <div className="flex items-center space-x-4">
      {isDarkMode ? (
        <BsSun
          onClick={toggleDarkMode}
          className="text-3xl cursor-pointer text-yellow-500 transition-colors hover:text-yellow-400"
        />
      ) : (
        <BsMoon
          onClick={toggleDarkMode}
          className="text-3xl cursor-pointer text-blue-500 transition-colors hover:text-blue-400"
        />
      )}
    </div>
  );
};

export default DarkModeToggle;
