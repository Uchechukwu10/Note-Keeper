import React, { useContext } from 'react'
import { NoteContext } from '../Contexts';
import {  BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';

const Pagination = (props) => {
  const {editing, setEditing} = useContext(NoteContext);
  return (
    <div className={editing ? 'pagination pt-10 pb-10 blurred' : 'pagination pt-10 pb-10'}>
        <div className='flex flex-row justify-center pages'>
            <div className={props.currentPage > 1 ? 'px-5 text-sky-500' : 'px-5 text-slate-300 unclick'} onClick={() => props.navigatePage('back')}><BsFillArrowLeftCircleFill fontSize='1.5rem'/></div>
            <div className='bg-sky-500 px-3 text-white rounded-lg text-xl'>{props.currentPage}</div>
            <div className={props.currentPage < props.totalPages ? 'px-5 text-sky-500' : 'px-5 text-slate-300 unclick'} onClick={() => props.navigatePage('next')}><BsFillArrowRightCircleFill fontSize='1.5rem'/></div>
        </div>
    </div>
  )
}

export default Pagination