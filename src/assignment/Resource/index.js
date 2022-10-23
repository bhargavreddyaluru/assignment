import {Component} from 'react'

import Header from '../Header'
import ReactTable from '../ReactTable'
import Pagination from '../Pagination'
import PopUp from '../PopUp'
import LoadingView from '../LoadingView'
import SomethingWentWrong from '../SomethingWentWrong'
import './index.css'

const loadingStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Resource extends Component {
  state = {
    resourceData: {},
    resourceItemsList: [],
    perPageList: [],
    searchFilteredList: [],
    checkedList: [],
    sortedResults: [],
    searchInput: '',
    isLoading: loadingStatus.loading,
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

      this.setState({
        resourceData: updatedData,
        resourceItemsList: updatedResources,
        perPageList: updatedResources.slice(0, 6),
        searchFilteredList: updatedResources,
        sortedResults: updatedResources,
        isLoading: loadingStatus.success,
      })
    } else if (response.status === 400) {
      this.setState({isLoading: loadingStatus.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState(
      {searchInput: event.target.value},
      this.searchFiltering(event),
    )
  }

  searchFiltering = event => {
    const {sortedResults} = this.state
    const newFilteredList = sortedResults.filter(item =>
      item.title.toLowerCase().includes(event.target.value.toLowerCase()),
    )
    this.setState({
      searchFilteredList: newFilteredList,
      perPageList: newFilteredList.slice(0, 6),
    })
  }

  sortFunctionality = type => {
    const {resourceItemsList} = this.state
    switch (type) {
      case 'ascending':
        resourceItemsList.sort((a, b) => {
          const textA = a.title.toUpperCase()
          const textB = b.title.toUpperCase()
          if (textA < textB) {
            return -1
          }
          if (textA > textB) {
            return 1
          }
          return 0
        })
        this.setState({
          sortedResults: resourceItemsList,
          perPageList: resourceItemsList.slice(0, 6),
        })
        break
      case 'descending':
        resourceItemsList.sort((a, b) => {
          const textA = a.title.toUpperCase()
          const textB = b.title.toUpperCase()
          if (textA < textB) {
            return 1
          }
          if (textA > textB) {
            return -1
          }
          return 0
        })
        this.setState({
          sortedResults: resourceItemsList,
          perPageList: resourceItemsList.slice(0, 6),
        })
        break
      case 'recentlyAdded':
        resourceItemsList.sort((a, b) => {
          const dateA = new Date(a.createdAt)
          const dateB = new Date(b.createdAt)
          if (dateA > dateB) {
            return 1
          }
          if (dateA < dateB) {
            return -1
          }
          return 0
        })
        this.setState({
          sortedResults: resourceItemsList,
          perPageList: resourceItemsList.slice(0, 6),
        })
        break
      default:
        this.setState({sortedResults: resourceItemsList})
    }
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
      <PopUp sortFunctionality={this.sortFunctionality} />
    </div>
  )

  pageHandler = pageNumber => {
    const {sortedResults} = this.state
    this.setState({
      perPageList: sortedResults.slice((pageNumber - 1) * 6, pageNumber * 6),
    })
  }

  renderResourceContent = () => {
    const {
      resourceData,
      searchFilteredList,
      perPageList,
      checkedList,
    } = this.state

    const len = checkedList.length
    const addBtnStyling = len === 0 ? 'active-button' : null
    const deleteBtnStyling = len === 0 ? null : 'delete-button'

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
              <button
                type="button"
                onClick={this.onClickAddBtn}
                className={`button ${addBtnStyling}`}
              >
                ADD ITEM
              </button>
              <button type="button" className={`button ${deleteBtnStyling}`}>
                DELETE
              </button>
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

  loadingBasedRender = () => {
    const {isLoading} = this.state
    switch (isLoading) {
      case loadingStatus.loading:
        return <LoadingView />
      case loadingStatus.success:
        return this.renderResourceContent()
      default:
        return <SomethingWentWrong />
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.loadingBasedRender()}
      </>
    )
  }
}

export default Resource
