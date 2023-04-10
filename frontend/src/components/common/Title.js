import styled from "styled-components";

const Title = ({ title }) => {
  return (
    <TitleBox>
      <img src="/images/light_bulb.png" />
      <span />
      <h1>{title}</h1>
    </TitleBox>
  );
};

const TitleBox = styled.div`
  position: relative;
  display: none;
  justify-content: center;
  padding-top: 2rem;
  h1 {
    padding: 0 2rem 0.75rem;
    text-align: center;
    border-bottom: 2px solid ${({ theme }) => theme.color.primaryGold};
  }
  span {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border-bottom: 85px solid rgba(221, 186, 0, 0.2);
    border-left: 80px solid transparent;
    border-right: 80px solid transparent;
    filter: blur(2px);
    transform: translateX(-50%);
  }
  img {
    position: absolute;
    top: 1px;
    left: 50%;
    width: 40px;
    height: 20px;
    object-fit: contain;
    transform: translateX(-50%);
  }
  @media screen and (${({ theme }) => theme.device.mobile}) {
    display: flex;
  }
`;

export default Title;
