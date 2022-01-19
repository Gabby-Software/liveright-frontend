import React, { useMemo, useState } from 'react'
import { useParams } from 'react-router'

import { DeleteOutlinedIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import Card from '../../../../components/cards/card/card.component'
import Dialog from '../../../../components/dialogs/dialog/dialog.component'
import MobileBack from '../../../../components/mobile-back/mobile-back.component'
import { Title } from '../../../../components/typography'
import { Routes } from '../../../../enums/routes.enum'
import useTemplateExercise from '../../../../hooks/api/templates/useTemplateExercise'
import ActivityLayout from '../../components/layout/layout.component'
import { Styles } from '../../styles/plan.styles'
import { GeneralTable } from '../components/general-table/general-table.component'

const labels = ['Sets', 'Reps', 'Tempo', 'Rest Interval', 'Video Link']
const keys = ['sets', 'reps', 'tempo', 'rest_interval', 'video']
const links = ['video']

export default function Excercise() {
  const params = useParams<any>()
  const { exercise } = useTemplateExercise(params.id)

  const detail = useMemo(() => {
    const rows = [
      {
        ...exercise.info,
        video: exercise.link
      }
    ]
    return rows
  }, [exercise, params])

  const [showConfirm, setShowConfirm] = useState(false)
  const onDelete = () => {}

  return (
    <ActivityLayout>
      <Styles>
        <section className="topbar">
          <MobileBack
            to={Routes.ACTIVITIES_TM}
            alias="templates"
            className="topbar-back"
          />

          <Button variant="text" onClick={onDelete} className="topbar-delete">
            <DeleteOutlinedIcon style={{ marginRight: 8 }} />
            Delete Template
          </Button>
        </section>

        <Card className="PlanPage__card">
          <section className="PlanPage__header">
            <Title>{exercise.name}</Title>

            {/* <div className="PlanPage__header-actions">
              <Button variant="dark" className="PlanPage__header-btn">
                Edit Exercise Template
              </Button>
              <Button
                className="PlanPage__header-btn"
                onClick={() => setShowConfirm(true)}
              >
                Use Exercise Template
              </Button>
            </div> */}
          </section>

          <section className="PlanPage__divider" />

          <section className="PlanPage__content">
            <div className="table">
              <GeneralTable
                labels={labels}
                keys={keys}
                links={links}
                data={detail}
              />
            </div>
          </section>
        </Card>
      </Styles>

      <Dialog
        open={showConfirm}
        title="Use exercise template"
        onClose={() => setShowConfirm(false)}
      >
        <p style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          To use this exercise, search for its name within any workout.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={() => setShowConfirm(false)}>Ok, got it</Button>
        </div>
      </Dialog>
    </ActivityLayout>
  )
}
