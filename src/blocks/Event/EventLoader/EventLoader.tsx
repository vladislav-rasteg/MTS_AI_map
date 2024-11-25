import { Skeleton } from "src/shared/ui/Skeleton"
import s from "./EventLoader.module.scss"

export const EventLoader = () => {
    return(
        <div className={s.block_wrapper}>
            <div className={s.block}>
                <div className={s.block_content}>
                    <Skeleton className={s.images_wrapper} />
                </div>
            </div>
        </div>
    )
}