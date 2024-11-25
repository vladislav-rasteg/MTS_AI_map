import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'src/app/hooks/redux';
import { useGetEventQuery } from 'src/shared/api/EventsAPI';
import { useLocationMutation } from 'src/shared/api/ProfileAPI';
import { profileSlice } from 'src/shared/store/reducers/ProfileSlice';
import { themeSlice } from 'src/shared/store/reducers/ThemeSlice';
import { useEffect } from 'react';
import { Loader } from 'src/shared/ui/Loader';
import { OrderBlock } from 'src/blocks/OrderBlock/ui/OrderBlock';

export const Order = () => {
    const [location] = useLocationMutation();
    const { updateCurrentLocation } = profileSlice.actions;

    const { event_id } = useParams();
    const session = localStorage.getItem("session") || "-";
    const { data: event, isLoading } = useGetEventQuery({ id: event_id || "-", session });

    const { updateTheme } = themeSlice.actions;
    const dispatch = useAppDispatch();

    // Update theme only when the event is loaded and the theme differs from the current theme
    useEffect(() => {
        dispatch(updateTheme("dark"));
        document.documentElement.style.setProperty('--bg-primary', "#0F0F0F");
    }, [event, dispatch, updateTheme]);

    const city = localStorage.getItem("city_id_str");

    window.scrollTo(0, 0);

    useEffect(() => {
        if (event) {
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

    if (isLoading) return <Loader />;

    if (!event) return <div>error</div>;

    return (
        <motion.div
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.3 }}
            transition={{ duration: 0.4 }}
            className="page_no_padding"
        >
            <OrderBlock initialStep={2} event={event}/>
        </motion.div>
    );
}