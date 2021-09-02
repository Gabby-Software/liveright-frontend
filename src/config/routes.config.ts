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
  {
    title: 'Sign up onboarding',
    url: Routes.REGISTER_ON_BOARD,
    Component: lazy(
      () => import('../pages/auth/sign-up-onboard/sign-up-onboard.component')
    ),
    header: {}
  }
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
    header: {}
  },
  {
    title: 'Calendar',
    url: Routes.CALENDAR,
    Component: lazy(() => import('../pages/calendar/calendar.component')),
    header: {
      items: headers.default
    },
    footer: footerTypes.NONE
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
    header: {
      title: 'My Trainer',
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
      title: 'Invoice',
      items: headers.default
    },
    version: 2,
    back: {
      url: Routes.INVOICES,
      alias: 'invoices'
    }
  },
  {
    title: 'Invoices',
    url: Routes.INVOICES,
    Component: lazy(() =>
      import('../pages/invoices/invoices.component').then((m) => ({
        default: m.ClientInvoices
      }))
    ),
    header: {
      title: 'Invoices',
      items: headers.default
    }
  },
  {
    title: 'Clients',
    url: Routes.CLIENTS,
    Component: lazy(() => import('../pages/clients/clients.component')),
    header: {
      title: 'Clients'
    }
  },
  {
    title: 'Clients',
    url: Routes.CLIENTS + '/:id',
    Component: lazy(() => import('../pages/client/client.component')),
    header: {
      title: 'Client'
    },
    footer: footerTypes.TRAINER
  },
  {
    title: 'Clients',
    url: Routes.CLIENTS + '/:id',
    Component: lazy(() => import('../pages/client/client.component')),
    header: {
      title: ''
    },
    footer: footerTypes.TRAINER
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
    title: 'Clients',
    url: Routes.CLIENTS + '/:id' + Routes.PROFILE,
    Component: lazy(
      () => import('../pages/client-profile/client-profile.component')
    ),
    header: {
      title: ''
    },
    back: {
      url: Routes.CLIENTS,
      alias: 'clients'
    },
    version: 2,
    footer: footerTypes.TRAINER
  },
  {
    title: 'Progress',
    url: Routes.PROGRESS,
    version: 2,
    Component: lazy(() => import('../pages/progress/progress.component')),
    header: {
      title: 'Your Progress and Metrics'
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
    back: {
      url: Routes.PROGRESS_HEALTH_DATA,
      alias: 'health-data'
    },
    version: 2,
    header: {
      title: 'Log Health Data'
    }
  },
  {
    title: 'Progress',
    url: Routes.PROGRESS_LOG_HEALTH_DATA + '/:date',
    Component: lazy(
      () =>
        import(
          '../pages/progress-log/log-health-data/log-health-data.component'
        )
    ),
    version: 2,
    back: {
      url: Routes.PROGRESS_LOG_HEALTH_DATA,
      alias: 'health-data'
    },
    header: {
      title: 'Log Health Data'
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
    title: 'Plans',
    url: Routes.PLANS,
    Component: lazy(() => import('../pages/plans/plans.component')),
    header: {
      title: 'Plans',
      items: headers.default
    }
  },
  {
    title: 'Notifications',
    url: Routes.NOTIFICATIONS,
    Component: lazy(
      () => import('../pages/notifications/notifications.component')
    ),
    header: {
      title: 'Notifications',
      items: headers.default
    }
  },
  {
    title: 'Notification Settings',
    url: Routes.NOTIFICATIONS_SETTINGS,
    Component: lazy(
      () =>
        import(
          '../pages/notifications-settings/notifications-settings.component'
        )
    ),
    header: {
      title: 'Settings',
      items: headers.default
    }
  },
  {
    title: 'Financials',
    url: Routes.FINANCIALS,
    Component: lazy(() => import('../pages/financials/financials.component')),
    version: 2,
    header: {
      title: null,
      items: headers.default
    }
  },
  {
    title: 'Chat',
    url: Routes.CHAT,
    Component: lazy(() => import('../pages/chat/chat.component')),
    version: 2,
    header: {
      title: 'Chat',
      items: headers.default
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
  }
]

export default routes
