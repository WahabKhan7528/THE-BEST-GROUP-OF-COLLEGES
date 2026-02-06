import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dropdown = ({ trigger, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center text-neutral-600 hover:text-primary-700 px-3 py-2 rounded-lg text-sm font-semibold bg-white hover:bg-neutral-100 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {trigger}
        <ChevronDown className="ml-1 h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-56 rounded-xl shadow-[0_12px_30px_rgba(0,0,0,0.12)] bg-white ring-1 ring-neutral-200">
          <div className="py-2">
            {items.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary-700 hover:bg-neutral-50 transition"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;