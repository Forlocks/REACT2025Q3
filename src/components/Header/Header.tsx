'use client';

import React, { useContext, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useDispatch } from "react-redux";
import { baseApi } from '../../api/baseApi';
import { Button } from '../Button/Button';
import { ColorThemeContext } from '../../context/colorThemeContext/ColorThemeContext';
import { setRootColors } from '../../controllers/setRootColors/setRootColors';
import './Header.scss';
import reset from '../../assets/images/reset.webp';

interface HeaderProps {
  children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isRotating, setIsRotating] = useState(false);
  const [colorTheme, setColorTheme] = useContext(ColorThemeContext);
  const t = useTranslations('Header');

  const dispatch = useDispatch();

  const switchLocale = () => {
    const currentLocale = params?.locale || 'en';
    const newLocale = currentLocale === 'en' ? 'ru' : 'en';
    const newPath = pathname?.replace(`/${currentLocale}`, `/${newLocale}`) || '';

    router.push(newPath);
  };

  const changeColorTheme = () => {
    const newColorTheme = colorTheme === 'dark' ? 'light' : 'dark';

    setColorTheme(newColorTheme);
    setRootColors(newColorTheme);

    localStorage.setItem('STS color theme', newColorTheme);
  };

  const revalidateQueryCache = () => {
    dispatch(baseApi.util.invalidateTags(['Ships']));

    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 500);
  }

  return (
    <header className="header">
      <div className="header__left-bar">
        <Link href="/" className="header__title">{t('title')}</Link>
        <Button onButtonClick={changeColorTheme}>{colorTheme === 'dark' ? '☀' : '☽'}</Button>
        <Button onButtonClick={revalidateQueryCache}>
          <Image src={reset} className={isRotating ? 'rotating' : ''} width="20" height="20" alt="Reset query cache" />
        </Button>
      </div>
      <div className="header__right-bar">
        {children}
        <div className="header__nav">
          <Button onButtonClick={() => switchLocale()}>{params?.locale === 'en' ? 'RU' : 'EN'}</Button>
          {pathname?.includes('/about') ? (
            <Link href="/" className="header__nav-link">{t('mainLink')}</Link>
          ) : (
            <Link href="/about" className="header__nav-link">{t('aboutLink')}</Link>
          )}
        </div>
      </div>
    </header>
  );
};
