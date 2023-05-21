import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import Modal from "../common/Modal";
import { nameChange } from "../../api/mypage";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { toastState } from "../../store/toast";
import Input from "../common/Input";
import { FaTimes } from "react-icons/fa";

const WarningSet = styled.div`
  color: ${({ theme }) => theme.color.red};
  font-size: 0.75rem;
  display: flex;
  justify-content: left;
  margin-top: 0.5rem;
  width: 100%;
  .icon {
    margin-right: 0.5rem;
  }
`;

const NameChangeModal = ({ handleClose, username }) => {
  const setToastState = useSetRecoilState(toastState);
  const [warningMsg, setWarningMsg] = useState("");
  const { mutate: mutateEdit } = useMutation({
    mutationFn: nameChange,
    onError: (e) => {
      setToastState({
        show: true,
        message: "닉네임 수정에 실패했습니다. 다시 시도해주세요.",
        type: "error",
      });
      console.log(e);
    },
    onSuccess: () => {
      setToastState({
        show: true,
        message: "닉네임 수정이 완료되었습니다.",
        type: "success",
      });
      handleClose();
    },
  });
  const [uname, setUname] = useState({ username });

  const onChange = (e) => {
    const { value } = e.target;
    setUname(() => ({
      username: value,
    }));
  };
  const onSubmit = async () => {
    setWarningMsg("");
    if (uname.username === "") {
      setWarningMsg("닉네임을 입력해 주세요");
      return;
    }
    if (uname.username.length > 10) {
      setWarningMsg("글자수 제한은 10자 입니다");
      return;
    }
    // TODO : 중복됐을 경우
    mutateEdit({ username });
  };

  return (
    <Modal
      title="닉네임 수정"
      handleClose={handleClose}
      onCancel={handleClose}
      onConfirm={() => onSubmit(username)}
    >
      <Input
        defaultValue={username}
        placeholder="새 닉네임 입력"
        onChange={onChange}
      />
      {warningMsg === "" ? (
        ""
      ) : (
        <WarningSet>
          <FaTimes className="icon" />
          <p>{warningMsg}</p>
        </WarningSet>
      )}
    </Modal>
  );
};
export default NameChangeModal;
