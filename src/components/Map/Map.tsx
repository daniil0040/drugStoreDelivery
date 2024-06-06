// 'AIzaSyBVjlPX3Hlj-ySG9_tsYwxA1HudwWqHeDk';
// import React, { CSSProperties, useRef, useState } from 'react';
// import { GoogleMap, Marker, StandaloneSearchBox, useJsApiLoader } from '@react-google-maps/api';

// const containerStyle = {
//   width: '400px',
//   height: '400px',
// };

// const inputStyle: CSSProperties = {
//   boxSizing: `border-box`,
//   border: `1px solid transparent`,
//   width: `240px`,
//   height: `32px`,
//   padding: `0 12px`,
//   borderRadius: `3px`,
//   boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
//   fontSize: `14px`,
//   outline: `none`,
//   textOverflow: `ellipses`,
//   position: 'absolute',
//   top: '10px',
//   right: '10px',
// };

// const center = {
//   lat: -3.745,
//   lng: -38.523,
// };

// const AnyReactComponent = ({ text }: any) => <div>{text}</div>;

// const Map = () => {
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: 'AIzaSyBVjlPX3Hlj-ySG9_tsYwxA1HudwWqHeDk',
//     libraries: ['places'],
//   });

//   const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);
//   const [map, setMap] = useState<null | google.maps.Map>(null);

//   const onClick = (e: google.maps.MapMouseEvent) => {
//     console.log('onClick args: ', e);
//     console.log(e?.latLng?.lat() + ', ' + e?.latLng?.lng());
//   };

//   const hanldePlacesChanged = () => {
//     // @ts-ignore
//     const location = searchBoxRef.current.getPlaces()[0].geometry.location;
//     console.log('----------------', location?.toJSON());

//     const bounds = new window.google.maps.LatLngBounds(location?.toJSON());
//     const tempMap = map;
//     tempMap?.fitBounds(bounds);
//     tempMap?.setZoom(8);
//     // @ts-ignore
//     setMap(tempMap);
//     console.log(bounds);
//   };

//   // @ts-ignore
//   const onSearchBoxLoad = (searchBoxInstance: google.maps.places.SearchBox) => {
//     searchBoxRef.current = searchBoxInstance;
//   };

//   const onUnmount = React.useCallback(function callback(map) {
//     setMap(null);
//   }, []);

//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={10}
//       onLoad={map => setMap(map)}
//       onUnmount={onUnmount}
//       onClick={onClick}
//     >
//       <StandaloneSearchBox onLoad={onSearchBoxLoad} onPlacesChanged={hanldePlacesChanged}>
//         <input type="text" placeholder="Customized your placeholder" style={inputStyle} />
//       </StandaloneSearchBox>
//       <AnyReactComponent text="My Anabolics Shop" lng={30.5245025} lat={50.4503596} />
//     </GoogleMap>
//   ) : (
//     <></>
//   );
// };

// export default React.memo(Map);
import React, { CSSProperties, useRef, useState } from 'react';
import {
  DirectionsRenderer,
  GoogleMap,
  InfoWindowF,
  Libraries,
  Marker,
  StandaloneSearchBox,
  useJsApiLoader,
} from '@react-google-maps/api';
import stores from '@/data/stores.json';
import { useAppDispatch } from '@/app/hooks';
import {
  resetCustomerAddress,
  setCustomerAddress,
} from '@/redux/cart/cartSlice';
import { StyledMapContainer, StyledTripInfoContainer } from './Map.styled';

const containerStyle = {
  width: '100%',
  height: '350px',
};

const center = {
  lat: 37.09024,
  lng: -95.712891,
};

const inputStyle: CSSProperties = {
  boxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `240px`,
  height: `32px`,
  padding: `0 12px`,
  borderRadius: `3px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
  position: 'absolute',
  top: '10px',
  right: '20px',
  paddingRight: '25px',
};

type TCoordinates = {
  lat: number;
  lng: number;
};

type TMarker = {
  id: number;
  coordinates: TCoordinates;
  infoWindow: string;
};

const storesMarkersInfo = stores.map(({ id, coordinates, infoWindow }) => {
  return { id, coordinates, infoWindow };
});

const libraries: Libraries = ['places'];

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBVjlPX3Hlj-ySG9_tsYwxA1HudwWqHeDk',
    libraries: libraries,
  });

  const dispatch = useAppDispatch();
  const [searchBox, setSearchBox] =
    useState<google.maps.places.SearchBox | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [activeMarker, setActiveMarker] = useState<TMarker | null>(null);
  const [directionsResponse, setDirectionsResponse] =
    useState<null | google.maps.DirectionsResult>(null);
  const [distance, setDistance] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const originRef = useRef<null | TCoordinates>(null);
  const destinationRef = useRef<null | TCoordinates>(null);
  const searchBarInputRef = useRef<null | HTMLInputElement>(null);

  const handleClickMarker = (marker: TMarker) => {
    if (marker.id === activeMarker?.id) {
      const bounds = new window.google.maps.LatLngBounds(center);
      const tempMap = map;
      tempMap?.fitBounds(bounds);
      tempMap?.setZoom(4);
      // @ts-ignore
      setMap(tempMap);
      return setActiveMarker(null);
    }
    setActiveMarker(marker);
    originRef.current = marker.coordinates;
    const bounds = new window.google.maps.LatLngBounds(marker.coordinates);
    const tempMap = map;
    tempMap?.fitBounds(bounds);
    tempMap?.setZoom(8);
    // @ts-ignore
    setMap(tempMap);
    if (destinationRef.current !== null && directionsResponse === null) {
      calculateRoute();
    }
  };

  const onLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  const onPlacesChanged = () => {
    // @ts-ignore
    const location = searchBox?.getPlaces()[0].geometry.location;
    dispatch(
      setCustomerAddress(searchBox?.getPlaces()?.[0].formatted_address ?? ''),
    );
    if (location?.toJSON() === undefined) return;
    destinationRef.current = location?.toJSON();
    const bounds = new window.google.maps.LatLngBounds(location?.toJSON());
    const tempMap = map;
    tempMap?.fitBounds(bounds);
    tempMap?.setZoom(8);
    // @ts-ignore
    setMap(tempMap);
    if (activeMarker !== null && directionsResponse === null) {
      calculateRoute();
    }
  };
  const onSBLoad = (ref: google.maps.places.SearchBox) => {
    setSearchBox(ref);
  };

  const clearRoute = () => {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef.current = null;
    destinationRef.current = null;
    searchBarInputRef!.current!.value = '';
    const bounds = new window.google.maps.LatLngBounds(center);
    const tempMap = map;
    tempMap?.fitBounds(bounds);
    tempMap?.setZoom(4);
    // @ts-ignore
    setMap(tempMap);
    setActiveMarker(null);
    dispatch(resetCustomerAddress());
  };

  const calculateRoute = async () => {
    if (destinationRef.current === null || originRef.current === null) return;
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current,
      destination: destinationRef.current,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results?.routes?.[0]?.legs?.[0]?.distance?.text ?? '');
    setDuration(results?.routes?.[0].legs?.[0].duration?.text ?? '');
  };

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <StyledMapContainer>
      <StyledTripInfoContainer
        className={directionsResponse ? 'visible' : 'hiden'}
      >
        <h3>Distance: {distance || 'Select address'}</h3>
        <h3>Time: {duration || 'Select address'}</h3>
      </StyledTripInfoContainer>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={4}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={() => setActiveMarker(null)}
        options={{
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
        }}
      >
        <StandaloneSearchBox
          onPlacesChanged={onPlacesChanged}
          onLoad={onSBLoad}
        >
          <input
            type="text"
            placeholder="Your address"
            style={inputStyle}
            ref={searchBarInputRef}
          />
        </StandaloneSearchBox>
        <button
          type="button"
          style={{
            position: 'absolute',
            top: 11,
            right: 25,
            background: 'transparent',
            border: 'none',
            padding: '5px',
            zIndex: 1,
            cursor: 'pointer',
          }}
          onClick={clearRoute}
        >
          &times;
        </button>
        {storesMarkersInfo.map(({ coordinates, id, infoWindow }) => {
          return (
            <Marker
              position={coordinates}
              key={id}
              onClick={() => handleClickMarker({ coordinates, id, infoWindow })}
            >
              {activeMarker?.id === id ? (
                <InfoWindowF
                  onCloseClick={() => {
                    const bounds = new window.google.maps.LatLngBounds(center);
                    const tempMap = map;
                    tempMap?.fitBounds(bounds);
                    tempMap?.setZoom(4);
                    // @ts-ignore
                    setMap(tempMap);
                    setActiveMarker(null);
                    originRef.current = null;
                  }}
                >
                  <div>{infoWindow}</div>
                </InfoWindowF>
              ) : null}
            </Marker>
          );
        })}
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </StyledMapContainer>
  ) : (
    <></>
  );
};

export default React.memo(Map);
