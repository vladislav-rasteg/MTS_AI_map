import { Typography } from "src/shared/ui/Typography"
import s from "./CreateEvent.module.scss"
import ArrowIcon from "./assets/arrow.svg"
import { Button } from "src/shared/ui/Button"

export const CreateEvent = () => {
    return(
        <div className={s.block_wrapper}>
            <a href="https://prohodka.com/partners" target="_blank" className={s.block}>
                <Typography className={s.heading} variant="h1" wide color="invert">СВОЕ МЕРОПРИЯТИЕ</Typography>
                <img src={ArrowIcon}/>
            </a>
            <a href="https://prohodka.com/partners" target="_blank" className={s.block_mobile}>
                <Typography className={s.heading} variant="h1" wide color="invert">СОЗДАЙТЕ СВОЕ<br/>МЕРОПРИЯТИЕ</Typography>
                <Button theme="dark" fullWidth>Создать</Button>
            </a>
        </div>
    )
}