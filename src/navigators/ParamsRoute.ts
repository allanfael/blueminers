import { RouteProp } from '@react-navigation/native'
import type { StackNavigationProp } from '@react-navigation/stack'
import { ROUTERS } from 'utils/routers'

export type PublicParamsRoute = {
  [ROUTERS.LOGIN]: undefined
}

export type PrivateParamsRoute = {
  [ROUTERS.HOME]: undefined
  [ROUTERS.DEPOSIT]: undefined
  [ROUTERS.DEPOSIT_CONFIRMATION]: {
    value: number
  }
  [ROUTERS.WITHDRAW]: undefined
  [ROUTERS.WITHDRAW_CONFIRMATION]: {
    value: number
  }
}

export type DepositeConfirmationRouteProps = RouteProp<
  PrivateParamsRoute,
  'DepositConfirmation'
>

export type WithdrawConfirmationRouteProps = RouteProp<
  PrivateParamsRoute,
  'WithdrawConfirmation'
>

export type PublicRouteProps = StackNavigationProp<PublicParamsRoute>
export type PrivateRouteProps = StackNavigationProp<PrivateParamsRoute>
