import { ReactNode, type FC } from 'react'
import s from './InputGroup.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'


interface InputProps {
  className?: string
  gap?: 's' | 'm' | 'l'
  children: ReactNode
}

export const InputGroup: FC<InputProps> = (props) => {
  const { className, children, gap = 'medium', ...otherProps } = props

  return (
      <div
        className={classNames(s.input_group, {}, [className as string, s[gap]])}
        {...otherProps}
    >
          {children}
      </div>
  )
}
