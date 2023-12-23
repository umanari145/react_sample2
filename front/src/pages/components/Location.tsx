import { ChangeEvent, FC } from "react";
import { LocationClass } from "../../class/LocationClass";
import location from '../../json/location.json';

type Props = {
  locationClass:LocationClass,
  changePref:(e:ChangeEvent<HTMLSelectElement>, locationId:string)=> void,
  changeTown:(e:ChangeEvent<HTMLSelectElement>, locationId:string)=> void,
  deleteLocation: (deleteLocationId:string) => void
}  

export const Location:FC<Props> = ({
    locationClass,
    changePref,
    changeTown,
    deleteLocation
}) => {
  return (
    <>
      <select value={locationClass.prefCode} onChange={(e) => changePref(e,locationClass.id)}>
      <option value=""></option>
      {location.pref.map((pref:any) => (
          <option key={pref.code} value={pref.code}>{pref.name}</option>
      ))}
      </select>
      <select value={locationClass.townCode} onChange={(e) => changeTown(e, locationClass.id)}>
      <option value=""></option>
      {location.town.filter((town:any) => town.belong_city_code === locationClass.prefCode)
          .map((town:any) => (
          <option key={town.code} value={town.code}>{town.name}</option>
      ))}
      </select>
      <button onClick={() => deleteLocation(locationClass.id)}>削除</button>
    </>
  )    
}