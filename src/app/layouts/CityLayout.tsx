import { FC, useEffect, useState } from "react";
import s from "./Layout.module.scss";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from 'src/app/hooks/redux';
import { profileSlice } from 'src/shared/store/reducers/ProfileSlice';
import { useLocationMutation } from 'src/shared/api/ProfileAPI';
import { CITY_ROUTE } from "src/shared/utils/consts";

interface ILayout {
    children?: React.ReactNode;
    required?: boolean;
}

export const CityLayout: FC<ILayout> = (props) => {
    const { children, required = true } = props;

    const [location] = useLocationMutation();
    const { currentProfile } = useAppSelector(state => state.ProfileReducer);
    const { updateCurrentLocation } = profileSlice.actions;
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const updateLocationHandler = (name: string, type: string) => {
            location({ city: { name, type } })
                .then((res: any) => {
                    if (Object.prototype.hasOwnProperty.call(res, "error")) {
                        if (required) {
                            navigate(CITY_ROUTE);
                        }
                    } else {
                        dispatch(updateCurrentLocation({
                            name: res.data.city.name,
                            city_id: res.data.city.id,
                            id_str: res.data.city.id_str
                        }));
                        localStorage.setItem("city", res.data.city.name);
                        localStorage.setItem("city_id", res.data.city.id);
                        localStorage.setItem("city_id_str", res.data.city.id_str);
                        setIsLoading(false);
                    }
                });
        };

        if (required && (!currentProfile.city || !currentProfile.city.name)) {
            const ls_city = localStorage.getItem("city");
            const ls_city_id = localStorage.getItem("city_id");
            const ls_city_id_str = localStorage.getItem("city_id_str");

            if (ls_city && ls_city_id) {
                dispatch(updateCurrentLocation({
                    name: ls_city,
                    city_id: ls_city_id,
                    id_str: ls_city_id_str
                }));
                setIsLoading(false);
            } else {
                //@ts-ignore
                if (ymaps && ymaps.geolocation) {
                    //@ts-ignore
                    if (ymaps.geolocation.city) {
                        //@ts-ignore
                        updateLocationHandler(ymaps.geolocation.city, "city");
                    //@ts-ignore
                    } else if (ymaps.geolocation.region) {
                        //@ts-ignore
                        updateLocationHandler(ymaps.geolocation.region, "region");
                    } else {
                        if (required) {
                            navigate(CITY_ROUTE);
                        }
                    }
                } else {
                    if (required) {
                        navigate(CITY_ROUTE);
                    }
                }
            }
        } else {
            setIsLoading(false);
        }
    }, [currentProfile, required, dispatch, navigate, location]);

    if (isLoading) {
        // Вы можете добавить индикатор загрузки здесь
        return null;
    }

    return (
        <div className={s.city_layout}>
            {children}
        </div>
    );
};
