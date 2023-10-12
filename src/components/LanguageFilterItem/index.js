// Write your code here
import {Component} from 'react'
import './index.css'
class LanguageFilterItem extends Component {
  onClickTab = () => {
    const {updateActiveTab, eachLanguage} = this.props
    const {id} = eachLanguage
    updateActiveTab(id)
  }

  activeTabProps = () => {
    const {isActive} = this.props
    return isActive ? 'active-tab-props' : ''
  }
  render() {
    const {eachLanguage} = this.props
    const {language} = eachLanguage
    return (
      <button type="button" onClick={this.onClickTab} className="tab-btn-props">
        <li className={`each-language-props ${this.activeTabProps()}`}>
          {language}
        </li>
      </button>
    )
  }
}

export default LanguageFilterItem
