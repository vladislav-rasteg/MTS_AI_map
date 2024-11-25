import { FC, ReactNode } from "react";
import { Swiper } from "swiper/react";

interface BlockProps {
    children: ReactNode
}

export const HorizontalSwipeBlock:FC<BlockProps> = (props) => {
    
    const {children} = props
    const remToPx = (rem: number) => rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

    const isMobile = window.innerWidth <= 744

    return(
        <Swiper
            style={{width: "100%"}}
            spaceBetween={10}
            slidesPerView="auto"
            loop={false}
            freeMode={true}
            centeredSlides={false}
            slidesOffsetBefore={remToPx(isMobile ? 1.6 : 6)}
        >
            {children}
        </Swiper>
    )

}