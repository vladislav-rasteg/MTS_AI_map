import { useState } from 'react';
import s from './ProgressiveImage.module.scss';
import { Skeleton } from '../../Skeleton';
import { classNames } from 'src/shared/lib/classNames/classNames';

interface ProgressiveImageProps {
    src: string; // Ссылка на высококачественное изображение
    placeholderSrc?: string; // Ссылка на размытую версию изображения
    alt: string;
    className?: string
}

export const ProgressiveImage = ({ src, placeholderSrc, alt, className }: ProgressiveImageProps) => {
    const [isMainImageLoaded, setIsMainImageLoaded] = useState(false);
    const [isPlaceholderLoaded, setIsPlaceholderLoaded] = useState(placeholderSrc ? false : true);

    // useEffect(() => {
    //     if (!placeholderSrc) {
    //         // Если нет placeholder, сразу загружаем основное изображение
    //         const mainImg = new Image();
    //         mainImg.src = src;
    //         mainImg.onload = () => {
    //             setIsMainImageLoaded(true);
    //         };
    //         mainImg.onerror = () => {
    //             console.error('Ошибка загрузки основного изображения');
    //         };
    //     }
    // }, [placeholderSrc, src]);

    const handleMainImageLoad = () => {
        setIsMainImageLoaded(true);
    };

    return (
        <div className={classNames(s.imageWrapper, {}, [className as string])}>
            {placeholderSrc ? (
                <img
                    src={placeholderSrc}
                    alt={alt}
                    className={`${s.image} ${s.placeholder}`}
                    onLoad={() => setIsPlaceholderLoaded(true)}
                    onError={() => setIsPlaceholderLoaded(true)}
                />
            ) : (
                <Skeleton className={s.image_skeleton} />
            )}
            {
               (!placeholderSrc || isPlaceholderLoaded) &&
                <img
                    src={src}
                    alt={alt}
                    className={`${s.image} ${s.mainImage} ${isMainImageLoaded ? s.loaded : ''}`}
                    onLoad={handleMainImageLoad}
                    onError={() => console.error('Ошибка загрузки основного изображения')}
                    style={{ opacity: isMainImageLoaded ? 1 : 0 }}
                />
            }
        </div>
    );
};
