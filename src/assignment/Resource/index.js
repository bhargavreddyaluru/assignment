import {Component} from 'react'

import Header from '../Header'
import ReactTable from '../ReactTable'
import Pagination from '../Pagination'
import Button from '../Button'
import PopUp from '../PopUp'

import './index.css'

class Resource extends Component {
  state = {
    resourceData: {},
    resourceItemsList: [],
    perPageList: [],
    searchFilteredList: [],
    checkedList: [],
    sortedResults: [],
    searchInput: '',
  }

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
    if (response.ok) {
      const updatedData = {
        description: data.description,
        id: data.id,
        link: data.link,
        iconUrl: data.icon_url,
        resourceItems: data.resource_items,
        title: data.title,
      }
      const updatedResources = data.resource_items.map(item => ({
        ...item,
        description: item.description.slice(0, 100),
      }))
      console.log(updatedResources)

      this.setState({
        resourceData: updatedData,
        resourceItemsList: updatedResources,
        perPageList: updatedResources.slice(0, 6),
        searchFilteredList: updatedResources,
        sortedResults: updatedResources,
      })
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value}, this.searchFiltering())
  }

  searchFiltering = () => {
    const {resourceItemsList, searchInput} = this.state
    const newFilteredList = resourceItemsList.filter(item =>
      item.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    this.setState({
      searchFilteredList: newFilteredList,
      perPageList: newFilteredList.slice(0, 6),
    })
  }

  onClickUpdate = async () => {
    const url =
      'https://media-content.ccbp.in/website/react-assignment/resource/update.json'
    const options = {method: 'GET'}
    const response = await fetch(url, options)
    console.log(response.status)
  }

  onClickAddBtn = () => {
    const {history} = this.props
    history.push('/add-item')
  }

  itemUnchecked = () => {
    this.setState(prevState => {
      const {checkedList} = prevState
      checkedList.pop()
      return {checkedList: [...checkedList]}
    })
  }

  itemChecked = item => {
    this.setState(prevState => ({
      checkedList: [...prevState.checkedList, item],
    }))
  }

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
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
          value={searchInput}
          onChange={this.onChangeSearchInput}
        />
      </div>
    )
  }

  renderSort = () => (
    <div className="sort-container">
      <img
        src="https://res.cloudinary.com/dqwufvygi/image/upload/v1666380308/Assignment/Icon-sort-icon_wccxrk.svg"
        alt="sort icon"
        className="sort-icon"
      />
      <PopUp />
    </div>
  )

  pageHandler = pageNumber => {
    const {searchFilteredList} = this.state
    this.setState({
      perPageList: searchFilteredList.slice(
        (pageNumber - 1) * 6,
        pageNumber * 6,
      ),
    })
  }

  renderResourceContent = () => {
    const {
      resourceData,
      searchFilteredList,
      perPageList,
      checkedList,
    } = this.state

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
            <button
              type="button"
              className="update-button"
              onClick={this.onClickUpdate}
            >
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
          <ReactTable
            details={perPageList}
            itemChecked={this.itemChecked}
            itemUnchecked={this.itemUnchecked}
          />
          <div className="resource-footer-container">
            <div className="buttons-container">
              <button type="button" onClick={this.onClickAddBtn}>
                ADD ITEM
              </button>
              <Button checkedList={checkedList}>DELETE</Button>
            </div>
            <Pagination
              details={searchFilteredList}
              pageHandler={this.pageHandler}
            />
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <>
        <Header />
        {this.renderResourceContent()}
      </>
    )
  }
}

export default Resource
