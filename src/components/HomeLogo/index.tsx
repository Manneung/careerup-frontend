import React from 'react';
import { useHistory } from 'react-router-dom';
import { Logo } from './style';

function HomeLogo() {
  const history = useHistory();

  const goHome = () => {
    history.push('/');
  };
  return (
    <Logo onClick={goHome}>
      <img className="logo__image" src={`${process.env.PUBLIC_URL}/images/careerup_logo_bg.png`} />
      <div className="logo__text">Career:up</div>
    </Logo>
  );
}

export default React.memo(HomeLogo);
