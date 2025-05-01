import React from 'react';
// For mobile, you might use a package such as expo-ads-admob. Here we use a stub.

interface AdmobBannerProps {
  adUnitID: string;
}

const AdmobBanner: React.FC<AdmobBannerProps> = ({ adUnitID }) => {
  // If running in a mobile app environment, replace this with real AdMob component.
  return (
    <div style={{ width: '100%', height: '50px', backgroundColor: '#eee', textAlign:'center', lineHeight:'50px' }}>
      Google AdMob Banner (Ad Unit: {adUnitID})
    </div>
  );
};

export default AdmobBanner;