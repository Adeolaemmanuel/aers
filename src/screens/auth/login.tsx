import {useNavigation} from '@react-navigation/native';
import {Button, Flex, FormControl, Input, Modal, Text, View} from 'native-base';
import {Routes} from '../../components/layout/router';
import UserService from '../../services/user.service';
import React from 'react';
import {vs} from 'react-native-size-matters';

const userService = UserService.getInstance();
const Login: React.FC = () => {
  const navigate: any = useNavigation();
  const [show, setShow] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [user, setUser] = React.useState<Partial<User>>();
  const [loading, setLoading] = React.useState(false);

  const submit = async () => {
    try {
      setLoading(true);
      const check = userService.strictCheck({email}, {validations: ['email']});
      if (!check?.status) {
        setLoading(false);
        return userService.info(check?.error);
      }
      const res = await userService.getUser(email);
      if (!res) {
        setLoading(true);
        navigate.navigate(Routes.register, {email, action: 'insert'});
      } else {
        setUser(res);
        setLoading(false);
        setShow(!show);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View flex={1}>
      <View width={'95%'} mx={'auto'} mt={vs(55)}>
        <Text
          textAlign={'center'}
          fontSize={'lg'}
          fontWeight={'medium'}
          w={'90%'}
          mx={'auto'}>
          Welcome to Individual Practitioner Reporting of Adverse events
        </Text>
        <FormControl mt={'10'}>
          <FormControl.Label>Email</FormControl.Label>
          <Input
            h={'12'}
            value={email}
            onChangeText={value => setEmail(value)}
          />
        </FormControl>
        <Button onPress={() => submit()} mt={'7'}>
          Continue
        </Button>
      </View>

      <Modal
        animationPreset="slide"
        isOpen={show}
        onClose={() => setShow(!show)}
        style={{justifyContent: 'flex-end', margin: 0}}>
        <View
          h={'30%'}
          borderTopRightRadius={25}
          borderTopLeftRadius={25}
          padding={10}
          background={'white'}>
          <Text fontSize={'lg'} fontWeight={'bold'}>
            Welcome {user?.last_name} {user?.first_name},
          </Text>
          <Text>
            Would you like to continue with your details or update them?
          </Text>
          <Flex direction="row" justifyContent={'space-between'}>
            <Button
              mt="10"
              width={'45%'}
              onPress={() => {
                setShow(!show);
                navigate.navigate(Routes.register, {user, action: 'update'});
              }}>
              Update
            </Button>
            <Button
              isLoading={loading}
              mt="10"
              width={'45%'}
              onPress={() => {
                setShow(!show);
                navigate.navigate(Routes.main);
                userService._storage().set(user!);
              }}>
              Continue
            </Button>
          </Flex>
        </View>
      </Modal>
    </View>
  );
};
export default Login;
