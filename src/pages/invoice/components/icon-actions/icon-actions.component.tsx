import React, { useState } from 'react'

import {
  ChatIcon,
  DeleteOutlinedIcon,
  DownloadIcon,
  OptionsHorizontalIcon,
  PrinterIcon
} from '../../../../assets/media/icons'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import {
  Dropdown,
  DropdownMenu,
  DropdownMenuItem
} from '../../../../components/dropdown'
import SmallModal from '../../../../components/small-modal/small-modal.component'
import { invoiceStatuses } from '../../../../enums/invoice-statuses'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { InvoiceType } from '../../../../types/invoice.type'
import { Styles } from './icon-actions.style'

interface IconActionsProps {
  onRemove: any
  onRemind: any
}

export default function IconActions({
  onRemove,
  onRemind,
  ...data
}: IconActionsProps & InvoiceType) {
  const isMobile = useIsMobile()
  const { t } = useTranslation()
  const [dialog, setDialog] = useState(false)
  return (
    <>
      <Styles>
        {!isMobile && (
          <IconButton size="sm" onClick={window.print}>
            <PrinterIcon />
          </IconButton>
        )}
        <a
          href={data.pdf?.url}
          target="_blank"
          download={`invoice-${data.invoice_number}.pdf`}
          rel="noreferrer"
        >
          <IconButton size="sm" disabled={!data.pdf}>
            <DownloadIcon />
          </IconButton>
        </a>

        <IconButton
          size="sm"
          onClick={() => {
            onRemind(data.invoice_to.uuid, {
              invoice_id: '' + data.id,
              total: data.total,
              currency: data.currency.code,
              status: data.status
            })
          }}
        >
          <ChatIcon />
        </IconButton>

        {data.status !== invoiceStatuses.PAID && (
          <>
            {isMobile ? (
              <IconButton size="sm" onClick={() => setDialog(true)}>
                <OptionsHorizontalIcon />
              </IconButton>
            ) : (
              <Dropdown
                overlay={
                  <DropdownMenu>
                    <DropdownMenuItem $error onClick={onRemove}>
                      <DeleteOutlinedIcon />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenu>
                }
                trigger={['click']}
              >
                <IconButton size="sm">
                  <OptionsHorizontalIcon />
                </IconButton>
              </Dropdown>
            )}
          </>
        )}
      </Styles>

      <SmallModal
        visible={dialog}
        onCancel={() => setDialog(false)}
        title={t('invoices:options')}
        menu={[
          {
            name: t('invoices:print'),
            onClick: window.print
          },
          {
            name: t('invoices:cancel-invoice'),
            onClick: onRemove
          }
        ]}
      />
    </>
  )
}
