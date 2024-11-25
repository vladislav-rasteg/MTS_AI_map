import { useRef, useEffect, useState } from 'react';
import { IEvent } from "src/feautures/Event/models";
import s from "./EventOrganization.module.scss";
import { LocationIcon } from "src/shared/ui/Icons/LocationIcon";
import { Typography } from "src/shared/ui/Typography";
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
// import XYZ from 'ol/source/XYZ'; // Используем XYZ для кастомных тайлов
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';
import { OrganizationCard } from 'src/feautures/Organization/ui/OrganizationCard';
import { SocialMediaIcons } from 'src/shared/ui/Icons/SocialMediaIcons';
import { classNames } from 'src/shared/lib/classNames/classNames';
import { ChevronDownIcon } from 'src/shared/ui/Icons/ChevronDownIcon';
import OSM from 'ol/source/OSM';

interface EventOrganizationProps {
    event: IEvent;
}

export const EventOrganization = ({ event }: EventOrganizationProps) => {
    const mapRef = useRef<HTMLDivElement>(null);

    const [showOrganization, setShowOrganization] = useState(false)

    useEffect(() => {
        if (!mapRef.current || !event.latlng) return;

        const { x: lat, y: lng } = event.latlng;

        // Создание карты
        const map = new Map({
            target: mapRef.current,
            layers: [
                // Используем кастомные тайлы с меньшей детализацией
                new TileLayer({
                    // source: new XYZ({
                    //     url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
                    //     attributions: '&copy; OpenStreetMap contributors, &copy; Wikimedia',
                    // }),
                    source: new OSM(),
                }),
            ],
            view: new View({
                center: fromLonLat([lng, lat]),
                zoom: 15,
            }),
        });

        // Добавление маркера на карту
        const marker = new Feature({
            geometry: new Point(fromLonLat([lng, lat])),
        });

        marker.setStyle(
            new Style({
                image: new Icon({
                    anchor: [0.5, 1],
                    src: '/assets/anchor.png', // Путь к иконке маркера
                }),
            })
        );

        const vectorLayer = new VectorLayer({
            source: new VectorSource({
                features: [marker],
            }),
        });

        map.addLayer(vectorLayer);

        // Очистка карты при размонтировании компонента
        return () => map.setTarget(undefined);
    }, [event.latlng]);

    return (
        <div className={s.block_wrapper}>
            <div className={s.map_organizer}>
                {
                    event.latlng &&
                    <div className={s.map_wrapper}>
                        <div className={s.icon_group}>
                            <LocationIcon size={2.4} />
                            <Typography color="secondary" variant="p3">
                                {event.address}
                            </Typography>
                        </div>
                        <div  className={s.map} ref={mapRef} style={{ height: '100%', width: '100%' }}></div>
                    </div>
                }
                <div className={s.organizator_wrapper}>
                    <div className={s.organizator_main_info}>
                        <div className={s.heading}>
                            <Typography variant='h2' color='primary' className={s.heading_text}>Организатор</Typography>
                        </div>
                        <OrganizationCard organization={event.organization}/>
                    </div>
                    {
                        event.organization.contracts &&
                        <div className={s.about_organization_wrapper}>
                            <div className={s.about_organization} onClick={() => setShowOrganization(!showOrganization)}>
                                <Typography variant='p4' color="tetrinary" >Об организаторе</Typography>
                                <div className={classNames(s.organization_icon_wrapper, {[s.active]: showOrganization})}>
                                    <ChevronDownIcon size={1.6} />
                                </div>
                            </div>
                            {   
                                showOrganization &&
                                <div className={s.about_organization_content}>
                                    <div className={s.info_wrapper}>
                                        <Typography variant='p4' color='secondary'>ИНН организатора: </Typography>
                                        <Typography variant='p4' color='primary'>{event.organization.contracts.inn}</Typography>
                                    </div>
                                    <Typography variant='p4' color='primary'>{event.organization.contracts.name}</Typography>
                                </div>
                            }
                        </div>
                    }
                    <div className={s.organization_links}>
                        {
                            event.socmedia?.inst && 
                            <a className={s.social_media} target='_blank' href={event.socmedia.inst}>
                                <SocialMediaIcons variant='inst' className={s.social_media_icon} />
                            </a>
                        }
                        {
                            event.socmedia?.vk && 
                            <a className={s.social_media} target='_blank' href={event.socmedia.vk}>
                                <SocialMediaIcons variant='vk' className={s.social_media_icon} />
                            </a>
                        }
                        {
                            event.socmedia?.fb && 
                            <a className={s.social_media} target='_blank' href={event.socmedia.fb}>
                                <SocialMediaIcons variant='fb' className={s.social_media_icon} />
                            </a>
                        }
                        {
                            event.socmedia?.tg && 
                            <a className={s.social_media} target='_blank' href={event.socmedia.tg}>
                                <SocialMediaIcons variant='tg' className={s.social_media_icon} />
                            </a>
                        }
                        {
                            event.socmedia?.x && 
                            <a className={s.social_media} target='_blank' href={event.socmedia.x}>
                                <SocialMediaIcons variant='x' className={s.social_media_icon} />
                            </a>
                        }
                        {
                            event.socmedia?.web && 
                            <a className={s.social_media} target='_blank' href={event.socmedia.web}>
                                <SocialMediaIcons variant='web' className={s.social_media_icon} />
                            </a>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
