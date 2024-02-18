import {Button, FormControl, Input, Text, View, Select} from 'native-base';
import React from 'react';
import SystemService from '../../services/system.service';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../components/layout/router';
import {vs} from 'react-native-size-matters';
import UserService from '../../services/user.service';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';

const systemService = SystemService.getInstance();
const userService = UserService.getInstance();

const Register: React.FC<RegisterProps<RegisterRoute>> = ({route}) => {
  const navigate: any = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const [designation, setDesignation] = React.useState<DesignationState[]>([]);
  const [body, setBody] = React.useState<CreateUser>({
    email: route?.params?.user?.email || route.params.email,
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

  const radioButtons: RadioButtonProps[] = React.useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Yes',
        value: 'true',
      },
      {
        id: '0',
        label: 'No',
        value: 'false',
      },
    ],
    [],
  );

  console.log(body, route);
  

  const bool = (value: string) => {
    if (value === '1') return true;
    else return false;
  };

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
          <RadioGroup
            radioButtons={radioButtons}
            onPress={c => setBody({...body, is_contactable: bool(c)})}
            selectedId={body.is_contactable ? '1' : '0'}
            layout="row"
          />
        </FormControl>

        <Button isLoading={loading} onPress={() => submit()} mt={'7'}>
          Submit
        </Button>
      </View>
    </View>
  );
};
export default Register;
