import { ChevronDownIcon } from 'src/shared/ui/Icons/ChevronDownIcon'
import s from './FilterBlock.module.scss'
import { Typography } from 'src/shared/ui/Typography'

export const FilterBlock = () => {
    return(
        <button className={s.block}>
            <div className={s.select}>
                <ChevronDownIcon size={1.6} />
                <Typography variant="p3" className={s.select_name}>Категории</Typography>
            </div>
            <div className={s.select}>
                <ChevronDownIcon size={1.6} />
                <Typography variant="p3" className={s.select_name}>Когда</Typography>
            </div>
            <div className={s.select}>
                <ChevronDownIcon size={1.6} />
                <Typography variant="p3" className={s.select_name}>Цена</Typography>
            </div>
            <div className={s.select}>
                <ChevronDownIcon size={1.6} />
                <Typography variant="p3" className={s.select_name}>Площадка</Typography>
            </div>
            <div className={s.select}>
                <ChevronDownIcon size={1.6} />
                <Typography variant="p3" className={s.select_name}>Скидки</Typography>
            </div>
            <div className={s.select}>
                <ChevronDownIcon size={1.6} />
                <Typography variant="p3" className={s.select_name}>Жанр</Typography>
            </div>
            <div className={s.select}>
                <ChevronDownIcon size={1.6} />
                <Typography variant="p3" className={s.select_name}>Пушкинская карта</Typography>
            </div>
        </button>
    )
}