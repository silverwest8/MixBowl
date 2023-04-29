import styled from "styled-components";
import Input from "../common/Input";
import RecipeInput from "./RecipeInput";

const RecipeWrite = () => {
  return (
    <>
      <MainBox>
        <RecipeBox>
          <TopBox>
            <h1>새 레시피 작성</h1>
            <FlexBox>
              <img src="https://images.unsplash.com/photo-1609951651556-5334e2706168?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"></img>
              <ButtonBox>
                <Button>첨부</Button> <Button>삭제</Button>
              </ButtonBox>
            </FlexBox>
          </TopBox>
          <Input placeholder={"칵테일 이름"}></Input>
          <ColorBox>
            색상
            <ColorButtonBox>
              <ColorButton bgColor="#FF0000">빨강</ColorButton>
              <ColorButton bgColor="#FF9900">주황</ColorButton>
              <ColorButton bgColor="#FFC700">노랑</ColorButton>
              <ColorButton bgColor="#04D100">초록</ColorButton>
              <ColorButton bgColor="#0066FF">파랑</ColorButton>
              <ColorButton bgColor="#AD00FF">보라</ColorButton>
              <ColorButton bgColor="#FF41D5">분홍</ColorButton>
              <ColorButton
                bgColor="#000000"
                style={{ border: "1px solid #E9AA33" }}
              >
                검정
              </ColorButton>
              <ColorButton bgColor="#532503">갈색</ColorButton>
              <ColorButton bgColor="#787878">회색</ColorButton>
              <ColorButton bgColor="#FFFFFF" textColor="#000000">
                흰색
              </ColorButton>
              <ColorButton bgColor="#3E3E3E">무색</ColorButton>
            </ColorButtonBox>
          </ColorBox>
          <RecipeInput></RecipeInput>
        </RecipeBox>
      </MainBox>
    </>
  );
};

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const RecipeBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
`;

const TopBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  margin-bottom: 2rem;
  img {
    height: 8.875rem;
    width: 8.875rem;
    object-fit: cover;
    border: 1px solid ${({ theme }) => theme.color.primaryGold};
    border-radius: 0.75rem;
  }
  h1 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;
const Button = styled.button`
  width: 3.25rem;
  height: 1.75rem;
  border: 1px solid ${({ theme }) => theme.color.primaryGold};
  color: ${({ theme }) => theme.color.primaryGold};
  border-radius: 0.5rem;
  font-size: 0.75rem;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  letter-spacing: 0.01rem;
`;

const ColorBox = styled.div`
  margin-top: 2rem;
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
`;

const ColorButtonBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  row-gap: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
`;

export default RecipeWrite;
