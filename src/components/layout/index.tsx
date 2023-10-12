import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import React, {PropsWithChildren} from 'react';
import AppLayout from './app.layout';

const Layout: React.FC<PropsWithChildren> = () => {
  const navigationRef = useNavigationContainerRef();
  return (
    <NavigationContainer ref={navigationRef}>
      <AppLayout />
    </NavigationContainer>
  );
};
export default Layout;
