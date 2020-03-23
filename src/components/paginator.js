import React from "react"
import { Link } from "gatsby"
import paginatorStyles from "./styles/paginator.module.sass"

const Paginator = props => {
  const isFirst = props.currentPage === 1
  const isLast = props.currentPage === props.numPages
  const previousPage = props.currentPage - 1 === 1 ? `/` : `/blog/${props.currentPage - 1}`
  const nextPage = `/blog/${props.currentPage + 1}`

  return (
    <ul className={paginatorStyles.paginator}>
      {
        isFirst
          ? (<li className={paginatorStyles.pageControlButton}>Previous</li>)
          : (<li><Link to={previousPage} rel="prev" className={paginatorStyles.pageControlButtonActive}>Previous</Link></li>)
      }

      {Array.from({ length: props.numPages }, (_, i) => (
        <li key={i}>
          <Link to={i === 0 ? "/" : `/blog/${i+1}`} activeClassName={paginatorStyles.pageNumberActive} >
            {i+1}
          </Link>
        </li>
      ))} 

      {
        isLast
          ? (<li className={paginatorStyles.pageControlButton}>Next</li>)
          : (<li><Link to={nextPage} rel="next" className={paginatorStyles.pageControlButtonActive}>Next</Link></li>)
      }
    </ul>
  )
}

export default Paginator

