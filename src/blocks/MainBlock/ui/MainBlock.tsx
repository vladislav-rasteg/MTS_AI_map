import { CityCard } from "src/feautures/City/ui/CityCard";
import s from "./MainBlock.module.scss";
import { useAppSelector } from "src/app/hooks/redux";
import { useGetImportantQuery } from "src/shared/api/RecomendationAPI";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper/modules';
import { parse, format, isValid } from 'date-fns';
import { ru } from 'date-fns/locale';

import { IEvent } from "src/feautures/Event/models";
import { Typography } from "src/shared/ui/Typography";
import { Skeleton } from "src/shared/ui/Skeleton";
import { classNames } from "src/shared/lib/classNames/classNames";
import { ProgressiveImage } from "src/shared/ui/ProgressiveImage";
import { Link, useNavigate } from "react-router-dom";
import { CITY_ROUTE, EVENT_ROUTE } from "src/shared/utils/consts";
import { Button } from "src/shared/ui/Button";

export const MainBlock = () => {
    const { currentProfile } = useAppSelector(state => state.ProfileReducer);
    const city = localStorage.getItem("city_id_str") || 'moscow';
    const { data, isLoading } = useGetImportantQuery(city);

    const navigate = useNavigate()

    return (
        <div className={s.block}> 
            {currentProfile.city && <CityCard name={currentProfile.city.name} id_str={currentProfile.city.id_str} size="big" className={s.city_card} />}
            <div className={s.events}>
                <p className={s.important_tag}>Важные события</p>
                <Swiper
                    className={s.swiper}
                    modules={[Pagination, A11y, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    loop={true}
                    autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
                    speed={1000}
                >
                    {
                        data?.length ?
                        data.map((event: IEvent) => {
                            const parsedDate = parse(event.due_datetime, 'yyyy-MM-dd HH:mm:ss.SSSSSS', new Date());
                            return (
                                <SwiperSlide key={event.id}>
                                    <Link to={EVENT_ROUTE + '/' + event.id_str}
                                        className={classNames(s.slide, {[s.loaded]: !isLoading})}
                                    >
                                        <div className={s.image}>
                                            <ProgressiveImage
                                                src={event.icon} // Высококачественное изображение
                                                placeholderSrc={event.preview}
                                                alt="Фото мероприятия"
                                            />
                                        </div>
                                        <div className={s.info}>
                                            <Typography className={s.description} color="invert" variant="p1">
                                                {isValid(parsedDate) ? format(parsedDate, 'd MMMM', { locale: ru }) : 'Скоро'} {event.place && ', ' + event.place}
                                            </Typography>
                                            <Typography className={s.name} color="invert" variant="h2" wide>
                                                {event.name}
                                            </Typography>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            );
                        })
                        :   isLoading ?
                            Array.from({ length: 6 }).map((_, index) => 
                                <SwiperSlide key={index}>
                                    <Skeleton className={s.skeleton} type="block" />
                                </SwiperSlide>
                            )
                        :
                            <SwiperSlide>
                                <div className={s.no_events}>
                                    <Typography variant="p2" color="primary">В выбранном городе нет событий</Typography>
                                    <Button onClick={() => navigate(CITY_ROUTE)}>Сменить город</Button>
                                </div>
                            </SwiperSlide>
                    }
                </Swiper>
            </div>
        </div>
    );
};
