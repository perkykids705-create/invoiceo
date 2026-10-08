import React from 'react';
import { InvoiceData } from '../types/invoice';

interface TemplateLogoProps {
  invoice: InvoiceData;
  className?: string;
  imgClassName?: string;
  positionOverride?: 'left' | 'center' | 'right';
}

export const TemplateLogo: React.FC<TemplateLogoProps> = ({
  invoice,
  className = '',
  imgClassName = 'max-h-16 max-w-[200px] object-contain',
  positionOverride,
}) => {
  if (!invoice.business.logo) return null;

  const position = positionOverride || invoice.customization?.logoPosition || 'left';

  const justifyClass =
    position === 'center'
      ? 'justify-center text-center'
      : position === 'right'
      ? 'justify-end text-right'
      : 'justify-start text-left';

  return (
    <div className={`flex items-center ${justifyClass} w-full ${className}`}>
      <img
        src={invoice.business.logo}
        alt={invoice.business.name || 'Company Logo'}
        className={`${imgClassName} ${
          position === 'center' ? 'mx-auto' : position === 'right' ? 'ml-auto mr-0' : 'mr-auto ml-0'
        }`}
      />
    </div>
  );
};
