import Modal from "../common/Modal";
import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";
import { colorState } from "../../store/recipe";
import { useRecoilState } from "recoil";

const RecipeColor = ({ handleClose }) => {
  const [
    {
      red,
      pink,
      orange,
      black,
      yellow,
      brown,
      green,
      grey,
      blue,
      white,
      purple,
      transparent,
      no,
    },
    setColor,
  ] = useRecoilState(colorState);

  return (
    <Modal
      content="원하는 칵테일에 포함된
      색을 선택하세요"
      handleClose={handleClose}
    >
      <ColorButtonBox>
        <ColorButton
          bgColor="#FF0000"
          onClick={() => {
            setColor({
              red: !red,
              pink,
              orange,
              black,
              yellow,
              brown,
              green,
              grey,
              blue,
              white,
              purple,
              transparent,
              no: false,
            });
          }}
        >
          {red === true ? <FaCheckCircle></FaCheckCircle> : null}
          빨강
        </ColorButton>

        <ColorButton
          bgColor="#FF41D5"
          onClick={() =>
            setColor({
              red,
              pink: !pink,
              orange,
              black,
              yellow,
              brown,
              green,
              grey,
              blue,
              white,
              purple,
              transparent,
              no: false,
            })
          }
        >
          {pink === true ? <FaCheckCircle></FaCheckCircle> : null}
          분홍
        </ColorButton>
        <ColorButton
          bgColor="#FF9900"
          onClick={() =>
            setColor({
              red,
              pink,
              orange: !orange,
              black,
              yellow,
              brown,
              green,
              grey,
              blue,
              white,
              purple,
              transparent,
              no: false,
            })
          }
        >
          {orange === true ? <FaCheckCircle></FaCheckCircle> : null}주황
        </ColorButton>
        <ColorButton
          bgColor="#000000"
          onClick={() =>
            setColor({
              red,
              pink,
              orange,
              black: !black,
              yellow,
              brown,
              green,
              grey,
              blue,
              white,
              purple,
              transparent,
              no: false,
            })
          }
        >
          {black === true ? <FaCheckCircle></FaCheckCircle> : null}검정
        </ColorButton>
        <ColorButton
          bgColor="#FFC700"
          onClick={() =>
            setColor({
              red,
              pink,
              orange,
              black,
              yellow: !yellow,
              brown,
              green,
              grey,
              blue,
              white,
              purple,
              transparent,
              no: false,
            })
          }
        >
          {yellow === true ? <FaCheckCircle></FaCheckCircle> : null}노랑
        </ColorButton>
        <ColorButton
          bgColor="#532503"
          onClick={() =>
            setColor({
              red,
              pink,
              orange,
              black,
              yellow,
              brown: !brown,
              green,
              grey,
              blue,
              white,
              purple,
              transparent,
              no: false,
            })
          }
        >
          {brown === true ? <FaCheckCircle></FaCheckCircle> : null}갈색
        </ColorButton>
        <ColorButton
          bgColor="#04D100"
          onClick={() =>
            setColor({
              red,
              pink,
              orange,
              black,
              yellow,
              brown,
              green: !green,
              grey,
              blue,
              white,
              purple,
              transparent,
              no: false,
            })
          }
        >
          {green === true ? <FaCheckCircle></FaCheckCircle> : null}초록
        </ColorButton>
        <ColorButton
          bgColor="#787878"
          onClick={() =>
            setColor({
              red,
              pink,
              orange,
              black,
              yellow,
              brown,
              green,
              grey: !grey,
              blue,
              white,
              purple,
              transparent,
              no: false,
            })
          }
        >
          {grey === true ? <FaCheckCircle></FaCheckCircle> : null}회색
        </ColorButton>
        <ColorButton
          bgColor="#0066FF"
          onClick={() =>
            setColor({
              red,
              pink,
              orange,
              black,
              yellow,
              brown,
              green,
              grey,
              blue: !blue,
              white,
              purple,
              transparent,
              no: false,
            })
          }
        >
          {blue === true ? <FaCheckCircle></FaCheckCircle> : null}파랑
        </ColorButton>
        <ColorButton
          bgColor="#FFFFFF"
          textColor="#000000"
          onClick={() =>
            setColor({
              red,
              pink,
              orange,
              black,
              yellow,
              brown,
              green,
              grey,
              blue,
              white: !white,
              purple,
              transparent,
              no: false,
            })
          }
        >
          {white === true ? <FaCheckCircle></FaCheckCircle> : null}흰색
        </ColorButton>
        <ColorButton
          bgColor="#AD00FF"
          onClick={() =>
            setColor({
              red,
              pink,
              orange,
              black,
              yellow,
              brown,
              green,
              grey,
              blue,
              white,
              purple: !purple,
              transparent,
              no: false,
            })
          }
        >
          {purple === true ? <FaCheckCircle></FaCheckCircle> : null}보라
        </ColorButton>
        <ColorButton
          bgColor="#3E3E3E"
          onClick={() =>
            setColor({
              red,
              pink,
              orange,
              black,
              yellow,
              brown,
              green,
              grey,
              blue,
              white,
              purple,
              transparent: !transparent,
              no: false,
            })
          }
        >
          {transparent === true ? <FaCheckCircle></FaCheckCircle> : null}무색
        </ColorButton>
      </ColorButtonBox>
    </Modal>
  );
};

const ColorButton = styled.button`
  width: 6rem;
  height: 3rem;
  border-radius: 1rem;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    margin-right: 0.5rem;
  }
`;

const ColorButtonBox = styled.div`
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 1rem;
  column-gap: 1rem;
  margin-top: 1rem;
`;

export default RecipeColor;
