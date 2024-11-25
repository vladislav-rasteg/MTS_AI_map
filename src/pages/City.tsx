import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { CityBlock } from 'blocks/CityBlock';

export const City = () => {
    useEffect(() => {
        document.title = 'Проходка | Выбери свой город';
      }, []);

    return(
        <motion.div
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.3 }}
            transition={{ duration: 0.4 }}
            className="page"
        >
            <CityBlock />
        </motion.div>
    )
}