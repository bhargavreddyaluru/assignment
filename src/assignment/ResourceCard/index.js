import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class ResourceCard extends Component {
  render() {
    const {details} = this.props
    const {iconUrl, title, category, link, description, id} = details
    console.log(details)
    return (
      <Link to={`/resource/${id}`} className="resource-list-item">
        <li>
          <div className="resource-card-header">
            <div className="icon-container">
              <img src={iconUrl} alt="icon" className="resource-icon" />
            </div>

            <div>
              <h1 className="resource-card-heading">{title}</h1>
              <p className="resource-card-category">{category}</p>
            </div>
          </div>
          <a href={link} target="_blank" rel="noreferrer" className="link-item">
            {link}
          </a>
          <p className="resource-item-description">{description}</p>
        </li>
      </Link>
    )
  }
}

export default ResourceCard
