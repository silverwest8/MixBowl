'use client'

export default function DeleteButton({ id }) {
    function deleteContent(id) {

    }
    return (
        <button className='text-sm text-gray-600' type='button' onClick={() => deleteContent(id)}>
        삭제
        </button>
    )
}