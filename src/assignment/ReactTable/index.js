import {useTable} from 'react-table'
import {v4 as uuidv4} from 'uuid'
import './index.css'

const Table = props => {
  const {columns, data, itemChecked, itemUnchecked} = props

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  const onItemChecked = event => {
    if (event.target.checked) {
      itemChecked(event.target.value)
    } else {
      itemUnchecked(event.target.value)
    }
  }

  // Render the UI for your table
  return (
    <table {...getTableProps()} className="table">
      <thead>
        {headerGroups.map(headerGroup => {
          const headerId = uuidv4()
          return (
            <tr {...headerGroup.getHeaderGroupProps()} className="row">
              <th className="table-headers"> </th>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className="table-headers">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          )
        })}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()} key={row.id}>
              <td className="data-cell">
                <input
                  type="checkbox"
                  className="checkbox"
                  onChange={onItemChecked}
                  value={row.id}
                />
              </td>
              {row.cells.map(cell => {
                const {Header} = cell.column

                const dataId = uuidv4()

                return (
                  <>
                    <td
                      {...cell.getCellProps()}
                      key={dataId}
                      className="data-cell"
                    >
                      {Header === 'Link' ? (
                        <a
                          href={cell.value}
                          className="link-text-styling"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {cell.render('Cell')}
                        </a>
                      ) : (
                        <>{cell.render('Cell')}</>
                      )}
                    </td>
                  </>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const ReactTable = props => {
  const columns = [
    {Header: 'Title', accessor: 'title'},
    {Header: 'Description', accessor: 'description'},
    {Header: 'Link', accessor: 'link'},
  ]

  const {details, itemChecked, itemUnchecked} = props

  return (
    <div>
      <Table
        columns={columns}
        data={details}
        itemChecked={itemChecked}
        itemUnchecked={itemUnchecked}
      />
    </div>
  )
}

export default ReactTable
