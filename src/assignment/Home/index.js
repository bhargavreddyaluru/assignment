import {Component} from 'react'
import Header from '../Header'
import ResourceCard from '../ResourceCard'
import LoadingView from '../LoadingView'
import SomethingWentWrong from '../SomethingWentWrong'
import Pagination from '../Pagination'
import './index.css'

const loadingStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const tabsList = [
  {id: 'resource', name: 'Resources'},
  {id: 'request', name: 'Requests'},
  {id: 'user', name: 'Users'},
]

const TabItem = props => {
  const {details, onClickTab, isActive} = props
  const {name, id} = details
  const tabStyling = isActive ? `active-tab` : `tab-button`
  const tabClicked = () => {
    onClickTab(id)
  }

  return (
    <li>
      <button type="button" className={tabStyling} onClick={tabClicked}>
        {name}
      </button>
    </li>
  )
}

class Home extends Component {
  state = {
    resourcesList: [],
    activeTabId: 'resource',
    searchInput: '',
    isLoading: loadingStatus.loading,
    pageNumber: 1,
  }

  componentDidMount() {
    this.getResources()
  }

  getResources = async () => {
    const url =
      'https://media-content.ccbp.in/website/react-assignment/resources.json'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.map(item => ({
        category: item.category,
        description: item.description,
        id: item.id,
        link: item.link,
        title: item.title,
        tag: item.tag,
        iconUrl: item.icon_url,
      }))
      this.setState({
        resourcesList: updatedData,
        isLoading: loadingStatus.success,
      })
    } else if (response.status >= 400) {
      this.setState({isLoading: loadingStatus.failure})
    }
  }

  pageHandler = pageNumber => {
    this.setState({
      pageNumber,
    })
  }

  onClickTab = id => {
    this.setState({activeTabId: id})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderTabsList = () => {
    const {activeTabId} = this.state
    return (
      <ul className="tabs-list">
        {tabsList.map(eachTab => (
          <TabItem
            details={eachTab}
            key={eachTab.id}
            onClickTab={this.onClickTab}
            isActive={eachTab.id === activeTabId}
          />
        ))}
      </ul>
    )
  }

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-input-container">
        <img
          src="https://res.cloudinary.com/dqwufvygi/image/upload/v1666368809/Assignment/Icon-search-icon_hnpeap.svg"
          alt="search icon"
          className="search-icon"
        />
        <input
          type="search"
          placeholder="Search"
          className="search-input"
          onChange={this.onChangeSearchInput}
          value={searchInput}
        />
      </div>
    )
  }

  renderPagination = details => (
    <div className="pagination-container">
      <Pagination pageHandler={this.pageHandler} details={details} />
    </div>
  )

  renderResourcesList = () => {
    const {resourcesList, activeTabId, searchInput, pageNumber} = this.state
    let filteredList = []
    switch (activeTabId) {
      case 'request':
        filteredList = resourcesList.filter(item => item.tag === 'request')
        break
      case 'user':
        filteredList = resourcesList.filter(item => item.tag === 'user')
        break
      default:
        filteredList = resourcesList
    }

    const searchFilteredList = filteredList.filter(item =>
      item.title.toLowerCase().includes(searchInput.toLowerCase()),
    )

    const perPageList = searchFilteredList.slice(
      (pageNumber - 1) * 6,
      pageNumber * 6,
    )

    return (
      <div className="resources-container">
        {this.renderSearchInput()}
        <ul className="resources-list">
          {perPageList.map(item => (
            <ResourceCard details={item} key={item.id} />
          ))}
        </ul>
        {this.renderPagination(searchFilteredList)}
      </div>
    )
  }

  renderHomeContainer = () => (
    <div className="home-container">
      {this.renderTabsList()}
      {this.renderResourcesList()}
    </div>
  )

  loadingBasedRender = () => {
    const {isLoading} = this.state
    switch (isLoading) {
      case loadingStatus.loading:
        return <LoadingView />
      case loadingStatus.success:
        return this.renderHomeContainer()
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

export default Home
