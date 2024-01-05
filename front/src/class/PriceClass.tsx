import * as _ from 'lodash';

export const DiscountTypeMap = {
  PRICE: '1',
  RATE: '2',
  NONE: '3',
};

export type DiscountType = (typeof DiscountTypeMap)[keyof typeof DiscountTypeMap];

export class PriceClass {
  private _id: string;
  private _retailPrice: number;
  private _discountType: DiscountType;
  private _discountPrice: number | undefined;
  private _discountRate: number | undefined;

  constructor(
    id: string,
    retailPrice: number,
    discountType: DiscountType,
    discountPrice?: number | undefined,
    discountRate?: number | undefined
  ) {
    this._id = id;
    this._retailPrice = retailPrice;
    this._discountType = discountType;
    this._discountPrice = discountPrice;
    this._discountRate = discountRate;
  }

  // IDのgetterとsetter
  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get retailPrice(): number {
    return this._retailPrice;
  }

  set retailPrice(retailPrice: number) {
    this._retailPrice = retailPrice;
  }

  get discountType(): DiscountType {
    return this._discountType;
  }

  set discountType(discountType: DiscountType) {
    this._discountType = discountType;
  }

  // Discount Priceのgetterとsetter
  get discountPrice(): number | undefined {
    return this._discountPrice;
  }

  set discountPrice(discountPrice: number | undefined) {
    this._discountPrice = discountPrice;
  }

  get discountRate(): number | undefined {
    return this._discountRate;
  }

  set discountRate(discountRate: number | undefined) {
    this._discountRate = discountRate;
  }

  public calcDiscountedPrice(): number {
    // アロー演算子だとthisの参照先がhandleChangeでオブジェクトを変更しても
    // 変わらないのでなくなくこの書き方にする
    switch (this._discountType) {
      case DiscountTypeMap.PRICE:
        return this._retailPrice - (this._discountPrice || 0);
      case DiscountTypeMap.RATE:
        return (this._retailPrice * (100 - (this._discountRate || 0))) / 100;
      case DiscountTypeMap.NONE:
        return this._retailPrice;
      default:
        return this._retailPrice;
    }
  }

  public triggerVale = (field: keyof PriceClass, value: string) => {
    switch (field) {
      case 'discountType':
        this._discountType = value;
        // 変更段階である程度
        switch (this._discountType) {
          case DiscountTypeMap.PRICE:
            this._discountRate = undefined;
            break;
          case DiscountTypeMap.RATE:
            this._discountPrice = undefined;
            break;
          case DiscountTypeMap.NONE:
            this._discountRate = undefined;
            this._discountPrice = undefined;
            break;
        }
        break;
      case 'discountPrice': {
        const price = _.isNaN(value) === false ? parseInt(value) : undefined;
        this._discountPrice =
          price !== undefined && price > 0 && price < (this._retailPrice || 0) ? price : undefined;
        break;
      }
      case 'discountRate': {
        const rate = _.isNaN(value) === false ? parseInt(value) : undefined;
        this._discountRate = rate !== undefined && rate > 0 && rate < 100 ? rate : undefined;
        break;
      }
    }
  };
}
