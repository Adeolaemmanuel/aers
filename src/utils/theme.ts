import {extendTheme, NativeBaseProvider} from 'native-base';

const theme = extendTheme({
  components: {
    Input: {
      baseStyle: {},
    },
  },
});
