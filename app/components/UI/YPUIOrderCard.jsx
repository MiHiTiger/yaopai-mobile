import React from 'react';
import './css/YPUIOrderCard.scss';

/**
 * 本component是个人中心中订单的UI组件,用于展示不同状态的订单UI
 * @param order: 订单信息,包含以下内容:
 * order.id: 订单ID
 * order.status: 订单状态,分为:
 * order.userId: 订单-用户ID
 * order.grapher.id: 订单-摄影师ID
 * order.grapher.avatar: 订单-摄影师头像
 * order.grapher.name: 订单-摄影师昵称
 * order.grapher.phone: 订单-摄影师电话号码
 * order.title: 订单标题
 * order.time: 预约时间
 * order.price: 订单价格
 * order.payedAmount: 订单实付价格
 * @constructor
 */


const YPUIOrderCard = ({order}) => (
  <div className="YPUIOrderCard">
    <article>
      <section className="user-msg">
        <img src={order.grapher.avatar} />

      </section><section className="order-msg">
        <div>
          <span className="order-title">{order.title}</span>
          <i className="icon grapher_icon close-order" />
        </div>
        <div className="order-detail">
          <i className="icon grapher_icon" />预约时间：{order.time}
        </div>
        <div className="order-detail">
          <i className="icon grapher_icon" />价格：{order.price}
          <p className="fr">实付：￥<span className="prominent">{order.payedAmount}</span></p>
        </div>
      </section>
    </article>

    <article className="order-ctrl">
      <i className="icon grapher_icon" /><span>联系{order.grapher.name}</span>
      <button className="fr">支付</button>
    </article>
  </div>
);

export default YPUIOrderCard;
