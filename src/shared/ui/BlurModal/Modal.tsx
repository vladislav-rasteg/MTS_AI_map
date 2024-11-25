import { FC } from "react";
import s from "./BlurModal.module.scss"
import {motion} from "framer-motion"
import ReactDom from "react-dom"
import { Button } from "../Button";
import { Typography } from "../Typography";
import { CloseIcon } from "../Icons/CloseIcon";
import { ChevronLeftIcon } from "../Icons/ChevronLeftIcon";

interface ModalProps{
    show: boolean;
    setShow?: (show: boolean) => void;
    onClose?: () => void;
    name: string;
    children: any;
    leftButton?: () => void;
};

const BlurModal: FC<ModalProps> = (props) => {
    const {children, show, setShow, onClose, name, leftButton} = props

    if (!show) return null

    const showBackdrop = {
    hidden: {
        y: 100,
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
        duration: 0.4,
        damping: 25,
        stiffness: 500,
        },
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
    };
    
    return ReactDom.createPortal(
        <div
          className={s.aside_wrapper}
          onClick={() => {setShow && setShow(!show); onClose && onClose()}}
        >
            <motion.div 
                variants={showBackdrop}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={s.aside_body} 
                onClick={(e) => {e.stopPropagation()}}>
                <div className={s.modal_header}>
                    {leftButton && <Button iconOnly color="ghost" className={s.header_button} onClick={leftButton} ><ChevronLeftIcon fill="#FFFFFF" size={1.6} /></Button>}
                    <Typography variant="h2" className={s.modal_name}>{name}</Typography>
                    <Button iconOnly color="ghost" className={s.header_button} onClick={() => {setShow && setShow(!show); onClose && onClose()}} ><CloseIcon fill="#FFFFFF" size={1.6} /></Button>
                </div>
                {children}
            </motion.div>
        </div>,
        document.getElementById("aside_container") || document.body
    )
} 

export default BlurModal;