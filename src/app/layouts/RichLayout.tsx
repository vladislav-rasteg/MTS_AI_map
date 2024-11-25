import { FC } from "react"
import s from "./Layout.module.scss"
import { Header } from "src/widgets/Header/ui/Header";

interface ILayout {
    children?: React.ReactNode;
  }

export const RichLayout: FC<ILayout> = (props) => {
    const { children } = props
    return(
        <div className={s.authorized_layout}>
            <Header />
            {children}
        </div>
    )
}