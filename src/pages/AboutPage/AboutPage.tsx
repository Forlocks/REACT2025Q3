import React from 'react';
import { Header } from '../../components/Header/Header';
import './AboutPage.scss';
import avatar from '../../assets/images/avatar.webp';
import schoolLogo from '../../assets/images/school-logo.webp';

export const AboutPage: React.FC = () => {
  return (
    <div className="about">
      <Header />
      <div className="about__container">
          <img src={avatar} alt="Avatar" className="about__avatar" />
          <div className="about__description">
            Hi, my name is Aleksey, and you are now on my web application.
            With it, you can get information about the ships of the Star Trek universe that interest you.
            If you click on the ship card, you will be able to get more detailed information about the class of the selected ship.
          </div>
          <a href="https://rs.school/courses/reactjs">
            <img src={schoolLogo} alt="School logo" className="about__school-logo" />
          </a>
      </div>
    </div>
  );
};
