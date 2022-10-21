import {Component} from 'react'

import Header from '../Header'
import './index.css'

class Resource extends Component {
  state = {resourceData: {}, resourceItemsList: []}

  componentDidMount() {
    this.getResourceDetails()
  }

  getResourceDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://media-content.ccbp.in/website/react-assignment/resource/${id}.json`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const updatedData = {
        description: data.description,
        id: data.id,
        link: data.link,
        iconUrl: data.icon_url,
        resourceItems: data.resource_items,
        title: data.title,
      }
      this.setState({
        resourceData: updatedData,
        resourceItemsList: data.resource_items,
      })
    }
  }

  renderSearchInput = () => (
    <div className="resource-search-input-container">
      <img
        src="https://res.cloudinary.com/dqwufvygi/image/upload/v1666368809/Assignment/Icon-search-icon_hnpeap.svg"
        alt="search icon"
        className="resource-search-icon"
      />
      <input
        type="search"
        placeholder="Search"
        className="resource-search-input"
      />
    </div>
  )

  renderSort = () => (
    <div className="sort-container">
      <img
        src="https://res.cloudinary.com/dqwufvygi/image/upload/v1666380308/Assignment/Icon-sort-icon_wccxrk.svg"
        alt="sort icon"
        className="sort-icon"
      />
      <p className="sort-heading">SORT</p>
    </div>
  )

  renderResourceContent = () => {
    const {resourceData} = this.state
    const {iconUrl, title, id, link, description} = resourceData
    return (
      <div className="resource-content-container">
        <div className="sub-resource-container">
          <div className="resource-page-header">
            <div className="back-to-resources-container">
              <img
                src="https://res.cloudinary.com/dqwufvygi/image/upload/v1666377476/Assignment/Icon-back-icon_acf1ue.svg"
                alt="back icon"
                className="back-icon"
              />
              <p className="back-to-resources">Resources</p>
            </div>
            <div className="resource-icon-heading-container">
              <div className="resource-icon-container">
                <img
                  src={iconUrl}
                  alt="resource icon"
                  className="resource-page-icon"
                />
              </div>
              <div className="resource-heading-container">
                <h1 className="resource-heading">{title}</h1>
                <p className="resource-page-id">{id}</p>
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="resource-page-link"
                >
                  {link}
                </a>
              </div>
            </div>
            <p className="resource-page-description">{description}</p>
            <button type="button" className="update-button">
              UPDATE
            </button>
          </div>
          <div className="resource-search-container">
            <p className="items-heading">Items</p>
            <div className="resource-search-sort-container">
              {this.renderSearchInput()}
              {this.renderSort()}
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {resourceItemsList} = this.state
    return (
      <>
        <Header />
        {this.renderResourceContent()}
      </>
    )
  }
}

export default Resource
