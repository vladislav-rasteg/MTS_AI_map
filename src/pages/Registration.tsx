import { useEffect } from "react";
import { motion } from 'framer-motion';
import { Registration as RegistrationBlock } from "feautures/Registration";


export const Registration = () => {
    useEffect(() => {
        document.title = 'Проходка | Регистрация';
      }, []);

    return(
        <motion.div
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.3 }}
            transition={{ duration: 0.4 }}
            className="page_no_padding"
        >
            <RegistrationBlock />
        </motion.div>
    )
}