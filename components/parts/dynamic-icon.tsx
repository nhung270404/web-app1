'use client';

import { FC } from 'react';
import * as LucideIcons from 'lucide-react';
import { LucideProps } from 'lucide-react';

interface DynamicIconProps extends LucideProps {
  name: string;
}

const DynamicIcon: FC<DynamicIconProps> = ({ name, ...props }) => {
  const IconComponent = LucideIcons[name as keyof typeof LucideIcons] as FC<LucideProps>;

  if (!IconComponent) {
    // Fallback khi không tìm thấy icon
    return null;
  }

  return <IconComponent {...props} />;
};

export default DynamicIcon;