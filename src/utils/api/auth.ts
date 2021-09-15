import userTypes from '../../enums/user-types.enum'
import { AccessOptionType } from '../../types/access-option.type'

export function isClient(type: AccessOptionType): boolean {
  return type === userTypes.CLIENT
}

export function isTrainer(type: AccessOptionType): boolean {
  return type === userTypes.TRAINER
}
