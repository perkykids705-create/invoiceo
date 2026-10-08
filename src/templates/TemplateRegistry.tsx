import React from 'react';
import { TemplateProps } from './types';
import { Template01Classic } from './Template01Classic';
import { Template02Minimal } from './Template02Minimal';
import { Template03Corporate } from './Template03Corporate';
import { Template04BoldHeader } from './Template04BoldHeader';
import { Template05Sidebar } from './Template05Sidebar';
import { Template06Elegant } from './Template06Elegant';
import { Template07Compact } from './Template07Compact';
import { Template08ModernBusiness } from './Template08ModernBusiness';
import { Template09TopAccent } from './Template09TopAccent';
import { Template10StructuredAccounting } from './Template10StructuredAccounting';
import { Template11TwoColumn } from './Template11TwoColumn';
import { Template12PremiumMinimalist } from './Template12PremiumMinimalist';

export const renderTemplateComponent = (templateId: string, props: TemplateProps): React.ReactElement => {
  switch (templateId) {
    case 'template-02':
      return <Template02Minimal {...props} />;
    case 'template-03':
      return <Template03Corporate {...props} />;
    case 'template-04':
      return <Template04BoldHeader {...props} />;
    case 'template-05':
      return <Template05Sidebar {...props} />;
    case 'template-06':
      return <Template06Elegant {...props} />;
    case 'template-07':
      return <Template07Compact {...props} />;
    case 'template-08':
      return <Template08ModernBusiness {...props} />;
    case 'template-09':
      return <Template09TopAccent {...props} />;
    case 'template-10':
      return <Template10StructuredAccounting {...props} />;
    case 'template-11':
      return <Template11TwoColumn {...props} />;
    case 'template-12':
      return <Template12PremiumMinimalist {...props} />;
    case 'template-01':
    default:
      return <Template01Classic {...props} />;
  }
};
