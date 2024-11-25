import { FC } from "react";
import s from "./Layout.module.scss"


interface ILayout {
    children?: React.ReactNode;
  }

export const SimpleLayout: FC<ILayout> = (props) => {
    const { children } = props
    return(
        <div className={s.non_authorized_layout}>
            {children}
        </div>
    )
}