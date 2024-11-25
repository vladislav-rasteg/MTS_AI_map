import { Typography } from "src/shared/ui/Typography"
import s from "./PartnersBlock.module.scss"

export const PartnersBlock = () => {
    return(
        <div className={s.prtnrs}>
            <Typography variant="p1" color="secondary">Официальные партнеры</Typography>
            <div className={s.list}>
                <img className={s.logo} src="sber.png"/>
                <img className={s.logo} src="min_cult.png"/>
                <img className={s.logo} src="mts.png"/>
            </div>
        </div>
    )
}