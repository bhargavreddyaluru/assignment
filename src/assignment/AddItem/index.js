import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import Header from '../Header'

import './index.css'

const initialState = {
  itemName: '',
  linkText: '',
  resourceName: '',
  description: '',
  fieldsError: '',
  APIStatus: 'Loading...',
}

class AddItem extends Component {
  state = {...initialState, itemAdded: false}

  onChangeItemName = event => {
    this.setState({itemName: event.target.value})
  }

  onChangeLinkText = event => {
    this.setState({linkText: event.target.value})
  }

  onChangeResourceName = event => {
    this.setState({resourceName: event.target.value})
  }

  onChangeDescription = event => {
    this.setState({description: event.target.value})
  }

  onClickAddMore = () => {
    this.setState({itemAdded: false})
  }

  onSubmitForm = async event => {
    const {itemName, linkText, resourceName, description} = this.state
    const createdAt = new Date()
    event.preventDefault()
    if (
      itemName !== '' &&
      linkText !== '' &&
      resourceName !== '' &&
      description !== ''
    ) {
      const newItem = {
        id: uuidv4(),
        createdAt,
        title: itemName,
        link: linkText,
        resource: resourceName,
      }
      const url =
        'https://media-content.ccbp.in/website/react-assignment/add_resource.json'

      const response = await fetch(url)
      if (response.status === 200) {
        this.setState({
          ...initialState,
          APIStatus: 'Item Added Successfully.',
          itemAdded: true,
        })
      } else if (response.status === 400) {
        this.setState({
          fieldsError: '*Client Side Error',
          APIStatus: 'Client Side Error',
        })
      }
    } else {
      this.setState({fieldsError: '*All fields are mandatory '})
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
          className="add-item-input-field"
          value={itemName}
          onChange={this.onChangeItemName}
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
          className="add-item-input-field"
          value={linkText}
          onChange={this.onChangeLinkText}
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
          className="add-item-input-field"
          value={resourceName}
          onChange={this.onChangeResourceName}
        />
      </div>
    )
  }

  renderDescription = () => {
    const {description} = this.state
    return (
      <div className="input-container">
        <label htmlFor="ItemName" className="label-text">
          DESCRIPTION
        </label>
        <textarea
          type="text"
          placeholder="Enter The Description"
          className="description-field"
          value={description}
          onChange={this.onChangeDescription}
        />
      </div>
    )
  }

  renderSuccessView = () => (
    <div className="success-container">
      <p className="success-message">Item Added Successfully</p>
      <button
        type="button"
        className="create-button"
        onClick={this.onClickAddMore}
      >
        ADD MORE
      </button>
    </div>
  )

  renderCreateButton = () => (
    <div className="create-btn-container">
      {this.renderErrorMessage()}
      <button type="submit" className="create-button">
        CREATE
      </button>
    </div>
  )

  renderErrorMessage = () => {
    const {fieldsError} = this.state
    return <p className="error-message">{fieldsError}</p>
  }

  renderForm = () => (
    <form className="form-container" onSubmit={this.onSubmitForm}>
      <h1 className="form-heading">Item Details</h1>
      {this.renderItemName()}
      {this.renderLinkText()}
      {this.renderResourceName()}
      {this.renderDescription()}
      {this.renderCreateButton()}
    </form>
  )

  render() {
    const {APIStatus, itemAdded} = this.state
    console.log(APIStatus)
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

            {itemAdded ? this.renderSuccessView() : this.renderForm()}
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
