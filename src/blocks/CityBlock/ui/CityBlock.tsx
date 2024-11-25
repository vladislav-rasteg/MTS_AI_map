import { CityCard } from "src/feautures/City/ui/CityCard";
import s from "./CityBlock.module.scss";
import { useGetLocationsQuery } from "src/shared/api/LocationAPI";
import { useState, useEffect } from "react";
import { ICityQuery } from "src/feautures/City/models";
import { smartSearch } from "src/shared/utils/smartSearch";
import { Typography } from "src/shared/ui/Typography";
import { TextInput } from "src/shared/ui/TextInput";
import { Loader } from "src/shared/ui/Loader";

export const CityBlock = () => {
    const { data, isLoading } = useGetLocationsQuery();
    const [cityList, setCityList] = useState<ICityQuery[]>([]);
    const [originalCityList, setOriginalCityList] = useState<ICityQuery[]>([]); // Сохраняем изначальный список городов
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (data) {
            setCityList(data);
            setOriginalCityList(data); // Сохраняем изначальный список
        }
    }, [data]); // Этот эффект сработает, когда `data` обновится

    const searchHandler = (search: string) => {
        setSearch(search);
        if (search && originalCityList) {
            const fields: Array<keyof ICityQuery> = ['name'];
            const results = smartSearch(search, fields, originalCityList); // Ищем по изначальному списку
            setCityList(results);
        } else if(!search){
            setCityList(originalCityList)
        }
    };

    return (
        <div className={s.block}>
            <Typography variant="h2">Выберите город</Typography>
            <div className={s.input_wrapper}>
                <TextInput type="search" placeholder="Искать город" className={s.input} value={search} onChange={(e) => searchHandler(e.target.value)} />
            </div>
            {
                !isLoading ?
                    <div className={s.grid}>
                        {
                            cityList.map((city, index) => 
                                <CityCard key={index} name={city.name} id_str={city.id_str} show={city.show} size="small" />
                            )
                        }
                    </div>
                    :
                    <Loader />
            }
        </div>
    );
};
