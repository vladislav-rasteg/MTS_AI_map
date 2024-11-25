import { SizedIconLayout } from "../SizedIconLayout";


interface IconProps{
    size?: number;
    fill?: string;
    className?: string;
}

export const ChevronLeftIcon = (props: IconProps) => {

    const {fill = "--icon-default-color", className} = props;

    let iconColor = fill

    if(fill.startsWith("--")){
        const bodyStyles = window.getComputedStyle(document.body);
        iconColor = bodyStyles.getPropertyValue(fill);
    }

    return(
        <SizedIconLayout iconProps={props}>
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.5002 22.0003C16.1027 21.9989 15.7218 21.8408 15.4402 21.5603L7.44018 13.5603C7.1568 13.2804 6.99731 12.8987 6.99731 12.5003C6.99731 12.102 7.1568 11.7203 7.44018 11.4403L15.4402 3.44035C15.8141 3.03904 16.3773 2.87385 16.9088 3.00958C17.4402 3.1453 17.8552 3.5603 17.9909 4.09177C18.1267 4.62324 17.9615 5.18641 17.5602 5.56035L10.6202 12.5003L17.5602 19.4403C17.8435 19.7203 18.003 20.102 18.003 20.5003C18.003 20.8987 17.8435 21.2804 17.5602 21.5603C17.2785 21.8408 16.8976 21.9989 16.5002 22.0003Z" fill={iconColor} className={className}/>
            </svg>
        </SizedIconLayout>
    )
}