import { Link } from 'react-router-dom'

import Button from '../../../../components/buttons/button/button.component'
import DataTable from '../../../../components/data-table/data-table.component'
import ClientSelect from '../../../../components/form/client-select/client-select.component'
import Select from '../../../../components/form/select/select.component'
import MobileBack from '../../../../components/mobile-back/mobile-back.component'
import { EmptyPlaceholder } from '../../../../components/placeholders'
import { Title } from '../../../../components/typography'
import { Routes } from '../../../../enums/routes.enum'
import { Styles, StylesContent } from './plans.styles'

const LABELS = ['Plan name', 'Client', 'Days', 'Start', 'End', 'Status']
const KEYS = ['name', 'client', 'days', 'start', 'end', 'status']

const DATA = [
  {
    name: '10 Days of Wonder',
    client: 'John Travolta',
    days: '5',
    start: '04/10/2021',
    end: '04/10/2021',
    status: 'Inactive'
  },
  {
    name: 'Reduce Bodyweight',
    client: 'John Travolta',
    days: '7',
    start: '04/10/2021',
    end: '04/10/2021',
    status: 'Active'
  }
]

export default function TrainingPlans() {
  return (
    <Styles>
      <StylesContent>
        <MobileBack
          to="/"
          alias="current-plan"
          className="training-plans__back"
        />

        <div className="training-plans__title-container">
          <Title>Training Plans</Title>

          <div>
            <Button>Create New Plan</Button>
          </div>
        </div>

        <div className="training-plans__filters">
          <ClientSelect
            id="training-plans-client"
            onChange={() => {}}
            placeholder="All Client"
            className="training-plans__select"
          />

          <Select
            id="training-plans-statuses"
            options={[]}
            placeholder="All Status"
            className="training-plans__select"
          />
        </div>

        <div>
          <DataTable
            labels={LABELS}
            data={DATA}
            keys={KEYS}
            round="10px"
            render={{
              name: (row) => (
                <Link
                  to={`${Routes.ACTIVITIES_TP}/${row.id}`}
                  className="training-plans__table-link"
                >
                  <span>{row.name}</span>
                </Link>
              ),
              status: (row) => (
                <span
                  data-status={row.status.toLowerCase()}
                  className="training-plans__table-status"
                >
                  {row.status}
                </span>
              )
            }}
          />

          {!DATA.length && <EmptyPlaceholder spacing />}
        </div>
      </StylesContent>
    </Styles>
  )
}
