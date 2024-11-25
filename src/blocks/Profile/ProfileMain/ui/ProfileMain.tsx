import { Typography } from "src/shared/ui/Typography"
import s from "./ProfileMain.module.scss"
import { useAppSelector } from "src/app/hooks/redux";

export const ProfileMain = () => {

    const { currentProfile } = useAppSelector(state => state.ProfileReducer);

    return(
        <div className={s.block}>
            <div className={s.user_card}>
                <div className={s.row}>
                    <img src="/assets/organization.svg" className={s.profile_image} />
                    <div className={s.column}>
                        <Typography variant="h1" color="primary">{currentProfile.full_name}</Typography>
                        <Typography variant="p3" color="primary">{currentProfile.email}</Typography>
                    </div>
                </div>
                <div className={s.column}>
                    <div className={s.full_row}>
                        <Typography variant="p3" className={s.label} color="secondary">ID</Typography>
                        <Typography variant="p3" color="primary">{currentProfile.id}</Typography>
                    </div>
                    <div className={s.full_row}>
                        <Typography variant="p3" className={s.label} color="secondary">Телефон</Typography>
                        <Typography variant="p3" color="primary">{currentProfile.phone || "-"}</Typography>
                    </div>
                    <div className={s.full_row}>
                        <Typography variant="p3" className={s.label} color="secondary">Дата рождения</Typography>
                        <Typography variant="p3" color="primary">{currentProfile.birth_date || "-"}</Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}