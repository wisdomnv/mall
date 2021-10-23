import { request } from "./reques"

export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}

// 请求推荐数据
export function getRecommend() {
    return request({
        url: "/recommend"
    })
}


// 都需要展示内容
/**
 * title：itemInfo.title
 * oldPrice：itemInfo.oldPrice
 * price:itemInfo.price
 * 活动价：discountDesc
 *
 * 销量/收藏：columns
 * shopInfo.servies：72小时发货
 * shopInfo.servies：退换货，包邮，无理由退货
 */

export class GoodsInfo {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}


// 店铺信息
export class ShopInfo {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods
    }
}


// 6.请求详情页的参数
export class paramsInfo {
    constructor(info, rule) {
        // 注: images可能没有值(某些商品有值, 某些没有值)
        this.image = info.images ? info.images[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}


