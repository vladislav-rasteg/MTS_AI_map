import { type InputHTMLAttributes, forwardRef } from 'react'
import s from './TextInput.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'


interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  fullWidth?: boolean
  disabled?: boolean
  error?: string
  on_color?: boolean
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(props, ref){
    const { className, disabled = false, error = '', size = "default", on_color = false, fullWidth = false, ...otherProps } = props
    return (
        <div className={s.input_error_wrapper}>
          <input
            ref={ref}
            className={classNames(s.input, { [s.disabled]: disabled, [s.fullWidth]: fullWidth, [s.error]: error, [s.on_color]: on_color }, [className as string, s[size]])}
            {...otherProps}
          />
          {error && <p className={s.error}>{error}</p>}
        </div>
    )
  }
) 
