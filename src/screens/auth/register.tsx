import {
  Button,
  FormControl,
  Input,
  Text,
  View,
  Select,
  Flex,
  Radio,
} from 'native-base';
import React from 'react';
import SystemService from '../../services/system.service';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../components/layout/router';
import {vs} from 'react-native-size-matters';
import UserService from '../../services/user.service';

const systemService = SystemService.getInstance();
const userService = UserService.getInstance();

const Register: React.FC<RegisterProps<RegisterRoute>> = ({route}) => {
  const navigate: any = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const [designation, setDesignation] = React.useState<DesignationState[]>([]);
  const [body, setBody] = React.useState<CreateUser>({
    email: route?.params?.user?.email,
    first_name: route?.params?.user?.first_name,
    last_name: route?.params?.user?.last_name,
    phone_number: route?.params?.user?.phone_number,
    designation_id: 0,
    is_contactable: route?.params?.user?.is_contactable,
  });

  React.useEffect(() => {
    systemService.getUserDesignation().then(res => {
      setDesignation(res);
    });
  }, []);

  const submit = async () => {
    const check = userService.strictCheck<CreateUser>(body);
    if (check?.error) {
      setLoading(false);
      userService.info(check.error);
      return;
    }
    switch (route.params.action) {
      case 'insert':
        let res = await userService.createUser(check?.data! as any);
        if (res?.data) {
          setLoading(false);
          navigate.navigate(Routes.main);
        }
      case 'update':
        res = await userService.updateUser(check?.data! as any)!;
        if (res?.data) {
          setLoading(false);
          navigate.navigate(Routes.main);
        }
      default:
        break;
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
          Let us know who is reporting
        </Text>
        <FormControl mt={'10'} isRequired>
          <FormControl.Label>First name</FormControl.Label>
          <Input
            h={'12'}
            value={body.first_name}
            onChangeText={first_name => setBody({...body, first_name})}
          />
        </FormControl>
        <FormControl mt={'3'} isRequired>
          <FormControl.Label>Last name</FormControl.Label>
          <Input
            h={'12'}
            value={body.last_name}
            onChangeText={last_name => setBody({...body, last_name})}
          />
        </FormControl>
        <FormControl mt={'3'} isRequired>
          <FormControl.Label>Phone number</FormControl.Label>
          <Input
            h={'12'}
            value={body.phone_number}
            onChangeText={phone_number => setBody({...body, phone_number})}
          />
        </FormControl>
        <FormControl mt={'3'} isRequired>
          <FormControl.Label>Designation</FormControl.Label>
          <Select
            h={'12'}
            onValueChange={designation_id =>
              setBody({...body, designation_id: parseInt(designation_id)})
            }>
            {designation.map((data, key) => {
              return (
                <Select.Item key={key} label={data.name} value={data.id} />
              );
            })}
          </Select>
        </FormControl>
        <FormControl mt={'3'} isRequired>
          <FormControl.Label>
            I may be contacted by hospital administrator/management for
            follow-up about this reported incident?
          </FormControl.Label>
          <Radio.Group
            value={`${body.is_contactable}`}
            onChange={value => {
              if (value === 'true') {
                setBody({...body, is_contactable: true});
              } else setBody({...body, is_contactable: false});
            }}
            name="contact"
            mt={'3'}
            direction="row">
            <Radio value={`true`} my={1}>
              Yes
            </Radio>
            <Radio ml={4} value={`false`} my={1}>
              No
            </Radio>
          </Radio.Group>
        </FormControl>

        <Button isLoading={loading} onPress={() => submit()} mt={'7'}>
          Submit
        </Button>
      </View>
    </View>
  );
};
export default Register;
