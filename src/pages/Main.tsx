import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { CategoryBlock } from 'src/blocks/CategoryBlock';
import { CreateEvent } from 'src/blocks/CreateEvent/ui/CreateEvent';
import { FilterBlock } from 'src/blocks/FilterBlock';
import { Footer } from 'src/blocks/Footer';
import { MainBlock } from 'src/blocks/MainBlock';
import { PartnersBlock } from 'src/blocks/PartnersBlock';
import { RecomendationsBlock } from 'src/blocks/RecomendationsBlock';

export const Main = () => {
    useEffect(() => {
        document.title = 'Проходка | Главная';
      }, []);

    return(
        <motion.div
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.3 }}
            transition={{ duration: 0.4 }}
            className="page"
        >
            <MainBlock />
            <FilterBlock />
            <RecomendationsBlock />
            <CategoryBlock />
            <CreateEvent />
            <PartnersBlock />
            <Footer />
        </motion.div>
    )
}