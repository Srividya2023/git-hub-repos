// Write your code here

import './index.css'
const RepositoryItem = props => {
  const {eachRepository} = props
  const {name, id, issuesCount, forksCount, starsCount, avatarUrl} =
    eachRepository
  return (
    <li className="respositories-list-props">
      <img src={avatarUrl} className="avatar-url-props" alt={name} />
      <h1 className="name-props">{name}</h1>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="count-img-props"
        />
        <p>{starsCount} stars</p>
      </div>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="count-img-props"
        />
        <p>{forksCount} forks</p>
      </div>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt=" open issues"
          className="count-img-props"
        />
        <p>{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
