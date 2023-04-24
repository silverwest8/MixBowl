import { useModal } from "../../hooks/useModal";
import styled from "styled-components";
import Modal from "../common/Modal";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
const RecipeButton = () => {
  const { openModal, closeModal } = useModal();
  return (
    <ButtonBox>
      <Button>도수</Button>
      <Button
        onClick={() =>
          openModal(ColorModal, {
            handleClose: closeModal,
          })
        }
      >
        색깔
      </Button>
    </ButtonBox>
  );
};

const ColorModal = ({ handleClose }) => {
  return (
    <Modal
      content="원하는 칵테일에 포함된
    색을 선택하세요"
      handleClose={handleClose}
    >
      <ColorButtonBox>
        <ColorButton bgColor="#FF0000" onClick={(e) => {}}>
          {<FaCheckCircle></FaCheckCircle>}
          빨강
        </ColorButton>
        <ColorButton bgColor="#FF41D5">분홍</ColorButton>
        <ColorButton bgColor="#FF9900">주황</ColorButton>
        <ColorButton bgColor="#000000">검정</ColorButton>
        <ColorButton bgColor="#FFC700">노랑</ColorButton>
        <ColorButton bgColor="#532503">갈색</ColorButton>
        <ColorButton bgColor="#04D100">초록</ColorButton>
        <ColorButton bgColor="#787878">회색</ColorButton>
        <ColorButton bgColor="#0066FF">파랑</ColorButton>
        <ColorButton bgColor="#FFFFFF" textColor="#000000">
          흰색
        </ColorButton>
        <ColorButton bgColor="#AD00FF">보라</ColorButton>
        <ColorButton bgColor="#3E3E3E">무색</ColorButton>
      </ColorButtonBox>
    </Modal>
  );
};

const ButtonBox = styled.div`
  text-align: center;
`;

const Button = styled.button`
  width: 95px;
  height: 39px;
  border: 1px solid ${({ theme }) => theme.color.secondGold};
  border-radius: 1.25rem;
  margin-top: 2rem;
  margin-right: 1rem;
  margin-left: 1rem;
  color: ${({ theme }) => theme.color.secondGold};
  &:hover {
    background-color: ${({ theme }) => theme.color.primaryGold};
  }
`;

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

export default RecipeButton;
