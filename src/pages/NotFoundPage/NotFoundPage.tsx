import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import './NotFoundPage.scss';
import brokenShip from '../../assets/images/not-found.webp';

export const NotFoundPage: React.FC = () => {
  const t = useTranslations('NotFoundPage');

  return (
    <div className="not-found">
      <Image className="not-found__image" src={brokenShip} alt="Broken ship" />
      <div className="not-found__title">
        {t('title')}
        <br />
        <div>
          {t('message')}&nbsp;
          <Link href="/" className="not-found__link">
            {t('link')}
          </Link>
        </div>
      </div>
    </div>
  );
};
