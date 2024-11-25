import { ICity } from "feautures/City/models";
import s from "./CityCard.module.scss"
import { classNames } from "src/shared/lib/classNames/classNames";
import { Typography } from "src/shared/ui/Typography";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MAIN_ROUTE } from "src/shared/utils/consts";
import useUpdateLocation from "src/feautures/City/hooks/useUpdateLocation";
import { ProgressiveImage } from "src/shared/ui/ProgressiveImage";

interface ICityCardProps extends ICity{
    show?: boolean
    size?: 'small' | 'big'
    className?: string;
}

export const CityCard = ({name, id_str, show = true, size = 'small', className}: ICityCardProps) => {

    const { updateLocation } = useUpdateLocation()

    const navigate = useNavigate()

    const urlParams = new URLSearchParams(window.location.search);
    const backUrl = urlParams.get('backUrl');

    const successSetLocation = () => {
        navigate(backUrl || MAIN_ROUTE)
    }

    const errorSetLocation = () => {
        toast.error("Хмм... Что-то пошло не так")
    }

    return(
        <div 
            onClick={() => {updateLocation(id_str, "id", successSetLocation, errorSetLocation)}}
            className={classNames(s.city_card, {[s.inactive]: !show}, [className as string, s[size]])}
            style={{backgroundImage: "url(assets/city.png)"}}
        >
            <div className={s.image}>
                <ProgressiveImage
                    src={import.meta.env.VITE_S3_URL + 'city/' + id_str + '.png'}
                    placeholderSrc={import.meta.env.VITE_S3_URL + 'city/' + id_str + '_32.png'}
                    alt="Фото города"
                />
            </div>
            <Typography className={s.name} wide={size === "big"} variant={size === "small" ? "h3" : 'h2'} color="invert">
                {name}
            </Typography>
        </div>
    )
}