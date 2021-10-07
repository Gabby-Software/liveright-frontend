import { EP_FILES } from '../../enums/api.enum'
import api from '../../managers/api.manager'

export async function uploadFile(file: any) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await api({
    method: 'POST',
    url: EP_FILES,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return response.data.data.path
}
