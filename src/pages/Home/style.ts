import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #00b74f;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
`;

export const HomeLogo = styled.div`
  width: 9rem;
  height: 9rem;
  background-color: lightgray;
  font-size: 1.6rem;
`;

export const LoginButton = styled.div`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  background-color: white;
  padding: 1rem 2rem;
  width: 8rem;
  border-radius: 2rem;
`;

export const Overlay = styled.div`
  display: flex;
  width: 90%;
  height: 50rem;
  max-width: 100rem;

  /* 가운데 배치 */
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .welcome {
    background-color: lightgray;
    width: 50%;
    height: 100%;
  }

  .login {
    position: relative;
    background-color: gray;
    width: 50%;
    height: 100%;

    .container {
      display: flex;
      justify-content: center;
      flex-direction: column;

      /* 가운데 배치 */
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 0;
`;