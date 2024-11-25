import { SizedIconLayout } from "../SizedIconLayout";


interface IconProps{
    size?: number;
    fill?: string;
    className?: string;
}

export const TickIcon = (props: IconProps) => {

    const {fill = "--icon-default-color", className} = props;

    let iconColor = fill

    if(fill.startsWith("--")){
        const bodyStyles = window.getComputedStyle(document.body);
        iconColor = bodyStyles.getPropertyValue(fill);
    }

    return(
        <SizedIconLayout iconProps={props}>
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M22.1006 5.98089C22.6635 6.58876 22.627 7.53781 22.0191 8.10065L11.2191 18.1006C10.644 18.6331 9.75597 18.6331 9.18089 18.1006L1.98089 11.434C1.37303 10.8711 1.33653 9.9221 1.89937 9.31423C2.46221 8.70636 3.41125 8.66986 4.01912 9.2327L10.2 14.9557L19.9809 5.89937C20.5888 5.33653 21.5378 5.37303 22.1006 5.98089Z" fill={iconColor} className={className}/>
            </svg>
        </SizedIconLayout>
    )
}