import {Component} from 'react'
import Header from '../Header'
import ResourceCard from '../ResourceCard'
import './index.css'

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
  state = {resourcesList: [], activeTabId: 'resource', searchInput: ''}

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
      this.setState({resourcesList: updatedData})
    }
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

  renderResourcesList = () => {
    const {resourcesList, activeTabId, searchInput} = this.state
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

    return (
      <div className="resources-container">
        {this.renderSearchInput()}
        <ul className="resources-list">
          {searchFilteredList.map(item => (
            <ResourceCard details={item} key={item.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderHomeContainer = () => (
    <div className="home-container">
      {this.renderTabsList()}
      {this.renderResourcesList()}
    </div>
  )

  render() {
    return (
      <>
        <Header />
        {this.renderHomeContainer()}
      </>
    )
  }
}

export default Home
