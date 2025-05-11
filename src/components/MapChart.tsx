'use client';

// @ts-ignore
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { useLanguage } from '../context/LanguageContext';
import saudiGeoUrl from '../data/SA_regions.json';

type Props = {
  data: any[];
  regionKey: string; // مثل "المنطقة"
};

export default function MapChart({ data, regionKey }: Props) {
  const { language } = useLanguage();

  const regionCounts: Record<string, number> = {};
  data.forEach((row) => {
    const region = row[regionKey];
    if (region) {
      regionCounts[region.trim()] = (regionCounts[region.trim()] || 0) + 1;
    }
  });

  return (
    <div className="bg-white/5 p-4 rounded-xl shadow-lg mt-8">
      <h2 className="text-white text-lg mb-4">
        {language === 'ar'
          ? 'توزيع المنشآت على خريطة السعودية'
          : 'Establishment Distribution in Saudi Arabia'}
      </h2>
      <ComposableMap projection="geoMercator" projectionConfig={{ center: [45, 24], scale: 1100 }}>
        <Geographies geography={saudiGeoUrl}>
          {({ geographies }: { geographies: any[] }) =>
            geographies.map((geo: any) => {
              const name = geo.properties.name_ar || geo.properties.name;
              const count = regionCounts[name] || 0;
              const color = `rgba(255,255,255,${Math.min(count / 200, 0.8)})`;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={color}
                  stroke="#fff"
                  style={{
                    default: { outline: 'none' },
                    hover: { fill: '#F53', outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
