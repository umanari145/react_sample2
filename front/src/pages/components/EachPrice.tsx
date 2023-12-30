import { ChangeEvent, FC } from 'react';
import { DiscountTypeMap, PriceClass } from '../../class/PriceClass';

type Props = {
  priceClass: PriceClass;
  handleChange: (prop: string, e: ChangeEvent<HTMLInputElement>) => void;
};

export const EachPrice: FC<Props> = ({ priceClass, handleChange }) => {
  return (
    <ul>
      <li>通常販売価格 {priceClass.calcDiscountedPrice()}</li>
      <li>
        <input
          type="radio"
          value={DiscountTypeMap.PRICE}
          id={`discountTypePrice-${priceClass.id}`}
          name="discountType"
          onChange={(e) => handleChange('discountType', e)}
        />
        <label htmlFor={`discountTypePrice-${priceClass.id}`}>値引額</label>
        <input
          type="number"
          // ** undefinedだとあたいが上書きされないことがあるため以下のように行う
          value={priceClass.discountPrice || ''}
          onChange={(e) => handleChange('discountPrice', e)}
          disabled={priceClass.discountType === DiscountTypeMap.PRICE ? undefined : true}
        />
      </li>
      <li>
        <input
          type="radio"
          value={DiscountTypeMap.RATE}
          id={`discountTypeRate-${priceClass.id}`}
          name="discountType"
          onChange={(e) => handleChange('discountType', e)}
        />
        <label htmlFor={`discountTypeRate-${priceClass.id}`}>割引率</label>
        <input
          type="number"
          value={priceClass.discountRate || ''}
          onChange={(e) => handleChange('discountRate', e)}
          disabled={priceClass.discountType === DiscountTypeMap.RATE ? undefined : true}
        />
      </li>
      <li>
        <input
          type="radio"
          value={DiscountTypeMap.NONE}
          id={`discountTypeNone-${priceClass.id}`}
          name="discountType"
          onChange={(e) => handleChange('discountType', e)}
        />
        <label htmlFor={`discountTypeNone-${priceClass.id}`}>値引なし</label>
      </li>
    </ul>
  );
};
