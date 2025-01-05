import { useCallback, useEffect, useRef } from 'react';
import JsVectorMap from 'jsvectormap';
import 'jsvectormap/dist/jsvectormap.css';
import 'jsvectormap/dist/maps/world';
import { toggleUIState } from '../../../../store/actions/uiActions/uiAction';
import { useDispatch } from 'react-redux';
import DropdownNew from '../../../../components/common/dropdown/DropdownNew';

function DashboardTopSalesMap({ countryData }) {
  const mapRef = useRef(null);
  let primaryDestination = '';
  if (countryData.length > 0) {
    primaryDestination = countryData.find(country => country.isPrimaryDestination).name.common;
  }

  const markers = countryData.map(country => ({
    name: country.name.common,
    coords: country.latlng,
    flags: country.flags.svg,
    style: { initial: { image: country.flags.svg || '' } },
  }));

  const lines = markers
    .filter(marker => marker.name !== primaryDestination)
    .map(marker => ({
      from: marker.name,
      to: primaryDestination,
      style: {
        stroke: 'grey',
        strokeWidth: 1,
      },
    }));
  useEffect(() => {
    if (mapRef.current || countryData.length === 0) return;
    mapRef.current = new JsVectorMap({
      map: 'world',
      selector: '#jvm-map',
      zoomOnScroll: false,
      zoomButtons: false,

      regionStyle: {
        initial: { fill: '#d1d4db' },
      },

      labels: {
        markers: {
          render: (marker) => marker.name,
        },
      },

      markers,
      markerStyle: {
        // initial: { fill: '#5c5cff' },
        // selected: { fill: '#ff5050' },
        initial: { image: '' },
      },
      markerLabelStyle: {
        initial: {
          fontFamily: 'Roboto',
          fontWeight: 400,
          fontSize: 13,
        },
      },
      lines,
      lineStyle: {
        stroke: '#ff5566',
        strokeWidth: 1,
        fill: '#ff5566',
        fillOpacity: 1,
        strokeDasharray: '6 6 6',
        animation: true,
      },

      markersSelectable: true,
      selectedMarkers: markers
        .map((marker, index) => (['Russia', 'Brazil'].includes(marker.name.common) ? index : null))
        .filter(index => index !== null),
    });
    return () => {
      if (mapRef.current && mapRef.current.selector) {
        try {
          mapRef.current.destroy();
        } catch (error) {
          console.error("Error while destroying map:", error);
        }
        mapRef.current = null;
      }
    };

  }, [countryData, lines, markers]);

  // const dispatch = useDispatch();
  // const toggleState = useCallback((key) => {
  //   dispatch(toggleUIState(key));
  // }, [dispatch]);

  return (
    <section className="dashboard-card">
      {/* {countryInfo.name.common} */}
      <div className="">
        <div className="card card-animate">
          <div className="card-header flex justify-between items-center border-b-2 border-gray-200 dark:border-gray-700 p-4">
            <h3 className='capitalized font-medium text-black-400 text-xl fw-bold text-truncate mb-0'>
              Top Sales Location
            </h3>
            <DropdownNew
              label={'Report'}
              dropdownMenuName={'reportDropdownMenu'}
              items={[
                { label: 'Download Report', value: 'Download Report', selected: false },
                { label: 'Export', value: 'Export', selected: false },
                { label: 'Import', value: 'Import', selected: false },
              ]}
              position={'right-0 top-0'}
              arrowIcon={true}
            />
          </div>
          <div className="card-body p-4">
            <div className='lg:container h-[255px]'>
              <div id="jvm-map"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardTopSalesMap;
