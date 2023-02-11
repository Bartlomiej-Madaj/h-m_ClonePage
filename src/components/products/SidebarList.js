import React from 'react';
import { useDispatch } from 'react-redux';
import { titleHandler } from '../../features/counter/handlerSlice';
import './SidebarList.css';

function SidebarList(props) {

  const dispatch = useDispatch()

  const showTitle = (e) => {
    dispatch(titleHandler(e.target.innerText));
  }

  return (
    <div className='sidebar-list'>
        <h3 className='sidebar-list__title'>{props.title}</h3>
        <ul className='sidebar-list__list'>
            {props.list.map((item, index) => <li onClick={showTitle} key={index}>{item}</li>)}
        </ul>
    </div>
  )
}

export default SidebarList