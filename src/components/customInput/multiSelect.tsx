import {Checkbox, Flex, Modal, ScrollView, Text, View} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const MultiSelectInput: React.FC<SelectInputProps> = ({options, onChange}) => {
  const [show, setShow] = React.useState(false);
  const [selected, setSelected] = React.useState<any[]>([]);
  return (
    <React.Fragment>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          padding: 9,
          height: 50,
          paddingTop: 13,
          borderRadius: 4,
          marginTop: 6,
          borderColor: '#a1a1aa',
        }}
        onPress={() => setShow(!show)}>
        <Text color={'#71717a'}>Select options</Text>
      </TouchableOpacity>
      <Flex direction="row" flexWrap="wrap" w="100%">
        {selected.map((data, key) => {
          return (
            <Flex
              direction="row"
              key={key}
              maxW={350}
              borderWidth={'1'}
              m={'1'}>
              <Text p={'1'}>{data}</Text>
              <AntDesign
                name="closecircleo"
                size={20}
                onPress={() => {
                  selected.splice(selected.indexOf(data), 1);
                  setSelected([...selected]);
                  onChange(selected);
                }}
                style={{padding: 4}}
              />
            </Flex>
          );
        })}
      </Flex>
      <Modal
        animationPreset="slide"
        isOpen={show}
        onClose={() => setShow(!show)}
        style={{justifyContent: 'flex-end', margin: 0}}>
        <View
          h={'60%'}
          borderTopRightRadius={25}
          borderTopLeftRadius={25}
          width={'100%'}
          background={'white'}>
          <ScrollView>
            {options.map((data: string, key) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    let select = new Set(selected);
                    select.add(data);
                    setSelected([...select]);
                    onChange(selected);
                  }}
                  key={key}
                  style={{padding: 15}}>
                  <Flex direction="row" justifyContent={'space-between'}>
                    <Text fontSize={'md'}>{data}</Text>
                    {selected.includes(data) ? (
                      <Ionicons
                        name="checkmark"
                        size={25}
                        style={{padding: 4}}
                      />
                    ) : null}
                  </Flex>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    </React.Fragment>
  );
};

export default MultiSelectInput;
