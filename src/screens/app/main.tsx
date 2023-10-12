import {useNavigation} from '@react-navigation/native';
import {
  FormControl,
  Input,
  View,
  TextArea,
  Button,
  Flex,
  FlatList,
  Text,
  KeyboardAvoidingView,
  Spinner,
} from 'native-base';
import React from 'react';
import QuestionsService from '../../services/question.service';
import {STAGES} from '../../@types/constants';
import TimeInput from '../../components/customInput/time';
import DateInput from '../../components/customInput/date';
import CategoryInput from '../../components/customInput/category';
import SelectInput from '../../components/customInput/select';
import CheckedInput from '../../components/customInput/checked';
import {vs} from 'react-native-size-matters';
import {Dimensions, TurboModuleRegistry} from 'react-native';
import MultiSelectInput from '../../components/customInput/multiSelect';
import SuccessModal from '../../components/modals/success';
import {Routes} from '../../components/layout/router';

const questionsServices = QuestionsService.getInstance();
const stages = [
  STAGES.INCIDENT,
  STAGES['CONTRIBUTORY FACTOR/CAUSE'],
  STAGES.OUTCOME,
  STAGES.TRIGGERS,
  STAGES['FOLlOW UP'],
  STAGES.PATIENT,
];

const Main: React.FC = () => {
  const navigate: any = useNavigation();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [successModal, setSuccessModal] = React.useState(false);
  const [question, setQuestion] = React.useState<Questions[]>([]);
  const [questionLoading, setQuestionLoading] = React.useState(false);
  const [stage, setStage] = React.useState<STAGES>(stages[currentIndex]);
  const [body, setBody] = React.useState<any>({});
  const [loading, setLoading] = React.useState(false);
  const {height: screenHeight} = Dimensions.get('window');

  React.useEffect(() => {
    setQuestionLoading(true);
    questionsServices.getAllQuestion(stage).then(res => {
      if (res) {
        setQuestionLoading(false);
        setQuestion(res);
      }
    });
  }, [stage]);

  const prepareData = (id: number, value: string) => {
    return {
      [id]: value,
    };
  };

  function skip(type = 'forward') {
    let index = currentIndex;
    if (index <= stages.length) {
      index = type === 'forward' ? index + 1 : index - 1;
      setCurrentIndex(index);
      setStage(stages[index]);
    } else {
      setSuccessModal(!successModal);
    }
    console.log(index, stages.length);
  }

  const submit = async () => {
    setLoading(true);
    const res = await questionsServices.insertAnswer(body);
    if (res) {
      setLoading(false);
      if (currentIndex === stages.length) {
        setSuccessModal(!successModal);
      } else {
        skip();
      }
    }
  };

  return (
    <View flex={1} backgroundColor={'white'}>
      <KeyboardAvoidingView width={'95%'} mx={'auto'} mt={vs(45)}>
        <Text fontWeight={'bold'} textAlign={'center'} fontSize={'xl'}>
          {stage?.toUpperCase()?.replaceAll('_', ' ')}
        </Text>
        {questionLoading ? (
          <Spinner marginTop={vs(250)} marginBottom={vs(250)} />
        ) : (
          <FlatList
            height={vs(screenHeight - 320)}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={question}
            renderItem={({item: data, index: ind}) => {
              return (
                <React.Fragment key={ind}>
                  <FormControl marginTop={ind === 0 ? 0 : '3'}>
                    <FormControl.Label color={'muted.800'}>
                      {ind + 1} {data.question}
                    </FormControl.Label>
                    {data.input_type === 'text' && (
                      <Input
                        h={'12'}
                        value={body[data.id] as string}
                        onChangeText={e =>
                          setBody({...body, ...prepareData(data.id, e!)})
                        }
                      />
                    )}
                    {data.input_type === 'time' && (
                      <TimeInput
                        onChange={(time: any) =>
                          setBody({...body, ...prepareData(data.id, time!)})
                        }
                      />
                    )}
                    {data.input_type === 'textarea' && (
                      <TextArea
                        autoCompleteType={''}
                        h={'32'}
                        value={body[data.id] as string}
                        onChangeText={e =>
                          setBody({...body, ...prepareData(data.id, e!)})
                        }
                      />
                    )}
                    {data.input_type === 'date' && (
                      <View>
                        <DateInput
                          onChange={date =>
                            setBody({...body, ...prepareData(data.id, date!)})
                          }
                        />
                      </View>
                    )}
                    {data.input_type === 'category' && (
                      <CategoryInput
                        options={data.options}
                        onChange={cat =>
                          setBody({...body, ...prepareData(data.id, cat!)})
                        }
                      />
                    )}
                    {data.input_type === 'select' && (
                      <SelectInput
                        options={data.options}
                        onChange={cat =>
                          setBody({...body, ...prepareData(data.id, cat!)})
                        }
                      />
                    )}
                    {data.input_type === 'check' && (
                      <CheckedInput
                        options={data.options}
                        onChange={value => {
                          setBody((state: any) => {
                            return {
                              ...state,
                              ...prepareData(data.id, value!),
                            };
                          });
                        }}
                      />
                    )}
                    {data.input_type === 'multi-select' && (
                      <MultiSelectInput
                        options={data.options}
                        onChange={value =>
                          setBody({...body, ...prepareData(data.id, value!)})
                        }
                      />
                    )}
                  </FormControl>
                </React.Fragment>
              );
            }}
          />
        )}
        <Flex direction="row" justifyContent={'space-between'}>
          <Button mt="10" width={'30%'} onPress={() => skip()}>
            Skip
          </Button>
          {/* <Button mt="10" width={'30%'} onPress={() => skip('backward')}>
            Previous
          </Button> */}
          <Button
            isLoading={loading}
            mt="10"
            width={'30%'}
            onPress={() => submit()}>
            Next
          </Button>
        </Flex>
      </KeyboardAvoidingView>
      <SuccessModal
        isOpen={successModal}
        submit={() => {
          setStage(stages[0]);
          setSuccessModal(!successModal);
        }}
        cancel={() => {
          setSuccessModal(!successModal);
          navigate.navigate(Routes.login);
        }}
      />
    </View>
  );
};
export default Main;
