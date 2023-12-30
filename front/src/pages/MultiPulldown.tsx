import { v4 as uuid } from 'uuid';
import { ChangeEvent, useState } from 'react';
import { Location } from './components/Location';
import { LocationClass } from '../class/LocationClass';

export const MultiPulldown = () => {
  const initLocationClass = new LocationClass(uuid());

  const [locationClasses, setLocationClasses] = useState<LocationClass[]>([initLocationClass]);

  const changePref = (e: ChangeEvent<HTMLSelectElement>, locationId: string) => {
    const updatedLocationClasses = locationClasses.map((locationClass) => {
      if (locationClass.id === locationId) {
        locationClass.prefCode = e.currentTarget.value;
      }
      return locationClass;
    });
    setLocationClasses(updatedLocationClasses);
  };

  const changeTown = (e: ChangeEvent<HTMLSelectElement>, locationId: string) => {
    const updatedLocationClasses = locationClasses.map((locationClass) => {
      if (locationClass.id === locationId) {
        locationClass.townCode = e.currentTarget.value;
      }
      return locationClass;
    });
    setLocationClasses(updatedLocationClasses);
  };

  const addLocation = () => {
    const locationClass = new LocationClass(uuid());
    setLocationClasses([...locationClasses, locationClass]);
  };

  const deleteLocation = (deleteLocationId: string) => {
    setLocationClasses(
      locationClasses.filter(
        (locationClass: LocationClass) => locationClass.id !== deleteLocationId
      )
    );
  };

  return (
    <>
      <button onClick={addLocation}>追加</button>
      <ul>
        {locationClasses.map((locationClass: LocationClass) => (
          <li key={locationClass.id}>
            <Location
              locationClass={locationClass}
              changePref={(e) => changePref(e, locationClass.id)}
              changeTown={(e) => changeTown(e, locationClass.id)}
              deleteLocation={deleteLocation}
            />
          </li>
        ))}
      </ul>
    </>
  );
};
