import React from 'react'
import { Link } from 'react-router'
import UserMarkLayout from './UserMarkLayout'
import { RouteTransition, presets } from 'react-router-transition'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import AlbumsActions from '../../actions/AlbumsActions'
import AlbumsStore from '../../stores/AlbumsStore'

class UserCollectList extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      CollectRow: <div></div>,
    }
  }

  componentWillMount() {
    // 蛋疼的传参
    // 查询当前用户已收藏作品
    AlbumsActions.search({mark: true})
  }

  onSearchSuccess(data) {
    if(!data.workList.length) {
      this.setState({
        CollectRow: <div className="nothing-found">您还没有收藏过作品：）</div>
      })
    } else {
      this.setState({
        CollectRow: data.workList.map((data, i) => (
          <section
            className="collect-row"
            key={i}
            onClick={() => this.props.history.replaceState(null,`workDetail/${data.Id}`)}
          >
            <div className="media-hd">
              <span
                style={{background: `url(${data.Cover}) no-repeat`, backgroundSize: 'cover'}}
                className="media-work"
              />
            </div>
            <div className="media-bd">
              <div className="media-header">
                <p className="media-title fl">{data.Title}</p>
                <span className="media-city fr">
                  {data.Photographer.CityName.substring(0, data.Photographer.CityName.length)}
                </span>
              </div>
              <p className="media-desc">{data.Description}</p>
              <p className="media-price fr">￥{data.Price}/人</p>
            </div>
          </section>
        ))
      })
    }
  }

  render() {
    return(
      <section className="collect-list">
        <UserMarkLayout />
        <RouteTransition { ...presets.slideLeft } pathname="/center/mark/user_collect">
          {this.state.CollectRow}
        </RouteTransition>
      </section>
    )
  }
}

ReactMixin.onClass(UserCollectList, Reflux.listenTo(AlbumsStore, 'onSearchSuccess'))
export default UserCollectList
