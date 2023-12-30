import { ChangeEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { DiscountType, DiscountTypeMap, PriceClass } from '../class/PriceClass';
import * as _ from 'lodash';
import { EachPrice } from './components/EachPrice';

export const Price = () => {
  const standardPrice = new PriceClass(uuid(), 1000, DiscountTypeMap.NONE);

  const [priceClasses, setPriceClasses] = useState<PriceClass[]>([standardPrice]);

  const handleChange = (
    priceClassId: string,
    field: keyof PriceClass,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const targetPriceClass = priceClasses.find(
      (priceClass: PriceClass) => priceClass.id === priceClassId
    );
  };

  return (
    <>
      <div>希望小売価格 {priceClasses[0].retailPrice}</div>
      <ul>
        {priceClasses.map((priceClass: PriceClass) => (
          <li key={priceClass.id}>
            <EachPrice priceClass={priceClass} handleChange={(e) => handleChange} />
          </li>
        ))}
      </ul>
    </>
  );
};
