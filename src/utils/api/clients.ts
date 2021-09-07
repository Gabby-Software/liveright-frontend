import userTypes from '../../enums/user-types.enum'
import { AccountObjType, ProfileType } from '../../types/account.type'

export function dataToOptions(
  data: AccountObjType[],
  includeAll: boolean
): any[] {
  try {
    const options: any[] = includeAll
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
        value: `${row.id}`,
        firstName: row.first_name,
        lastName: row.last_name,
        avatar: row.avatar?.url
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

export function dataToFormValues(profile: ProfileType): Record<string, any> {
  return {
    dietary_restrictions: profile.dietary_restrictions || '',
    injuries: profile.injuries || ''
  }
}
