jest.mock('react-native-safe-area-context', () => {
  const {
    default: mockSafeAreaContext,
  } = require('react-native-safe-area-context/jest/mock')
  return mockSafeAreaContext
})
