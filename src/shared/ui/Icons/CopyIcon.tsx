import { SizedIconLayout } from "../SizedIconLayout";

interface IconProps{
    size?: number;
    className?: string;
    fill?: string;
}

export const CopyIcon = (props: IconProps) => {

    const {fill = "--icon-default-color", className} = props;

    let iconColor = fill

    if(fill.startsWith("--")){
        const bodyStyles = window.getComputedStyle(document.body);
        iconColor = bodyStyles.getPropertyValue(fill);
    }

    return(
        <SizedIconLayout iconProps={props}>
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.24 2H11.346C9.582 2 8.184 2 7.091 2.148C5.965 2.3 5.054 2.62 4.336 3.341C3.617 4.062 3.298 4.977 3.147 6.107C3 7.205 3 8.608 3 10.379V16.217C3 17.725 3.92 19.017 5.227 19.559C5.16 18.649 5.16 17.374 5.16 16.312V11.302C5.16 10.021 5.16 8.916 5.278 8.032C5.405 7.084 5.691 6.176 6.425 5.439C7.159 4.702 8.064 4.415 9.008 4.287C9.888 4.169 10.988 4.169 12.265 4.169H15.335C16.611 4.169 17.709 4.169 18.59 4.287C18.3261 3.61329 17.8653 3.03474 17.2678 2.62678C16.6702 2.21883 15.9635 2.00041 15.24 2Z" fill={iconColor} className={className} />
                <path d="M6.59961 11.3973C6.59961 8.67126 6.59961 7.30826 7.44361 6.46126C8.28661 5.61426 9.64361 5.61426 12.3596 5.61426H15.2396C17.9546 5.61426 19.3126 5.61426 20.1566 6.46126C21.0006 7.30826 20.9996 8.67126 20.9996 11.3973V16.2173C20.9996 18.9433 20.9996 20.3063 20.1566 21.1533C19.3126 22.0003 17.9546 22.0003 15.2396 22.0003H12.3596C9.64461 22.0003 8.28661 22.0003 7.44361 21.1533C6.59961 20.3063 6.59961 18.9433 6.59961 16.2173V11.3973Z" fill={iconColor} className={className} />
            </svg>
        </SizedIconLayout>
    )
}