// require('./lottie-mock')
// require('./react-native-async-storage-mock')
// require('./react-native-reanimated-mock')
require('./react-native-safe-area-context')
require('./responsive-react-native')

global.beforeEach(() => {
  jest.resetAllMocks()
})
