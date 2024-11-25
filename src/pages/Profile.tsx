import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Footer } from 'src/blocks/Footer';
import { ProfileMain } from 'src/blocks/Profile/ProfileMain';
import { ProfileTicketsHistory } from 'src/blocks/Profile/ProfileTicketsHistory';
import { RecomendationsBlock } from 'src/blocks/RecomendationsBlock';

export const Profile = () => {
    useEffect(() => {
        document.title = 'Проходка | Профиль';
    }, []);

    return(
        <motion.div
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.3 }}
            transition={{ duration: 0.4 }}
            className="page"
        >
            <ProfileMain />
            <ProfileTicketsHistory />
            <RecomendationsBlock />
            <Footer />
        </motion.div>
    )
}