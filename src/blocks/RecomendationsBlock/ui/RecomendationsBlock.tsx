import { Typography } from "src/shared/ui/Typography"
import s from "./RecomendationsBlock.module.scss"
import { useGetRecomendationsQuery } from "src/shared/api/RecomendationAPI";
import { HorizontalSwipeBlock } from "src/shared/ui/HorizontalSwipeBlock";
import { EventCard } from "src/feautures/Event/ui/EventCard/ui/EventCard";
import { SwiperSlide } from "swiper/react";

export const RecomendationsBlock = () => {

    const city = localStorage.getItem("city_id_str") || 'moscow';
    const session = localStorage.getItem("session") || '';
    const { data: recommendations, isLoading, error } = useGetRecomendationsQuery({ city, session });

    if(error) return <div>error</div>

    if(!isLoading && recommendations?.length === 0) return null

    return(
        <div className={s.block}>
            <Typography variant="p1" color="secondary" className={s.heading}>Рекомендации вам</Typography>
            <HorizontalSwipeBlock>
                {   !isLoading ?
                        (recommendations && recommendations.length > 0) &&
                        recommendations.map((event, index) => 
                            <SwiperSlide key={"recomendations_"+event.id_str + index} style={{ width: 'auto' }}>
                                <EventCard size="medium" event={event} />
                            </SwiperSlide>
                        )
                    :
                    Array.from({ length: 10 }).map((_, index) => 
                        <SwiperSlide key={index} style={{ width: 'auto' }}>
                            <EventCard size="medium" />
                        </SwiperSlide>
                    )
                }
            </HorizontalSwipeBlock>
        </div>
    )
}