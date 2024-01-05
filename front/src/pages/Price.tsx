import { ChangeEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { DiscountType, DiscountTypeMap, PriceClass } from '../class/PriceClass';
import * as _ from 'lodash';
import { EachPrice } from './components/EachPrice';
import { SampleComponent } from './components/SampleComponent';

export const Price = () => {
  const standardPrice = new PriceClass(uuid(), '通常価格', 1000, DiscountTypeMap.NONE);
  const sale1Price = new PriceClass(uuid(), '割安価格', 1000, DiscountTypeMap.NONE);
  const sale2Price = new PriceClass(uuid(), '激安価格', 1000, DiscountTypeMap.NONE);

  const [priceClasses, setPriceClasses] = useState<PriceClass[]>([
    standardPrice,
    sale1Price,
    sale2Price,
  ]);
  const [sampVal, setSampVal] = useState<string>('');

  const handleChange = (
    priceClassId: string,
    field: keyof PriceClass,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const updatedPriceClasses = priceClasses.map((priceClass: PriceClass) => {
      if (priceClass.id === priceClassId) {
        priceClass.triggerVale(field, e.currentTarget.value);
      }
      return priceClass;
    });
    setPriceClasses(updatedPriceClasses);
  };

  // 実験的
  const handleChange2 = (message: string, e: ChangeEvent<HTMLInputElement>) => {
    setSampVal(e.currentTarget.value);
  };

  return (
    <>
      <div>希望小売価格 {priceClasses[0].retailPrice}</div>
      <ul>
        {priceClasses.map((priceClass: PriceClass) => (
          <li key={priceClass.id}>
            <EachPrice priceClass={priceClass} handleChange={handleChange} />
          </li>
        ))}
      </ul>
      {/* 子供に値を与える */}
      <SampleComponent value={sampVal} handleChange={handleChange2} />
      {sampVal}
    </>
  );
};
