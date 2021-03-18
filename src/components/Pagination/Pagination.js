import React from 'react'

import './Pagination.scss'

const Pagination = (props) => {
  const { pages, currentPage, perPageShow, changePageNum, totalProduct } = props
  return (
    <div className="pagination_list">
      { pages.map(item=>(
        <li 
          key={item} 
          onClick={(e)=>changePageNum(item)} 
          className={["pagination_item", currentPage === item ? 'active' : '', perPageShow > totalProduct ? 'hide' : ''  ].join(' ')}
          >{item}</li>
      )) }
    </div>
  )
}

export default Pagination
