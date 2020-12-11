import React from 'react';

type AlertProps = {
  isVisible: boolean;
  type?: 'info' | 'error';
  children?: string;
};

export const Alert: React.FC<AlertProps> = ({
  isVisible,
  children,
}: AlertProps) => {
  if (!isVisible) {
    return null;
  }

  return <p>{children}</p>;
};
