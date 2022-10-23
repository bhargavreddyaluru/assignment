import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {errorMsg: '', username: '', password: ''}

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onSubmitForm = async event => {
    const {history} = this.props
    event.preventDefault()
    const {username, password} = this.state
    if (username === '' && password === '') {
      this.setState({errorMsg: 'Enter Username and Password'})
    } else if (username !== 'bhargav' && password !== 'bhargav@2021') {
      this.setState({errorMsg: 'Username or Password is incorrect'})
    } else if (username === 'bhargav' && password === 'bhargav@2021') {
      history.replace('/')
    }
  }

  renderHeading = () => <h1 className="main-heading">Enter Credentials</h1>

  renderUsername = () => {
    const {username} = this.state
    return (
      <div className="username-container">
        <label htmlFor="username" className="label-text">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="input-field"
          placeholder="Username"
          value={username}
          onChange={this.onChangeUsername}
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <div className="password-container">
        <label htmlFor="password" className="label-text">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="input-field"
          placeholder="Password"
          value={password}
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  renderErrorMessage = () => {
    const {errorMsg} = this.state
    const errorElement =
      errorMsg !== '' ? <p className="error-msg">{errorMsg}</p> : null
    return errorElement
  }

  renderLoginButton = () => (
    <div className="login-button-container">
      <button type="submit" className="login-button">
        Login
      </button>
    </div>
  )

  render() {
    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.onSubmitForm}>
          {this.renderHeading()}
          {this.renderUsername()}
          {this.renderPassword()}
          {this.renderErrorMessage()}
          {this.renderLoginButton()}
        </form>
      </div>
    )
  }
}

export default Login
