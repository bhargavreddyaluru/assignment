import {Component} from 'react'
import Header from '../Header'
import './index.css'

class AddItem extends Component {
  state = {
    itemName: '',
    linkText: '',
    resourceName: '',
    description: '',
    itemNameError: '',
  }

  onSubmitForm = event => {
    event.preventDefault()
  }

  onBlurItemName = event => {
    if (event.target.value === '') {
      console.log('error')
      this.setState({itemNameError: '*Please Enter Item Name'})
    }
  }

  renderItemName = () => {
    const {itemName, itemNameError} = this.state
    return (
      <div className="input-container">
        <label htmlFor="ItemName" className="label-text">
          ITEM NAME
        </label>
        <input
          type="text"
          placeholder="Enter Item Name"
          id="ItemName"
          className="input-field"
          value={itemName}
          onBlur={this.onBlurItemName}
        />
        {itemNameError && <p className="error-message">{itemNameError}</p>}
      </div>
    )
  }

  renderLinkText = () => {
    const {linkText} = this.state
    return (
      <div className="input-container">
        <label htmlFor="LinkText" className="label-text">
          LINK
        </label>
        <input
          type="text"
          placeholder="Enter The Link"
          id="LinkText"
          className="input-field"
          value={linkText}
        />
      </div>
    )
  }

  renderResourceName = () => {
    const {resourceName} = this.state
    return (
      <div className="input-container">
        <label htmlFor="ResourceName" className="label-text">
          RESOURCE NAME
        </label>
        <input
          type="text"
          placeholder="Enter The Resource Name"
          id="ResourceName"
          className="input-field"
          value={resourceName}
        />
      </div>
    )
  }

  renderDescription = () => {
    const {description} = this.state
    return (
      <div className="input-container">
        <label htmlFor="ItemName" className="label-text">
          RESOURCE NAME
        </label>
        <textarea
          type="text"
          placeholder="Enter The Description"
          className="description-field"
          value={description}
        />
      </div>
    )
  }

  renderCreateButton = () => (
    <div className="create-btn-container">
      <button type="submit" className="create-button">
        CREATE
      </button>
    </div>
  )

  renderForm = () => {
    const letter = 'HI'
    return (
      <form className="form-container" onSubmit={this.onSubmitForm}>
        <h1 className="form-heading">Item Details</h1>
        {this.renderItemName()}
        {this.renderLinkText()}
        {this.renderResourceName()}
        {this.renderDescription()}
        {this.renderCreateButton()}
      </form>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="bottom-container">
          <div className="bottom-left-container">
            <div className="back-to-users-container">
              <img
                src="https://res.cloudinary.com/dqwufvygi/image/upload/v1666377476/Assignment/Icon-back-icon_acf1ue.svg"
                alt="back to users"
                className="back-arrow"
              />
              <p className="back-to-users">Users</p>
            </div>
            {this.renderForm()}
          </div>
          <img
            src="https://res.cloudinary.com/dqwufvygi/image/upload/v1666468682/Assignment/Group_3-create-item_xz9216.png"
            alt="create item"
            className="create-item-image"
          />
        </div>
      </>
    )
  }
}

export default AddItem
