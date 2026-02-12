import React from 'react';

interface CaseStudyCardProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    noPadding?: boolean;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ children, className = '', id, noPadding = false }) => {
    const paddingClasses = noPadding ? '' : 'p-8 md:p-12';
    return (
        <div
            id={id}
            className={`max-w-[1440px] mx-auto w-full ${paddingClasses} relative z-10 ${className}`}
        >
            {children}
        </div>
    );
};
