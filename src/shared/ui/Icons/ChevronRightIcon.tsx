import { SizedIconLayout } from "../SizedIconLayout";


interface IconProps{
    size?: number;
    fill?: string;
    className?: string;
}

export const ChevronRightIcon = (props: IconProps) => {

    const {fill = "--icon-default-color", className} = props;

    const bodyStyles = window.getComputedStyle(document.body);
    const iconColor = bodyStyles.getPropertyValue(fill);

    return(
        <SizedIconLayout iconProps={props}>
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.95855 20.5621C6.25226 19.8697 6.18606 18.7773 6.76782 18.0087L6.79299 17.9754L6.9291 17.8209L12.8668 12.0001L6.95857 6.20826C6.25228 5.51585 6.18606 4.42342 6.76782 3.65478L6.79298 3.62153L6.92909 3.46697L6.95855 3.43809C7.65617 2.75418 8.73614 2.69598 9.50055 3.25201L9.53398 3.27632L9.69109 3.40929L17.0414 10.615C17.7477 11.3074 17.8139 12.3999 17.2321 13.1685L17.2069 13.2017L17.0708 13.3563L9.72047 20.5621C8.95528 21.3123 7.72374 21.3123 6.95855 20.5621Z" fill={iconColor} className={className}/>
            </svg>
        </SizedIconLayout>
    )
}