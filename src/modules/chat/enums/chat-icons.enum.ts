import { ReactComponent as FileIcon } from '../../../assets/media/icons/file-type-default.svg'
import { ReactComponent as DocIcon } from '../../../assets/media/icons/file-type-doc.svg'
import { ReactComponent as PDFIcon } from '../../../assets/media/icons/file-type-pdf.svg'
import { ReactComponent as VideoIcon } from '../../../assets/media/icons/file-type-video.svg'
import { ReactComponent as XLSIcon } from '../../../assets/media/icons/file-type-xls.svg'
import { ReactComponent as ZipIcon } from '../../../assets/media/icons/file-type-zip.svg'
import {
  FileTypesOptionsType,
  KnownFileTypesType
} from '../types/known-file-types.type'

export const chatIcons = new Proxy<FileTypesOptionsType>(
  {
    pdf: PDFIcon,
    xls: XLSIcon,
    xlsx: XLSIcon,
    csv: XLSIcon,
    doc: DocIcon,
    docx: DocIcon,
    zip: ZipIcon,
    mov: VideoIcon,
    webm: VideoIcon,
    avi: VideoIcon,
    wmv: VideoIcon,
    mp4: VideoIcon
  },
  {
    get: function (target, prop) {
      return prop in target ? target[prop as KnownFileTypesType] : FileIcon
    }
  }
)
