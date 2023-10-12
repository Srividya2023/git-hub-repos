import {Component} from 'react'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import Loader from 'react-loader-spinner'

import './index.css'
const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const apiStatusView = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  process: 'PROCESS',
}
class GithubPopularRepos extends Component {
  state = {
    activeTabId: languageFiltersData[0].id,
    isLoading: false,
    repositories: [],
    apiStatus: apiStatusView.initial,
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    this.setState({apiStatus: apiStatusView.process})

    const {activeTabId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`

    const response = await fetch(apiUrl)

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(eachRepo => ({
        name: eachRepo.name,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        forksCount: eachRepo.forks_count,
        starsCount: eachRepo.stars_count,
        avatarUrl: eachRepo.avatar_url,
      }))

      this.setState({
        repositories: updatedData,
        apiStatus: apiStatusView.success,
      })
    } else if (response.status === 401) {
      console.log(response.status)
      this.setState({apiStatus: apiStatusView.failure})
    }
  }

  renderFailureView = () => {
    console.log('failed')
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
        />
        <h1 className="failure-text">Something Went Wrong</h1>
      </div>
    )
  }

  updateActiveTab = id => {
    this.setState({activeTabId: id}, this.getRepositories)
  }

  renderLanguageFilterItems = () => {
    const {activeTabId} = this.state

    return languageFiltersData.map(eachLanguage => (
      <LanguageFilterItem
        eachLanguage={eachLanguage}
        key={eachLanguage.id}
        isActive={activeTabId === eachLanguage.id}
        updateActiveTab={this.updateActiveTab}
      />
    ))
  }

  renderLoadingView = () => {
    return (
      <div className="loader-container-props" data-testid="loader">
        <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
      </div>
    )
  }

  renderRepositoryItemView = () => {
    const {repositories} = this.state

    return repositories.map(eachRepository => (
      <RepositoryItem eachRepository={eachRepository} key={eachRepository.id} />
    ))
  }

  switchCase = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusView.process:
        return this.renderLoadingView()
      case apiStatusView.success:
        return this.renderRepositoryItemView()
      case apiStatusView.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
  render() {
    return (
      <div>
        <h1 className="popular">Popular</h1>

        <ul className="language-filter-item-container">
          {this.renderLanguageFilterItems()}
        </ul>

        <ul className="repository-item-container">{this.switchCase()}</ul>
      </div>
    )
  }
}

export default GithubPopularRepos
