import { toast } from "react-toastify";
import { useAppDispatch } from "src/app/hooks/redux";
import { useLocationMutation } from "src/shared/api/ProfileAPI";
import { profileSlice } from "src/shared/store/reducers/ProfileSlice";

const useUpdateLocation = () => {
    const [location] = useLocationMutation();
    const { updateCurrentLocation } = profileSlice.actions;
    const dispatch = useAppDispatch();

    const updateLocation = (name: string, type: string, onSuccess?: () => void, onError?: () => void) => {
        location({ city: {name, type} })
            .then((res: any) => {
                if (Object.prototype.hasOwnProperty.call(res, "error")) {   
                    toast.error(res.error.data?.message || "Хмм... Что-то пошло не так")
                    onError && onError()
                } else {
                    dispatch(updateCurrentLocation({name: res.data.city.name, city_id: res.data.city.id, id_str: res.data.city.id_str}));
                    localStorage.setItem("city", res.data.city.name)
                    localStorage.setItem("city_id", res.data.city.id)
                    localStorage.setItem("city_id_str", res.data.city.id_str)
                    onSuccess && onSuccess()
                }
            });
    }

    return { updateLocation };
}

export default useUpdateLocation;