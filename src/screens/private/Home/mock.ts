import { Account } from '@store/account'

export const mockHome: Account = {
  user: 'Test',
  id: '123',
  currentBalance: 110,
  accumulatedGain: 110,
  available: 100,
  brokerGain: 10,
  lastIncome: 10,
  incomePercent: 1,
  lastUpdate: new Date('2023-09-30T20:16:58.966Z'),
  blucoinBalance: 10,
  pendingWithdraw: 0,
}
