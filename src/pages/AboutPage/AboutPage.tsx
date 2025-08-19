import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Header } from '../../components/Header/Header';
import './AboutPage.scss';
import avatar from '../../assets/images/avatar.webp';
import schoolLogo from '../../assets/images/school-logo.webp';

export const AboutPage: React.FC = () => {
  const t = useTranslations('AboutPage');

  return (
    <div className="about">
      <Header />
      <div className="about__container">
          <Image src={avatar} alt="Avatar" className="about__avatar" />
          <div className="about__description">{t('message')}
          </div>
          <a href="https://rs.school/courses/reactjs">
            <Image src={schoolLogo} alt="School logo" className="about__school-logo" />
          </a>
      </div>
    </div>
  );
};
