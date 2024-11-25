import { SizedIconLayout } from "../SizedIconLayout";


interface IconProps{
    size?: number;
    fill?: string;
    className?: string;
}

export const CartIcon = (props: IconProps) => {

    const {fill = "--icon-default-color", className} = props;

    const bodyStyles = window.getComputedStyle(document.body);
    const iconColor = bodyStyles.getPropertyValue(fill);

    return(
        <SizedIconLayout iconProps={props}>
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.88728 2H3.07031L3.12946 2.01134C4.76933 2.04184 6.2022 3.0814 6.67856 4.58627L6.91517 5.36896H19.2542C20.3438 5.37371 21.3785 5.82839 22.0935 6.61672C22.8065 7.41004 23.122 8.46266 22.9571 9.49791L22.2473 14.194C22.0109 15.9941 20.4246 17.3503 18.5326 17.3701H11.5763C9.91451 17.3642 8.45103 16.3199 7.96807 14.7952L4.97499 5.1194C4.7458 4.28928 3.96587 3.70868 3.07031 3.70149H1.88728C1.39725 3.70149 1 3.3206 1 2.85075C1 2.38089 1.39725 2 1.88728 2ZM9.67164 14.2507C9.92277 15.0584 10.6974 15.612 11.5763 15.6119H18.5326C19.5117 15.6018 20.3409 14.9169 20.4964 13.9899L21.2062 9.28239C21.3029 8.73443 21.1453 8.17332 20.7747 7.74603C20.4041 7.31874 19.8574 7.06786 19.2779 7.0591H7.44754L9.67164 14.2507Z" fill={iconColor} className={className}/>
                <path d="M11.3042 18.7313C10.6509 18.7313 10.1212 19.2392 10.1212 19.8657C10.1212 20.4921 10.6509 21 11.3042 21C11.9576 21 12.4873 20.4921 12.4873 19.8657C12.4873 19.2392 11.9576 18.7313 11.3042 18.7313Z" fill={iconColor} className={className}/>
                <path d="M18.4024 18.7313C17.7491 18.7313 17.2194 19.2392 17.2194 19.8657C17.2194 20.4921 17.7491 21 18.4024 21C19.0558 21 19.5855 20.4921 19.5855 19.8657C19.5855 19.2392 19.0558 18.7313 18.4024 18.7313Z" fill={iconColor} className={className}/>
            </svg>
        </SizedIconLayout>
    )
}