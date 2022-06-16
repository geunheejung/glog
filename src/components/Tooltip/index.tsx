import React from 'react';
import './styles.css';

interface IProps {
  children: React.ReactNode;
  isOpen: boolean;
}

const Tooltip: React.FC<IProps> = ({ isOpen, children }) => {
  return (
    <div className="tooltip">
      <div className={`inside ${isOpen ? 'on' : ''}`}>{children}</div>
    </div>
  );
};

export default Tooltip;
