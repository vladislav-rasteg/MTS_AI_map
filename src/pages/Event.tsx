import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'src/app/hooks/redux';
import { EventLoader } from 'src/blocks/Event/EventLoader/EventLoader';
import { EventMain } from 'src/blocks/Event/EventMain/ui/EventMain';
import { useGetEventQuery } from 'src/shared/api/EventsAPI';
import { useLocationMutation } from 'src/shared/api/ProfileAPI';
import { profileSlice } from 'src/shared/store/reducers/ProfileSlice';
import { themeSlice } from 'src/shared/store/reducers/ThemeSlice';
import { useEffect } from 'react';
import { RecomendationsBlock } from 'src/blocks/RecomendationsBlock';
import { EventOrganization } from 'src/blocks/Event/EventOrganization/ui/EventOrganization';
import { Footer } from 'src/blocks/Footer';

export const Event = () => {
    const [location] = useLocationMutation();
    const { updateCurrentLocation } = profileSlice.actions;

    const { event_id } = useParams();
    const session = localStorage.getItem("session") || "-";
    const { data: event, isLoading } = useGetEventQuery({ id: event_id || "-", session });

    const { updateTheme } = themeSlice.actions;
    const dispatch = useAppDispatch();

    // Update theme only when the event is loaded and the theme differs from the current theme
    useEffect(() => {
        window.scrollTo(0, 0);
        if (event) {
            dispatch(updateTheme(event.theme));
            if(event.theme === 'light'){
                document.documentElement.style.setProperty('--bg-primary', "#F6F6F6");
            } else {
                document.documentElement.style.setProperty('--bg-primary', "#0F0F0F");
            }
        }
    }, [event, dispatch, updateTheme]);

    const city = localStorage.getItem("city_id_str");

    useEffect(() => {
        if (!city && event) {
            location({ city: { name: event.city || "moscow", type: "id" } })
                .then((res: any) => {
                    if (!Object.prototype.hasOwnProperty.call(res, "error")) {
                        dispatch(updateCurrentLocation({
                            name: res.data.city.name,
                            city_id: res.data.city.id,
                            id_str: res.data.city.id_str
                        }));
                        localStorage.setItem("city", res.data.city.name);
                        localStorage.setItem("city_id", res.data.city.id);
                        localStorage.setItem("city_id_str", res.data.city.id_str);
                    }
                });
        }
    }, [city, event, location, dispatch, updateCurrentLocation]);

    if (isLoading) return <EventLoader />;

    if (!event) return <div>error</div>;

    return (
        <motion.div
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.3 }}
            transition={{ duration: 0.4 }}
            className="page"
        >
            <EventMain event={event} />
            <EventOrganization event={event} />
            <RecomendationsBlock />
            <Footer />
        </motion.div>
    );
}
