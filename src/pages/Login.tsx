import { useEffect } from "react";
import { motion } from 'framer-motion';
import { Login as LoginBlock } from "feautures/Login";


export const Login = () => {
    useEffect(() => {
        document.title = 'Проходка | Логин';
      }, []);

    return(
        <motion.div
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.3 }}
            transition={{ duration: 0.4 }}
            className="page_no_padding"
        >
            <LoginBlock />
        </motion.div>
    )
}