import {PropsWithChildren} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../../screens/auth/login';
import {Routes} from './router';
import Register from '../../screens/auth/register';
import Main from '../../screens/app/main';

const Stack = createNativeStackNavigator();

const AppLayout: React.FC<PropsWithChildren> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.login}
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.register}
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.main}
        component={Main}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default AppLayout;
