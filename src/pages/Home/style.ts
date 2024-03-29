import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #00b74f;
`;

export const Header = styled.header`
  position: relative;
  display: flex;
  justify-content: flex-end;
  padding: 1.6rem;
  margin-bottom: 5rem;

  img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    cursor: pointer;
  }
`;

export const LoginButton = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
  background-color: white;
  padding: 1rem 2rem;
  border-radius: 5rem;
  width: 11rem;
  padding: 1rem;
`;

export const Main = styled.div`
  max-width: 128rem;
  padding: 0 1.6rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .content {
    width: 100%;
    margin-bottom: 8rem;
    margin-top: 6rem;
    display: flex;
    justify-content: space-between;

    .info {
      font-weight: bold;
      font-size: 4.8rem;

      div {
        color: white;
        line-height: 1.5;
        margin-bottom: 2rem;
      }
    }
  }
`;

export const Slider = styled.div`
  position: relative;

  img {
    position: absolute;
    top: 0;
    right: 0;
    opacity: 0;
    transition: all 0.5s ease-out;
  }

  .logo {
    width: 45rem;
    height: 45rem;
  }

  .proto {
    width: 60rem;
  }

  .active {
    opacity: 1;
  }
`;

export const MapButton = styled.div`
  font-size: 2.4rem;
  font-weight: bold;
  background-color: white;
  width: 40rem;
  border-radius: 50rem;
  padding: 1.5rem 0;
  margin-right: 2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  span {
    margin-right: 1rem;
  }
`;
