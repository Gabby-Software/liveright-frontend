import userTypes from '../../enums/user-types.enum'
import { AccountObjType } from '../../types/account.type'
import { OptionType } from '../../types/option.type'

export function dataToOptions(
  data: AccountObjType[],
  includeAll: boolean
): OptionType[] {
  try {
    const options: OptionType[] = includeAll
      ? [
          {
            label: 'All',
            value: 'all'
          }
        ]
      : []

    data.forEach((row) => {
      options.push({
        label: `${row.first_name} ${row.last_name}`,
        value: `${row.id}`
      })
    })

    return options
  } catch (e) {
    console.error(e)
    return []
  }
}

export function formatClients(data: any[]): AccountObjType[] {
  try {
    return data.map((row) => {
      return {
        ...row,
        ...(row.accounts?.find((acc: any) => acc.type === userTypes.CLIENT) ||
          {})
      }
    })
  } catch (e) {
    console.error(e)
    return []
  }
}
