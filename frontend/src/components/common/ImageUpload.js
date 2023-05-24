import { BiPlusCircle, BiMinusCircle } from "react-icons/bi";
import { useRecoilState } from "recoil";
import { imageFileListState } from "../../store/imageFile";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const ImageUpload = ({ defaultFiles }) => {
  const ref = useRef(null);
  const [files, setImageFileListState] = useRecoilState(imageFileListState);
  const [message, setMessage] = useState("");
  const addImageFile = (e) => {
    if (files.length === 5) {
      setMessage("* 이미지는 5개까지 첨부 가능합니다.");
      return;
    }
    setImageFileListState((files) => [
      {
        id: files.length === 0 ? 0 : files[0].id + 1,
        file: e.target.files[0],
      },
      ...files,
    ]);
    e.target.value = "";
  };
  const removeImage = (id) => {
    setImageFileListState((files) => files.filter((item) => item.id !== id));
    setMessage("");
  };
  const openFileInput = () => {
    if (files.length === 5) {
      setMessage("* 이미지는 5개까지 첨부 가능합니다.");
      return;
    }
    ref.current?.click();
  };
  useEffect(() => {
    if (defaultFiles)
      setImageFileListState(
        defaultFiles.map((file, index) => ({
          id: defaultFiles.length - index,
          file,
        }))
      );
    return () => {
      setImageFileListState([]);
    };
  }, []);
  console.log(files);
  return (
    <Section>
      <div className="header">
        <h3>이미지 첨부</h3>
        <span>{files.length} / 5</span>
        {message && <p className="message">{message}</p>}
      </div>
      <div className="selection-wrapper">
        <div>
          {files.length !== 0 && (
            <div className="image-list">
              {files.map((item) => (
                <ImageWrapper
                  key={item.id}
                  onClick={() => removeImage(item.id)}
                >
                  <img src={URL.createObjectURL(item.file)} />
                  <div className="background" />
                  <BiMinusCircle />
                </ImageWrapper>
              ))}
            </div>
          )}
          <div>
            <button onClick={openFileInput} type="button">
              <BiPlusCircle />
            </button>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={ref}
              onChange={addImageFile}
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

const Section = styled.section`
  width: 100%;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  .message {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.color.red};
  }
  .header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .hidden {
    display: none;
  }
  .selection-wrapper {
    overflow-x: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
    & > div {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      width: calc(30.25rem + 20px);
    }
  }
  svg {
    font-size: 1.25rem;
    color: ${({ theme }) => theme.color.primaryGold};
  }
  .image-list {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
`;

const ImageWrapper = styled.div`
  width: 5rem;
  height: 5rem;
  position: relative;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.color.primaryGold};
  border-radius: 2px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 2px;
  }
  svg {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .background {
    display: none;
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  }
  &:hover {
    svg {
      display: block;
    }
    .background {
      display: block;
    }
  }
`;

export default React.memo(ImageUpload);
