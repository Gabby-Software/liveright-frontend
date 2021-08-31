import userTypes from '../../enums/user-types.enum'
import { AccountObjType } from '../../types/account.type'
import { OptionType } from '../../types/option.type'

export function dataToOptions(data: AccountObjType[]): OptionType[] {
  try {
    const options: OptionType[] = [
      {
        label: 'All',
        value: 'all'
      }
    ]

    data.forEach((row) => {
      options.push({
        label: `${row.first_name} ${row.last_name}`,
        value: String(
          row.accounts.find((acc) => acc.type === userTypes.CLIENT)?.id || 0
        )
      })
    })

    return options
  } catch (e) {
    console.error(e)
    return []
  }
}
