import Reflux from 'reflux';
import {
  makeStoreHasMethod,
  apiOk
}
from '../refluxTestHelpers';
import {
  expect
}
from 'chai';

var request = require('superagent');

import API from '../../app/api';

import AlbumsActions from '../../app/actions/AlbumsActions';

const albumsActionsHasMethod = makeStoreHasMethod(AlbumsActions);
describe('Albums Actions Test', () => {

  beforeEach(() => {});

  it('has methods', () => {
    const methods = [
      'get',
      'add',
      'update',
      'delete',
      'search',
      'getMyAlbums',
      'getCategories',
      'onSale',
      'offSale',
      'recommendList'
    ];
    methods.forEach((method) => {
      albumsActionsHasMethod(method);
    })
  });

  describe('API.getCategories', () => {
    it('works on success', (done) => {
      request
        .post(API.ALBUMS.categories)
        .set('Content-Type', 'application/json')
        .send('{"Fields":"Id,Name,Sorting,Display,Views"}')
        .withCredentials()

      .end(function(err, res) {
        // 保证err为null，可以初步证明api可用
        expect(err).to.equal(null);
        // 保证Result大于0，证明数据库有分类数据
        const results = eval('(' + res.text + ')');
        expect(results.Result.length > 0).to.equal(true);
        done();
      });
    });
  });

  describe('API.get', () => {
    const data = {
      Id: 2,
      Fields: "Id,Title,UserId,CategoryId,Description,Service,Price,Cover,Photos.Id,Photos.AlbumsId,Photos.Url,Photos.Description,User.Id,User.NickName,User.Avatar"
    };
    apiOk(API.ALBUMS.get, data, 'Success', '使用ID＝2的作品测试get功能');
  });

  describe('API.search', () => {
    const data = {
      PageIndex:1,
      PageSize:10,
      CategoryId : null,
      Fields : 'Id,Title,UserId,CategoryId,Description,Service,Price,Cover,Photos.Id,Photos.AlbumsId,Photos.Url,Photos.Description,User.Id,User.NickName,User.Avatar'
    };
    apiOk(API.ALBUMS.search, data, 'Success', 'search返回成功');
  });
});