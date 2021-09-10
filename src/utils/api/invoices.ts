import { InvoiceIssuer } from '../../services/types/api'

export function dataToOptions(
  data: InvoiceIssuer[],
  includeAll: boolean
): any[] {
  try {
    const options: any[] = includeAll
      ? [
          {
            label: 'All',
            value: ''
          }
        ]
      : []

    data.forEach((row) => {
      options.push({
        value: row.id,
        label: `${row.user.first_name} ${row.user.last_name}`,
        firstName: row.user.first_name,
        lastName: row.user.last_name,
        avatar: row.user.avatar?.url,
        clientObj: row
      })
    })

    return options
  } catch (e) {
    console.error(e)
    return []
  }
}
