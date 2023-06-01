import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import Modal from "../common/Modal";
import { nameChange } from "../../api/mypage";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { toastState } from "../../store/toast";
import Input from "../common/Input";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { getAccessToken } from "../../utils/token";

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

const NameChangeModal = ({ handleClose, checkname }) => {
  const setToastState = useSetRecoilState(toastState);
  const [uname, setUname] = useState({ checkname });

  const [warningMsg, setWarningMsg] = useState("");
  const { mutate: mutateEdit } = useMutation({
    mutationFn: nameChange,
    onError: (e) => {
      setToastState({
        show: true,
        message: "닉네임 수정에 실패했습니다. 다시 시도해주세요.",
        type: "error",
      });
    },
    onSuccess: () => {
      setToastState({
        show: true,
        message: "닉네임 수정이 완료되었습니다.",
        type: "success",
      });
      handleClose();
      window.location.reload();
    },
  });

  const onChange = (e) => {
    const { value } = e.target;
    setUname(() => ({
      checkname: value,
    }));
  };
  const onSubmit = async () => {
    setWarningMsg("");
    if (uname.checkname === "") {
      setWarningMsg("닉네임을 입력해 주세요");
      return;
    }
    if (uname.checkname.length > 10) {
      setWarningMsg("글자수 제한은 10자 입니다");
      return;
    }
    // 중복됐을 경우
    const token = getAccessToken();
    axios.defaults.headers.common.Authorization = token;
    const { data } = await axios.put("api/users/nicknamedupcheck", {
      checkname: uname.checkname,
    });

    if (data.duplicate === false) {
      mutateEdit({ uname });
    } else {
      setToastState({
        show: true,
        message: "중복된 닉네임입니다. 다시 시도해주세요.",
        type: "error",
      });
    }
  };

  return (
    <Modal
      title="닉네임 수정"
      handleClose={handleClose}
      onCancel={handleClose}
      onConfirm={() => onSubmit(checkname)}
    >
      <Input
        defaultValue={checkname}
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
