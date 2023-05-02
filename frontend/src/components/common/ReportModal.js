import Modal from "./Modal";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { useState } from "react";
import styled from "styled-components";

const REASONS = [
  "부적절한 표현, 욕설 또는 혐오 표현",
  "스팸 또는 사용자를 현혹하는 콘텐츠",
  "유해하거나 위험한 콘텐츠",
  "증오 또는 위험한 콘텐츠",
];

const ReportModal = ({ handleClose, onSubmit }) => {
  const [value, setValue] = useState(0);
  const onChange = (e) => {
    setValue(e.target.value);
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

export default ReportModal;
