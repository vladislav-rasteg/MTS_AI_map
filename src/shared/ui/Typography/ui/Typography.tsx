import { type FC } from 'react'
import s from './Typography.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { TypographyProps } from '@arco-design/web-react'


interface ITypographyProps extends TypographyProps {
  className?: string
  theme?: "light" | "dark"
  color?: "primary" | "secondary" | "tetrinary" | "invert" | "dangerous" | "brand"
  variant?: "h1" | "h2" | "h3" | "p1" | "p2" | "p3" | "p4"
  wide?: boolean
  ref?: any
}

export const Typography: FC<ITypographyProps> = (props) => {
  const { className, children, theme = '', color = "primary", variant =  "p1", wide = false, ref, ...otherProps } = props

  if(variant[0] === 'p'){
    return(
        <p
            className={classNames(s.typography, {}, [className as string, s[theme], s[color], s[variant]])}
            {...otherProps}
            ref={ref}
        >
            {children}
        </p>
    )
  } else {
    return (
            <h1
                className={classNames(s.typography, {[s.wide]: wide}, [className as string, s[theme], s[color], s[variant]])}
                {...otherProps}
            >
                {children}
            </h1>
    )
    }
}
