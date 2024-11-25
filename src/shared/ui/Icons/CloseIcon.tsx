import { SizedIconLayout } from "../SizedIconLayout";


interface IconProps{
    size?: number;
    fill?: string;
    className?: string;
}

export const CloseIcon = (props: IconProps) => {

    const {fill = "--icon-default-color", className} = props;

    let iconColor = fill

    if(fill.startsWith("--")){
        const bodyStyles = window.getComputedStyle(document.body);
        iconColor = bodyStyles.getPropertyValue(fill);
    }

    return(
        <SizedIconLayout iconProps={props}>
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="19.6909" y="2.71948" width="3.2" height="24" rx="1.6" transform="rotate(45 19.6909 2.71948)" fill={iconColor} className={className}/>
                <rect x="21.2847" y="19.6915" width="3.2" height="24" rx="1.6" transform="rotate(135 21.2847 19.6915)" fill={iconColor} className={className}/>
            </svg>
        </SizedIconLayout>
    )
}