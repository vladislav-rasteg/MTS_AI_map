import { Link } from "react-router-dom"
import s from "./Footer.module.scss"
import Logo from "shared/assets/logo.svg"
import { Typography } from "src/shared/ui/Typography"

export const Footer = () => {

    return(
        <div className={s.footer}>
            <div className={s.column}>
                <img src={Logo} className={s.logo} />
            </div>
            <div className={s.columns_wrapper}>
                <div className={s.column}>
                    <Link to="https://prohodka.com/docs/%d0%9f%d0%be%d0%bb%d0%b8%d1%82%d0%b8%d0%ba%d0%b0_%d0%ba%d0%be%d0%bd%d1%84%d0%b5%d0%b4%d0%b5%d0%bd%d1%86%d0%b8%d0%b0%d0%bb%d1%8c%d0%bd%d0%be%d1%81%d1%82%d0%b8.pdf" target="_blank">
                        <Typography variant="p3" color="invert" className={s.link}>
                            Политика конфидециальности
                        </Typography>
                    </Link>
                    <Link to="/">
                        <Typography variant="p3" color="invert" className={s.link}>
                            Главная
                        </Typography>
                    </Link>
                    <Link to="https://prohodka.com/partners" target="_blank">
                        <Typography variant="p3" color="invert" className={s.link}>
                            Преимущества
                        </Typography>
                    </Link>
                </div>
                <div className={s.column}>
                    <Link to="login">
                        <Typography variant="p3" color="invert" className={s.link}>
                            Покупателям
                        </Typography>
                    </Link>
                    <a href="https://prohodka.com/admin/login">
                        <Typography variant="p3" color="invert" className={s.link}>
                            Организаторам
                        </Typography>
                    </a>
                    <a href="https://prohodka.com/partners-tariff" target="_blank">
                        <Typography variant="p3" color="invert" className={s.link}>
                            Тарифы
                        </Typography>
                    </a>
                    <a href="https://prohodka.com/contacts" target="_blank">
                        <Typography variant="p3" color="invert" className={s.link}>
                            Контакты
                        </Typography>
                    </a>
                </div>
            </div>
        </div>
    )
}