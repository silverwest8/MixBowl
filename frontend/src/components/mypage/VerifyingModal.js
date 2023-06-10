import Modal from "../common/Modal";
import styled from "styled-components";
import Input from "../common/Input";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useMutation } from "@tanstack/react-query";
import { toastState } from "../../store/toast";
import { checkBartender } from "../../api/mypage";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 3rem;
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.6rem;
  > div:first-child {
    font-size: 1rem;
    margin-bottom: 0.45rem;
    color: ${({ theme }) => theme.color.secondGold};
  }
  > div:last-child {
    font-size: 1.1rem;
  }
  > span:last-child {
    margin-top: 0.2rem;
    color: ${({ theme }) => theme.color.red};
    font-size: 0.75rem;
  }
`;

const VerifyingModal = ({ handleClose }) => {
  const [inputs, setInputs] = useState({
    name: "",
    birth: "",
    qualification: "",
    issueDate: "",
    lcsMngNo: "",
  });
  // const { rating, keyword, detail } = inputs;
  const { name, birth, qualification, issueDate, lcsMngNo } = inputs;
  const [warningMsg, setWarningMsg] = useState("");
  const setToastState = useSetRecoilState(toastState);
  const { mutate: mutatePost } = useMutation({
    mutationFn: checkBartender,
    onError: (e) => {
      setToastState({
        show: true,
        message: "인증에 실패했습니다. 다시 시도해주세요.",
        type: "error",
      });
    },
    onSuccess: (e) => {
      if (e.bartender) {
        handleClose();
        setToastState({
          show: true,
          message: "인증에 성공했습니다.",
          type: "success",
          ms: 3000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setToastState({
          show: true,
          message: "유효하지 않은 인증 정보입니다.",
          type: "error",
        });
      }
    },
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs((state) => ({
      ...state,
      [name]: value.toString(),
    }));
  };
  const onSubmit = async () => {
    if (
      name === "" ||
      birth === "" ||
      qualification === "" ||
      issueDate === "" ||
      lcsMngNo === ""
    ) {
      setWarningMsg("* 필수 입력 항목입니다.");
      return;
    }
    console.log("input is ", inputs);
    mutatePost({
      name,
      birth,
      qualification,
      issueDate,
      lcsMngNo,
    });
  };

  return (
    <Modal
      title="전문가 인증"
      handleClose={handleClose}
      onCancel={handleClose}
      onConfirm={onSubmit}
    >
      <Wrapper>
        <Section>
          <div>이름</div>
          <Input
            placeholder="성이름 입력"
            onChange={onChange}
            value={name}
            name="name"
          />
          <span>{name === "" && warningMsg}</span>
        </Section>
        <Section>
          <div>생년월일</div>
          <Input
            type="number"
            className="date"
            onChange={onChange}
            value={birth}
            placeholder="생년월일 여섯 자리 입력"
            name="birth"
          />
          <span>{birth === "" && warningMsg}</span>
        </Section>
        <Section>
          <div>자격증번호</div>
          <Input
            placeholder="자격증 번호 입력"
            onChange={onChange}
            value={qualification}
            name="qualification"
          />
          <span>{qualification === "" && warningMsg}</span>
        </Section>
        <Section>
          <div>발급연월일</div>
          <input
            type="date"
            className="date"
            onChange={onChange}
            value={issueDate}
            name="issueDate"
          />
          <span>{issueDate === "" && warningMsg}</span>
        </Section>
        <Section>
          <div>자격증 내지 번호</div>
          <Input
            placeholder="자격증 내지 번호 입력"
            onChange={onChange}
            value={lcsMngNo}
            name="lcsMngNo"
            type="number"
          />
          <span>{lcsMngNo === "" && warningMsg}</span>
        </Section>
      </Wrapper>
    </Modal>
  );
};

export default VerifyingModal;
