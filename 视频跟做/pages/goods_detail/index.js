import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({
  data: {
    goodsObj: {}
  },
  GoodsInfo: {},
  onLoad: function (options) {
    const { goods_id } = options
    this.getGoodsDeetail(goods_id)
  },
  async getGoodsDeetail(goods_id) {
    const goodsObj = await request({ url: "/goods/detail", data: { goods_id } })
    this.GoodsInfo = goodsObj
    this.setData({
      goods_name: goodsObj.goods_name,
      goods_price: goodsObj.goods_price,
      goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
      pics: goodsObj.pics
    })
  },
  handlePreviewImage(e) {
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid)
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current,
      urls
    })
  },
  handleCartAdd() {
    let cart = wx.getStorageSync('cart') || []
    letindex = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
    if (index === -1) {
      this.GoodsInfo.num = 1
      cart.push(this.GoodsInfo)
    } else {
      cart[index].num++
    }
    wx.getStorageSync('cart', cart)
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    })
  }
})