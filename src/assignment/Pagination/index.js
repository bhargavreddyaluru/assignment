import ReactPaginate from 'react-paginate'
import './index.css'

const Pagination = props => {
  const {details, pageHandler} = props
  const pageCount = Math.ceil(details.length / 6)
  const pageNumbers = []
  for (let i = 1; i < Math.ceil(details.length / 6); i += 1) {
    pageNumbers.push(i)
  }

  const handlePageClick = event => {
    pageHandler(event.selected + 1)
  }

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={1}
      marginPagesDisplayed={1}
      pageCount={pageCount}
      previousLabel="<"
      renderOnZeroPageCount={null}
      containerClassName="pagination-container"
      activeClassName="active-link"
      breakLinkClassName="break-page"
      pageLinkClassName="page-link"
      nextLinkClassName="next-link"
      previousLinkClassName="next-link"
    />
  )
}

export default Pagination
