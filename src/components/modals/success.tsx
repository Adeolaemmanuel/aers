import {Flex} from 'native-base';
import {Modal, View, Text, Button} from 'native-base';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';

const SuccessModal: React.FC<SuccessModal> = ({isOpen, submit, cancel}) => {
  const [show, setShow] = React.useState(isOpen);

  React.useEffect(() => {
    setShow(isOpen);
  }, [isOpen]);

  return (
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
        <Feather name="check-circle" size={50} style={{alignSelf: 'center'}} />
        <Text textAlign={'center'} fontSize={'2xl'} fontWeight={'bold'}>
          Completed
        </Text>
        <Flex direction="row" justifyContent={'space-between'}>
          <Button mt="10" width={'45%'} onPress={() => submit?.()}>
            Start over
          </Button>
          <Button mt="10" width={'45%'} onPress={() => cancel?.()}>
            Logout
          </Button>
        </Flex>
      </View>
    </Modal>
  );
};
export default SuccessModal;
