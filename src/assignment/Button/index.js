import './index.css'

const Button = props => {
  const {children, checkedList} = props
  const len = checkedList.length
  let styling = null
  if (children === `ADD ITEM`) {
    styling = len === 0 ? `active-button` : `disabled-button`
  } else if (children === 'DELETE') {
    styling = len === 0 ? `disabled-button` : `delete-button`
  }
  return (
    <button type="button" className={`button ${styling}`}>
      {children}
    </button>
  )
}
export default Button
