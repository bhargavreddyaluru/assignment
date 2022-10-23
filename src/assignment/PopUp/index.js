import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'

import './index.css'

const sortTypeList = [
  {id: 'recentlyAdded', name: 'Recently Added'},
  {id: 'ascending', name: 'Ascending'},
  {id: 'descending', name: 'Descending'},
]

const PopUp = props => {
  const {sortFunctionality} = props

  return (
    <div className="popup-container">
      <Popup
        trigger={
          <button className="trigger-button" type="button">
            Sort
          </button>
        }
      >
        <ul className="popped-container">
          {sortTypeList.map(item => (
            <li key={item.id} className="pop-up-item">
              <button
                type="button"
                className="sorting-button"
                onClick={() => sortFunctionality(item.id)}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </Popup>
    </div>
  )
}
export default PopUp
