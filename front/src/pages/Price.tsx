import { ChangeEvent, useState } from "react"
import {v4 as uuid} from 'uuid';
import { DiscountType, DiscountTypeMap, PriceClass } from "../class/PriceClass";
import * as _ from 'lodash';

export const Price = () => {

  const standardPrice = new PriceClass(uuid(), 1000, DiscountTypeMap.NONE)

  const [priceClass, setPriceClass] = useState<PriceClass>(standardPrice)

  const handleChange = (field: keyof PriceClass) => (e: ChangeEvent<HTMLInputElement>) => {
    const newPriceClass = _.cloneDeep(priceClass)
    if (field === 'discountType' ) {
      newPriceClass.discountType = e.currentTarget.value as DiscountType
      newPriceClass.discountRate = undefined
      newPriceClass.discountPrice = undefined
    } else if (field === 'discountRate') {
      let discount_rate = _.isNaN(e.currentTarget.value) === false ? parseInt(e.currentTarget.value) : undefined
      discount_rate = (discount_rate !== undefined && discount_rate > 0 && discount_rate < 100 ) ? discount_rate : undefined
      // この書き方はclassには使えない(interfaceならあり)
      /*setPriceClass(prevPriceClass => ({
          ...prevPriceClass,
          discountRate: discount_rate
      }));*/
      newPriceClass.discountRate = discount_rate
    } else if (field === 'discountPrice') {
      const discount_price = _.isNaN(e.currentTarget.value) === false ? parseInt(e.currentTarget.value) : undefined
      newPriceClass.discountPrice = (discount_price !== undefined && discount_price > 0 && discount_price < (newPriceClass.retailPrice || 0) ) ? discount_price : undefined
    }
    setPriceClass(newPriceClass)
  };

  return (
    <>
     <ul>
       <li>
        希望小売価格  {priceClass.retailPrice}
       </li>
       <li>
        販売価格 {priceClass.calcDiscountedPrice()}
       </li>
       <li>
        <input 
          type="radio" 
          value={DiscountTypeMap.PRICE} 
          id="discountTypePrice" 
          name="discountType" 
          onChange={handleChange('discountType')} 
        />
        <label htmlFor="discountTypePrice">値引額</label>
        <input 
          type="number" 
          value={priceClass.discountPrice || ''} 
          onChange={handleChange('discountPrice')}
          disabled={priceClass.discountType === DiscountTypeMap.PRICE ? undefined: true}
        />
       </li>
       <li>
        <input 
          type="radio" 
          value={DiscountTypeMap.RATE} 
          id="discountTypeRate" 
          name="discountType" 
          onChange={handleChange('discountType')} 
        />
        <label htmlFor="discountTypeRate">割引率</label>
        <input 
          type="number"
          value={priceClass.discountRate || ''} 
          onChange={handleChange('discountRate')} 
          disabled={priceClass.discountType === DiscountTypeMap.RATE ? undefined: true}
        />
       </li>
       <li>
        <input 
          type="radio" 
          value={DiscountTypeMap.NONE} 
          id="discountTypeNone" 
          name="discountType" 
          onChange={handleChange('discountType')} 
        />
        <label htmlFor="discountTypeNone">値引なし</label>
       </li>
     </ul>
    </>
  )
}