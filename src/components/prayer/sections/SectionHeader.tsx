import React from 'react';

interface SectionHeaderProps {
  title: string;
  repeat?: number | null;
  reference?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, repeat, reference }) => (
  <div className="flex justify-between items-center mb-4">
    <h4 className="text-sm font-bold uppercase tracking-wider text-indigo-300/80">
      {title}
      {repeat && repeat > 1 && (
        <span className="ml-1 text-gray-300/70"> — {repeat}x</span>
      )}
    </h4>
    {reference && (
      <span className="text-xs text-gray-300/70 italic">{reference}</span>
    )}
  </div>
);

export default SectionHeader;
