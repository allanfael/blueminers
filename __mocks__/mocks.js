// require('./lottie-mock')
// require('./react-native-async-storage-mock')
// require('./react-native-reanimated-mock')
import '@testing-library/react-native/extend-expect'
require('./react-native-safe-area-context')
require('./responsive-react-native')

global.beforeEach(() => {
  jest.resetAllMocks()
})

global.fetch = jest.fn()

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigationState: jest.fn(),
  useNavigation: jest.fn(() => ({
    state: { params: {} },
    dispatch: jest.fn(),
    goBack: jest.fn(),
    dismiss: jest.fn(),
    navigate: jest.fn(),
    openDrawer: jest.fn(),
    closeDrawer: jest.fn(),
    toggleDrawer: jest.fn(),
    getParam: jest.fn(),
    setParams: jest.fn(),
    addListener: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    pop: jest.fn(),
    popToTop: jest.fn(),
    isFocused: jest.fn(),
    setOptions: jest.fn(),
  })),
  useIsFocused: jest.fn(),
}))

jest.mock('react-hook-form', () => {
  const actual = jest.requireActual('react-hook-form')
  const mockValues = {}
  const mockErrors = {}

  return {
    ...actual,
    Controller: ({ render, name }) => {
      const value = mockValues[name] || '' // Retorna o valor armazenado no mock ou uma string vazia

      const onChange = (newValue) => {
        console.log(`onChange: ${name} -> ${newValue}`)
        mockValues[name] = newValue // Atualiza o valor no mock
      }

      return render({
        field: {
          onChange,
          onBlur: jest.fn(),
          value,
          name,
          ref: jest.fn(),
        },
        fieldState: { invalid: false },
        formState: { errors: {} },
      })
    },
    useForm: () => ({
      control: {
        setValue: jest.fn((name, value) => {
          mockValues[name] = value
        }),
        getValues: jest.fn((name) => mockValues[name] || ''),
        watch: jest.fn(() => mockValues),
      },
      setValue: jest.fn((name, value) => {
        mockValues[name] = value
      }),
      setError: jest.fn((name, error) => {
        mockErrors[name] = error
      }),
      handleSubmit: jest.fn(),
      formState: {
        get errors() {
          return mockErrors
        },
        isSubmitting: false,
      },
    }),
  }
})
