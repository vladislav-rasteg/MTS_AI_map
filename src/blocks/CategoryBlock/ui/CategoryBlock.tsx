import s from "./CategoryBlock.module.scss"
import { useAppSelector } from "src/app/hooks/redux";
import { useGetCategoryQuery } from "src/shared/api/RecomendationAPI";
import { Typography } from "src/shared/ui/Typography";
import { ChevronRightIcon } from "src/shared/ui/Icons/ChevronRightIcon";
import { EventCard } from "src/feautures/Event/ui/EventCard/ui/EventCard";
import { SwiperSlide } from "swiper/react";
import { HorizontalSwipeBlock } from "src/shared/ui/HorizontalSwipeBlock";
import { Skeleton } from "src/shared/ui/Skeleton";
import { Loader } from "src/shared/ui/Loader";

export const CategoryBlock = () => {

    const { currentProfile } = useAppSelector(state => state.ProfileReducer);
    const city = localStorage.getItem("city_id_str") || 'moscow';
    const session = localStorage.getItem("session") || '';
    const {data, isLoading} = useGetCategoryQuery({city, session})
    
    if(!currentProfile.city && !data?.length)
        return(
            <Loader />
        )
    
    if(!isLoading && !data?.length) return null

    return(
        <div className={s.block}>
            {
                data?.length ?
                    data.map((eventCategoty) => 
                        <div className={s.category} key={eventCategoty.category}>
                            <div className={s.category_header}>
                                <Typography variant="p1" color="secondary">{eventCategoty.category}</Typography>
                                <a className={s.all}>
                                    <Typography variant="p4">Все</Typography>
                                    <ChevronRightIcon fill="--icon-primary" size={1.6} />
                                </a>
                            </div>
                            <div className={s.events}>
                                <HorizontalSwipeBlock>
                                    {
                                        eventCategoty.events.map((event) => 
                                            <SwiperSlide key={"category_"+event.id} style={{ width: 'auto' }}>
                                                <EventCard event={event} />
                                            </SwiperSlide>
                                        )
                                    }
                                </HorizontalSwipeBlock>
                            </div>
                        </div>
                    )
                :
                    Array.from({ length: 4 }).map((_, index) => 
                        <div className={s.category} key={index}>
                            <div className={s.category_header}>
                                <Skeleton className={s.category_skeleton} type="line" />
                                <Skeleton className={s.all_skeleton} type="line" />
                            </div>
                            <div className={s.events}>
                                <HorizontalSwipeBlock>
                                    {
                                        Array.from({ length: 10 }).map((_, index) => 
                                            <SwiperSlide key={index} style={{ width: 'auto' }}>
                                                <EventCard />
                                            </SwiperSlide>
                                        )
                                    }
                                </HorizontalSwipeBlock>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}