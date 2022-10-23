import {withRouter} from 'react-router-dom'
import {BiLogOut} from 'react-icons/bi'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    history.replace('/login')
  }

  return (
    <div>
      <div className="header-container">
        <img
          src="https://res.cloudinary.com/dqwufvygi/image/upload/v1666363620/Assignment/NxtWave_TM_Coloured_logo_1-Nxt-wave-logo_obwxjx.svg"
          alt="nxt-wave logo"
          className="header-logo"
        />
        <div className="profile-logout-container">
          <img
            src="https://res.cloudinary.com/dqwufvygi/image/upload/v1666364475/Assignment/S-profile-pic_m4pc9l.svg"
            alt="profile"
            className="header-profile-pic"
          />
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogout}
          >
            <BiLogOut className="logout-icon" />
          </button>
        </div>
      </div>

      <hr className="header-line" />
    </div>
  )
}

export default withRouter(Header)
