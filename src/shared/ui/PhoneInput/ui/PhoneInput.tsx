import './PhoneInput.scss'
import PhoneInput, { Value } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { classNames } from 'src/shared/lib/classNames/classNames'

interface IPhoneInput{
    value: string | undefined
    onChange: (value?: Value) => void
    theme?: "light" | "dark"
    on_color?: boolean
}

export const CustomPhoneInput = ({value, onChange, theme, on_color = false}: IPhoneInput) => {
    return(
        <PhoneInput 
            international
            autoComplete='no'
            defaultCountry="RU"
            value={value}
            onChange={onChange}
            className={classNames("phone_input", {"phone_input_on_color": on_color}, [theme as string])}
        />
    )
}