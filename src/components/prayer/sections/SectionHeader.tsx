import React from 'react';

interface SectionHeaderProps {
  title: string;
  repeat?: number | null;
  reference?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, repeat, reference }) => (
  <div className="flex justify-between items-center mb-3">
    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
      {title}
      {repeat && repeat > 1 && (
        <span className="ml-1 text-gray-400"> — {repeat}x</span>
      )}
    </h4>
    {reference && (
      <span className="text-[10px] text-gray-400 italic">{reference}</span>
    )}
  </div>
);

export default SectionHeader;
