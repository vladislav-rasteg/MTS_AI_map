import { type ButtonHTMLAttributes, type FC } from 'react'
import s from './Button.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: "light" | "dark"
  color?: "primary" | "secondary" | "tetrinary" | "ghost" | "dangerous"
  iconOnly?: boolean
  fullWidth?: boolean
  disabled?: boolean
  size?: "default" | "small" | "big",
  isLoading?: boolean
}

export const Button: FC<ButtonProps> = (props) => {
  const { className, children, disabled = false, size = "default", theme = "light", color = "primary", onClick, iconOnly = false, fullWidth = false, isLoading = false, ...otherProps } = props

  return (
      <button
        type = 'button'
        className={classNames(s.button, { [s.disabled]: disabled, [s.iconOnly]: iconOnly, [s.fullWidth]: fullWidth }, [className as string, s[theme], s[color], s[size]])}
        onClick={(e) => {(!isLoading && onClick) && onClick(e)}}
        {...otherProps}
    >
          {isLoading && <div className={s.lds_ring}><div></div><div></div><div></div><div></div></div>}
          {children}
      </button>
  )
}
