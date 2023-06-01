import { useState } from "react";
import OnClickOutside from "./OnClickOutside";
import axios from "axios";

export default function DeleteModal({ id, type }) {
  const [show, setShow] = useState(false);
  function openModal() {
    setShow(true);
  }
  function closeModal() {
    setShow(false);
  }
  async function deleteContent() {
    try {
      const { data } = await axios.delete(`/server/admin/${type}/${id}`);
      if (data.success) {
        window.location.reload();
      }
    }
    catch(e) {
      console.log(e);
    }

  }
  return (
    <>
      <button
        className="text-sm text-red-500"
        type="button"
        onClick={openModal}
      >
        삭제
      </button>
      {show && (
        <div
          tabindex="-1"
          className="fixed z-50 overflow-x-hidden overflow-y-auto inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center p-4"
        >
          <OnClickOutside trigger={closeModal}>
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={closeModal}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center">
                <h3 className="mt-10 mb-6 text-lg font-bold">
                  정말 삭제하시겠습니까?
                </h3>
                <div className="flex gap-12 items-center justify-center">
                  <button
                    onClick={closeModal}
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-8 py-2 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    취소
                  </button>
                  <button
                    onClick={deleteContent}
                    type="button"
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-8 py-2 text-center"
                  >
                    확인
                  </button>
                </div>
              </div>
            </div>
          </OnClickOutside>
        </div>
      )}
    </>
  );
}
