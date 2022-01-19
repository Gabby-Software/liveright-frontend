import { lazy } from 'react'

import { footerTypes } from '../enums/footer-types'
import { Routes } from '../enums/routes.enum'
import { RouteType } from '../types/route.type'
import headers from './header.config'

export const authRoutes: RouteType[] = [
  // {
  //     title: 'Login',
  //     url: Routes.LOGIN,
  //     Component: lazy(() => import('../pages/auth/login/login.component')),
  //     header: {}
  // },
  // {
  //     title: 'Sign Up',
  //     url: Routes.REGISTER,
  //     Component: lazy(() => import('../pages/auth/sign-up/sign-up.component')),
  //     header: {},
  //     props: {exact: true}
  // },
  // {
  //     title: 'Forget Password',
  //     url: Routes.FORGOT_PASSWORD,
  //     Component: lazy(() => import('../pages/auth/forgot-password/forgot-password.component')),
  //     header: {}
  // },
  // {
  //     title: 'Forget Password Confirmation',
  //     url: Routes.FORGOT_PASSWORD_CONFIRMATION,
  //     Component: lazy(() => import('../pages/auth/forgot-password-confirmation/forgot-password-confirmation.component')),
  //     header: {}
  // },
  // {
  //     title: 'Reset Password',
  //     url: Routes.RESET_PASSWORD,
  //     Component: lazy(() => import('../pages/auth/reset-password/reset-password.component')),
  //     header: {}
  // },
  // {
  //     title: 'Sign up confirmation',
  //     url: Routes.REGISTER_CONFIRMATION,
  //     Component: lazy(() => import('../pages/auth/sign-up-confirmation/sign-up-confirmation.component')),
  //     header: {}
  // },
  // {
  //   title: 'Sign up onboarding',
  //   url: Routes.REGISTER_ON_BOARD,
  //   Component: lazy(
  //     () => import('../pages/auth/sign-up-onboard/sign-up-onboard.component')
  //   ),
  //   header: {}
  // }
  // {
  //     title: 'Email verification',
  //     url: `${Routes.VERIFY_EMAIL}/:id/:token`,
  //     Component: lazy(() => import('../pages/auth/verify-email/verify-email.component')),
  //     header: {}
  // }
]
export const routes: RouteType[] = [
  {
    title: 'Homepage',
    url: Routes.HOME,
    Component: lazy(() => import('../pages/dashboard/dashboard.component')),
    props: { exact: true },
    version: 2,
    mobileLayout: false,
    header: {}
  },
  {
    title: 'Calendar',
    url: Routes.CALENDAR,
    Component: lazy(() => import('../pages/calendar/calendar.component')),
    version: 2,
    mobileLayout: false,
    header: {
      items: [],
      title: null
    }
  },
  {
    title: 'Liveright 2',
    url: '/test',
    Component: lazy(() => import('../components/test/test.component')),
    header: {}
  },
  {
    title: 'Trainer',
    url: Routes.TRAINER,
    Component: lazy(() => import('../pages/trainer/trainer.component')),
    version: 2,
    mobileLayout: false,
    back: {
      url: Routes.HOME,
      alias: 'home'
    },
    footer: footerTypes.DEFAULT,
    header: {
      title: null,
      items: headers.default
    }
  },
  {
    title: 'Create Invoice',
    url: Routes.CREATE_INVOICE,
    Component: lazy(
      () => import('../pages/create-invoice/create-invoice.component')
    ),
    version: 2,
    mobileLayout: false,
    back: {
      url: Routes.FINANCIALS_RECEIVABLES,
      alias: 'invoices'
    },
    header: {
      title: null,
      items: []
    }
  },
  {
    title: 'View invoice',
    url: Routes.INVOICES + '/:id',
    Component: lazy(() => import('../pages/invoice/invoice.component')),
    header: {
      title: null,
      items: []
    },
    version: 2,
    mobileLayout: false
  },
  {
    title: 'Invoices',
    url: Routes.INVOICES,
    Component: lazy(() =>
      import('../pages/invoices/invoices.component').then((m) => ({
        default: m.ClientInvoices
      }))
    ),
    version: 2,
    mobileLayout: false,
    header: {
      title: 'Invoices',
      items: []
    }
  },
  {
    title: 'Clients',
    url: Routes.CLIENTS,
    Component: lazy(() => import('../pages/clients/clients.component')),
    version: 2,
    mobileLayout: false,
    header: {
      title: null,
      items: headers.default
    }
  },
  {
    title: 'Clients',
    url: Routes.CLIENTS + '/:id',
    Component: lazy(() => import('../pages/client/client.component')),
    header: {
      title: 'Client'
    },
    mobileLayout: false,
    footer: footerTypes.TRAINER
  },
  {
    title: 'Clients',
    url: Routes.CLIENTS,
    Component: lazy(() => import('../pages/clients/clients.component')),
    version: 2,
    mobileLayout: false,
    header: {
      title: null,
      items: headers.default
    }
  },
  {
    title: 'Clients',
    url: Routes.CLIENTS + '/:id' + Routes.HUB,
    Component: lazy(() => import('../pages/client-hub/client-hub.component')),
    header: {
      title: ''
    },
    footer: footerTypes.TRAINER
  },
  {
    title: 'Add Client',
    url: Routes.ADD_NEW_CLIENT,
    Component: lazy(
      () => import('../pages/add-new-client-mobile/add-client-mobile.component')
    ),
    back: {
      url: Routes.CLIENTS,
      alias: 'clients'
    },
    footer: footerTypes.NONE,
    version: 2,
    mobileLayout: false,
    header: {
      title: null,
      items: headers.default
    }
  },
  {
    title: 'Clients',
    url: Routes.CLIENTS + '/:id' + Routes.PROFILE,
    Component: lazy(
      () => import('../pages/client-profile/client-profile.component')
    ),
    back: {
      url: Routes.CLIENTS,
      alias: 'clients'
    },
    footer: footerTypes.TRAINER,
    version: 2,
    mobileLayout: false,
    header: {
      title: null,
      items: headers.default
    }
  },
  {
    title: 'Log Measurements',
    url: Routes.PROGRESS_LOG_MEASUREMENTS,
    Component: lazy(
      () =>
        import(
          '../pages/progress/components/measurements-log/measurements-log.component'
        )
    ),
    version: 2,
    mobileLayout: false,
    header: {
      title: null
    }
  },
  {
    title: 'Log Measurements',
    url: Routes.PROGRESS_CLIENT_LOG_MEASUREMENTS,
    Component: lazy(
      () =>
        import(
          '../pages/progress/components/measurements-log/measurements-log.component'
        )
    ),
    version: 2,
    mobileLayout: false,
    header: {
      title: null
    }
  },
  {
    title: 'Log Goals',
    url: Routes.PROGRESS_LOG_CLIENT_GOALS,
    Component: lazy(
      () =>
        import('../pages/progress/components/goals-log/goals-log.components')
    ),
    version: 2,
    mobileLayout: false,
    header: {
      title: null
    }
  },
  {
    title: 'Log Goals',
    url: Routes.PROGRESS_LOG_GOALS,
    Component: lazy(
      () =>
        import('../pages/progress/components/goals-log/goals-log.components')
    ),
    version: 2,
    mobileLayout: false,
    header: {
      title: null
    }
  },
  {
    title: 'Progress',
    url: Routes.PROGRESS_CLIENT_LOG_HEALTH_DATA,
    Component: lazy(
      () =>
        import(
          '../pages/progress-log/log-health-data/log-health-data.component'
        )
    ),
    version: 2,
    mobileLayout: false,
    header: {
      title: null
    }
  },
  {
    title: 'Progress',
    url: Routes.PROGRESS_LOG_HEALTH_DATA,
    Component: lazy(
      () =>
        import(
          '../pages/progress-log/log-health-data/log-health-data.component'
        )
    ),
    version: 2,
    mobileLayout: false,
    header: {
      title: null
    }
  },
  {
    title: 'Progress Clients',
    url: Routes.PROGRESS_CLIENTS,
    version: 2,
    Component: lazy(
      () => import('../pages/progress-clients/progress-clients.component')
    ),
    mobileLayout: false,
    header: {
      title: null
    }
  },
  {
    title: 'Progress',
    url: Routes.PROGRESS_CLIENT,
    version: 2,
    mobileLayout: false,
    Component: lazy(() => import('../pages/progress/progress.component')),
    header: {
      title: null
    }
  },
  {
    title: 'Progress',
    url: Routes.PROGRESS,
    version: 2,
    mobileLayout: false,
    Component: lazy(() => import('../pages/progress/progress.component')),
    header: {
      title: null
    }
  },
  {
    title: 'Request Session',
    url: Routes.SESSIONS + '/request',
    Component: lazy(
      () => import('../pages/sessions-request/session-request.component')
    ),
    mobileLayout: false,
    header: {
      title: null,
      items: []
    }
  },
  {
    title: 'Reschedule Session',
    url: Routes.SESSIONS + '/reschedule',
    Component: lazy(
      () => import('../pages/session-reschedule/session-reschedule.component')
    ),
    mobileLayout: false,
    header: {
      title: null,
      items: []
    }
  },
  {
    title: 'Schedule Session',
    url: Routes.SESSIONS + '/schedule/new',
    Component: lazy(
      () => import('../pages/session-schedule/session-schedule.component')
    ),
    mobileLayout: false,
    header: {
      title: null,
      items: []
    }
  },
  {
    title: 'Edit Session',
    url: Routes.SESSIONS + '/schedule/edit',
    Component: lazy(
      () => import('../pages/session-schedule/session-schedule.component')
    ),
    mobileLayout: false,
    header: {
      title: null,
      items: []
    }
  },
  {
    title: 'Confirm Session',
    url: Routes.SESSIONS + '/schedule/confirm',
    Component: lazy(
      () => import('../pages/session-schedule/session-schedule.component')
    ),
    mobileLayout: false,
    header: {
      title: null,
      items: []
    }
  },
  {
    title: 'Sessions',
    url: Routes.SESSIONS + '/:id',
    Component: lazy(() => import('../pages/session/session.component')),
    header: {
      title: 'Sessions',
      items: headers.default
    }
  },
  {
    title: 'Sessions',
    url: Routes.SESSIONS,
    Component: lazy(() => import('../pages/sessions/sessions.component')),
    version: 2,
    mobileLayout: false,
    header: {
      title: null,
      items: headers.default
    }
  },
  {
    title: 'Current Plan',
    url: Routes.ACTIVITIES_CURR_PLAN,
    Component: lazy(
      () => import('../pages/activities/current-plan/current-plan.component')
    ),
    version: 2,
    mobileLayout: false,
    header: {
      title: null,
      items: []
    }
  },
  {
    title: 'Training Splits',
    url: Routes.ACTIVITIES_TS,
    Component: lazy(
      () => import('../pages/activities/training-split/splits/splits.component')
    ),
    version: 2,
    mobileLayout: false,
    header: {
      title: null,
      items: []
    }
  },
  {
    title: 'Training Split',
    url: Routes.ACTIVITIES_TS_NEW,
    Component: lazy(
      () =>
        import(
          '../pages/activities/training-split/edit-split/create-split.component'
        )
    ),
    version: 2,
    mobileLayout: false,
    header: {
      title: null,
      items: []
    }
  },
  {
    title: 'Training Split',
    url: Routes.ACTIVITIES_TS_ID,
    Component: lazy(
      () => import('../pages/activities/training-split/split/split.component')
    ),
    version: 2,
    mobileLayout: false,
    header: {
      title: null,
      items: []
    }
  },
  {
    title: 'Training Split',
    url: Routes.ACTIVITIES_TS_EDIT,
    Component: lazy(
      () =>
        import(
          '../pages/activities/training-split/edit-split/edit-split.component'
        )
    ),
    version: 2,
    mobileLayout: false,
    header: {
      title: null,
      items: []
    }
  },
  {
    title: 'Training Split',
    url: Routes.ACTIVITIES_TS_EDIT_TP,
    Component: lazy(
      () =>
        import(
          '../pages/activities/training-split/edit-split/plan-edit/training-plan-edit.component'
        )
    ),
    version: 2,
    mobileLayout: false,
    header: {
      title: null,
      items: []
    }
  },
  {
    title: 'Training Split',
    url: Routes.ACTIVITIES_TS_EDIT_MP,
    Component: lazy(
      () =>
        import(
          '../pages/activities/training-split/edit-split/plan-edit/meal-plan-edit.component'
        )
    ),
    version: 2,
    mobileLayout: false,
    header: {
      title: null,
      items: []
    }
  },
  {
    title: 'Training Plans',
    url: Routes.ACTIVITIES_TP,
    Component: lazy(
      () => import('../pages/activities/training-plan/plans/plans.component')
    ),
    version: 2,
    mobileLayout: false,
    header: {
      title: null,
      items: []
    }
  },
  {
    title: 'Training Plan',
    url: Routes.ACTIVITIES_TP_ID,
    Component: lazy(
      () => import('../pages/activities/training-plan/plan/plan.component')
    ),
    version: 2,
    mobileLayout: false,
    header: {
      title: null,
      items: []
    }
  },
  {
    title: 'Diet Plans',
    url: Routes.ACTIVITIES_DP,
    Component: lazy(
      () => import('../pages/activities/diet-plan/plans/plans.component')
    ),
    version: 2,
    mobileLayout: false,
    header: {
      title: null,
      items: []
    }
  },
  {
    title: 'Diet Plan',
    url: Routes.ACTIVITIES_DP_ID,
    Component: lazy(
      () => import('../pages/activities/diet-plan/plan/plan.component')
    ),
    version: 2,
    mobileLayout: false,
    header: {
      title: null,
      items: []
    }
  },
  {
    title: 'Templates',
    url: Routes.ACTIVITIES_TM,
    Component: lazy(
      () => import('../pages/activities/templates/templates.component')
    ),
    version: 2,
    mobileLayout: false,
    header: {
      title: null,
      items: []
    }
  },
  {
    title: 'Training Split Template',
    url: Routes.ACTIVITIES_TM_TS_ID,
    Component: lazy(
      () =>
        import(
          '../pages/activities/templates/training-split/split/split.component'
        )
    ),
    version: 2,
    mobileLayout: false,
    header: {
      title: null,
      items: []
    }
  },
  {
    title: 'Training Plan Template',
    url: Routes.ACTIVITIES_TM_TP_REVISION_ID,
    Component: lazy(
      () =>
        import(
          '../pages/activities/templates/training-plan/plan/plan.component'
        )
    ),
    version: 2,
    mobileLayout: false,
    header: {
      title: null,
      items: []
    }
  },
  {
    title: 'Diet Plan Template',
    url: Routes.ACTIVITIES_TM_DP_ID,
    Component: lazy(
      () =>
        import('../pages/activities/templates/diet-plan/plan/plan.component')
    ),
    version: 2,
    mobileLayout: false,
    header: {
      title: null,
      items: []
    }
  },
  {
    title: 'Workout Template',
    url: Routes.ACTIVITIES_TM_WO_ID,
    Component: lazy(
      () => import('../pages/activities/templates/workout/workout.component')
    ),
    version: 2,
    mobileLayout: false,
    header: {
      title: null,
      items: []
    }
  },
  {
    title: 'Exercise Template',
    url: Routes.ACTIVITIES_TM_EX_ID,
    Component: lazy(
      () => import('../pages/activities/templates/exercise/exercise.component')
    ),
    version: 2,
    mobileLayout: false,
    header: {
      title: null,
      items: []
    }
  },
  {
    title: 'Meal Plan Template',
    url: Routes.ACTIVITIES_TM_MP_ID,
    Component: lazy(
      () =>
        import('../pages/activities/templates/meal-plan/meal-plan.component')
    ),
    version: 2,
    mobileLayout: false,
    header: {
      title: null,
      items: []
    }
  },
  {
    title: 'Meal Template',
    url: Routes.ACTIVITIES_TM_ML_ID,
    Component: lazy(
      () => import('../pages/activities/templates/meal/meal.component')
    ),
    version: 2,
    mobileLayout: false,
    header: {
      title: null,
      items: []
    }
  },
  {
    title: 'Food Template',
    url: Routes.ACTIVITIES_TM_FO_ID,
    Component: lazy(
      () => import('../pages/activities/templates/food/food.component')
    ),
    version: 2,
    mobileLayout: false,
    header: {
      title: null,
      items: []
    }
  },
  {
    title: 'Activities',
    url: Routes.ACTIVITIES,
    Component: lazy(
      () =>
        import(
          '../pages/activities/activities-list-clients/activities-list-client.component'
        )
    ),
    version: 2,
    mobileLayout: false,
    header: {
      title: null,
      items: []
    }
  },
  {
    title: 'Notifications',
    url: Routes.NOTIFICATIONS,
    Component: lazy(
      () => import('../pages/notifications/notifications.component')
    ),
    version: 2,
    mobileLayout: false,
    header: {
      title: null,
      items: []
    }
  },
  {
    title: 'Settings',
    url: Routes.SETTINGS,
    Component: lazy(() => import('../pages/settings/settings.component')),
    version: 2,
    mobileLayout: false,
    header: {
      title: 'Account Settings',
      items: []
    }
  },
  // {
  //   title: 'Notification Settings',
  //   url: Routes.NOTIFICATIONS_SETTINGS,
  //   Component: lazy(
  //     () =>
  //       import(
  //         '../pages/notifications-settings/notifications-settings.component'
  //       )
  //   ),
  //   back: {
  //     url: Routes.NOTIFICATIONS,
  //     alias: 'notifications'
  //   },
  //   version: 2,
  //   mobileLayout: false,
  //   header: {
  //     title: null,
  //     items: []
  //   }
  // },
  {
    title: 'Financials',
    url: Routes.FINANCIALS,
    Component: lazy(() => import('../pages/financials/financials.component')),
    version: 2,
    mobileLayout: false,
    header: {
      title: null,
      items: []
    }
  },
  {
    title: 'Chat',
    url: Routes.CHAT,
    Component: lazy(() => import('../pages/chat/chat.component')),
    version: 2,
    mobileLayout: false,
    header: {
      title: 'Chat',
      items: []
    }
  },
  {
    title: 'Chat',
    url: Routes.CHAT + '/:room',
    Component: lazy(() => import('../pages/chat/chat.component')),
    version: 2,
    header: {
      title: 'Chat',
      items: []
    },
    footer: footerTypes.NONE
  },

  {
    title: 'Edit Goals',
    url: Routes.EDIT_GOALS,
    Component: lazy(() => import('../pages/edit-goals/edit-goals.component')),
    version: 2,
    mobileLayout: false,
    header: {
      title: null,
      items: []
    },
    back: {
      url: Routes.FINANCIALS_GOALS,
      alias: 'goals'
    }
  }
]

export default routes
