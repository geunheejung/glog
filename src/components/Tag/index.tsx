import React, { useCallback } from 'react';
import './styles.css';

interface IProps {
  tag: string;
  index: number;
  onTag: (index: number) => void;
}

const Tag: React.VFC<IProps> = ({ tag, index, onTag }) => {
  const handleClick = useCallback(() => {
    onTag(index);
  }, [tag, index]);
  return (
    <div onClick={handleClick} className="tag-item">
      {tag}
    </div>
  );
};

export default Tag;
