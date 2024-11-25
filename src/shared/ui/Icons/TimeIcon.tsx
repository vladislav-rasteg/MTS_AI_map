import { SizedIconLayout } from "../SizedIconLayout";


interface IconProps{
    size?: number;
    fill?: string;
    className?: string;
}

export const TimeIcon = (props: IconProps) => {

    const {fill = "--icon-default-color", className} = props;

    const bodyStyles = window.getComputedStyle(document.body);
    const iconColor = bodyStyles.getPropertyValue(fill);

    return(
        <SizedIconLayout iconProps={props}>
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.3496 16.41C15.6451 16.6854 16.1056 16.6772 16.3913 16.3916C16.6769 16.106 16.685 15.6455 16.4096 15.35L12.6296 11.57L12.6296 6.88C12.6296 6.46579 12.2938 6.13 11.8796 6.13C11.4654 6.13 11.1296 6.46579 11.1296 6.88L11.1296 11.88C11.1298 12.0788 11.2089 12.2695 11.3496 12.41L15.3496 16.41Z" fill={iconColor} className={className}/>
                <path fillRule="evenodd" clipRule="evenodd" d="M13.9996 22L9.75964 22C7.6379 22 5.60307 21.1571 4.10278 19.6569C2.60249 18.1566 1.75964 16.1217 1.75964 14L1.75964 9.76C1.75964 5.34172 5.34136 1.76 9.75964 1.76L13.9996 1.76C18.4179 1.76 21.9996 5.34172 21.9996 9.76L21.9996 14C21.9996 18.4183 18.4179 22 13.9996 22ZM9.75964 3.26C6.17207 3.26551 3.26514 6.17243 3.25964 9.76L3.25964 14C3.26514 17.5876 6.17207 20.4945 9.75964 20.5L13.9996 20.5C17.5872 20.4945 20.4941 17.5876 20.4996 14L20.4996 9.76C20.4941 6.17243 17.5872 3.26551 13.9996 3.26L9.75964 3.26Z" fill={iconColor} className={className}/>
            </svg>
        </SizedIconLayout>
    )
}