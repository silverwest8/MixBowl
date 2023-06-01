import Modal from "../common/Modal";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { useSetRecoilState } from "recoil";
import { toastState } from "../../store/toast";
import styled from "styled-components";
import { reportRecipe } from "../../api/recipeapi";
import { useState } from "react";

const REASONS = [
  "부적절한 표현, 욕설 또는 혐오 표현",
  "스팸 또는 사용자를 현혹하는 콘텐츠",
  "유해하거나 위험한 콘텐츠",
  "증오 또는 위험한 콘텐츠",
];

const RecipeReportModal = ({ handleClose, id }) => {
  const setToastState = useSetRecoilState(toastState);
  const [value, setValue] = useState(0);
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = () => {
    reportRecipe(id, Number(value) + 1)
      .then((response) => {
        if (response.success === true) {
          setToastState({
            show: true,
            message: "신고가 완료되었습니다.",
            type: "success",
            ms: 2000,
          });
        }
        if (response.success === false) {
          setToastState({
            show: true,
            message: "이미 신고한 게시물입니다.",
            type: "error",
            ms: 2000,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
    handleClose();
  };
  return (
    <Modal
      title="신고하기"
      handleClose={handleClose}
      onCancel={handleClose}
      onSubmit={onSubmit}
    >
      <Wrapper>
        {REASONS.map((reason, index) => (
          <FormControl key={index}>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              onChange={onChange}
              value={value}
            >
              <FormControlLabel
                value={index}
                control={<Radio />}
                label={reason}
                className={Number(value) === index ? "selected" : ""}
              />
            </RadioGroup>
          </FormControl>
        ))}
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.875rem;
  .MuiRadio-root {
    color: white !important;
  }
  .MuiRadio-root svg {
    width: 1rem;
    height: 1rem;
  }
  .MuiFormControlLabel-root {
    margin-left: 0;
    margin-right: 0;
  }
  .selected,
  .selected svg {
    color: ${({ theme }) => theme.color.red} !important;
  }
`;

export default RecipeReportModal;
