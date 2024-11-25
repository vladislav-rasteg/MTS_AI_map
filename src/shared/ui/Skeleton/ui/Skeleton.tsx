import React from 'react';
import s from './Skeleton.module.scss';
import { classNames } from 'src/shared/lib/classNames/classNames';

interface SkeletonProps {
  type?: 'circle' | 'line' | 'block';
  className: string
}

export const Skeleton: React.FC<SkeletonProps> = ({ type = 'block', className }) => {
  return (
    <div
      className={classNames(s.skeleton, {}, [className as string, s[type]])}
    />
  );
};
