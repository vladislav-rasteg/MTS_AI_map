import { themeSlice } from "src/shared/store/reducers/ThemeSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

import { FC } from "react"

interface ILayout {
    children?: React.ReactNode;
    required?: boolean;
}

export const ThemeProvider: FC<ILayout> = (props) => {
    const { children, required = false } = props
    
    const { theme } = useAppSelector(state => state.ThemeReducer);
    const { updateTheme } = themeSlice.actions;
    const dispatch = useAppDispatch();

    if(!required && theme !== 'light'){
        dispatch(updateTheme('light'))
        document.documentElement.style.setProperty('--bg-primary', "#F6F6F6");
    }

    return(
        <div className={`theme ${theme}`} id="aside_container">
            {children}
        </div>
    )
}