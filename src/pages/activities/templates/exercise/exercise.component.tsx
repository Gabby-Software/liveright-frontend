import React, { useMemo } from 'react'
import { useParams } from 'react-router'

import { DeleteOutlinedIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import Card from '../../../../components/cards/card/card.component'
import MobileBack from '../../../../components/mobile-back/mobile-back.component'
import { Title } from '../../../../components/typography'
import { Routes } from '../../../../enums/routes.enum'
import useTemplateExercise from '../../../../hooks/api/templates/useTemplateExercise'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import TemplateLayout from '../../components/layout/layout.component'
import { Styles } from '../../styles/plan.styles'
import { GeneralTable } from '../components/general-table/general-table.component'
import TemplateMobilePage from '../components/template-mobile-page/template-mobile-page.component'

const labels = ['Sets', 'Reps', 'Tempo', 'Rest Interval', 'Video Link']
const keys = ['sets', 'reps', 'tempo', 'rest_interval', 'video']
const links = ['video']

export default function Excercise() {
  const isMobile = useIsMobile()
  const params = useParams<any>()
  const { exercise } = useTemplateExercise(params.id)

  const { detail, row } = useMemo(() => {
    const rows = [
      {
        ...exercise.info,
        video: exercise.link
      }
    ]
    return {
      detail: rows,
      row: rows[0]
    }
  }, [exercise, params])

  const onDelete = () => {}

  const content = isMobile ? (
    <div className="MobileExercise">
      {labels.map((l, i) => (
        <div className="MobileExercise__row" key={i}>
          <div className="MobileExercise__row-name">{l}</div>
          <div className="MobileExercise__row-value">
            {(row as any)[keys[i]] || '-'}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <section className="PlanPage__content">
      <div className="table">
        <GeneralTable labels={labels} keys={keys} links={links} data={detail} />
      </div>
    </section>
  )

  // No need now, maybe needed later on
  /* <Dialog
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
  </Dialog> */

  return isMobile ? (
    <TemplateMobilePage
      contentTitle={exercise.name}
      pageTitle={'Exercise Detail'}
      onDelete={() => {}}
    >
      <Styles>{content}</Styles>
    </TemplateMobilePage>
  ) : (
    <TemplateLayout>
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
          {content}
        </Card>
      </Styles>
    </TemplateLayout>
  )
}
