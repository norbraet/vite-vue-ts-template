export interface MessageSchema {
  common: {
    appName: string
    footerStack: string
  }
  nav: {
    home: string
    guide: string
  }
  home: {
    title: string
    subtitle: string
    viewGuide: string
    stackTitle: string
    meta: {
      title: string
    }
  }
  guide: {
    title: string
    meta: {
      title: string
    }
  }
  notFound: {
    title: string
    description: string
    goHome: string
    goBack: string
    meta: {
      title: string
    }
  }
  theme: {
    currentLabel: string
    switchedTo: string
    options: {
      light: string
      dark: string
      system: string
    }
  }
  notifications: {
    close: string
  }
  languageSelector: {
    ariaLabel: string
    openMenu: string
    closeMenu: string
  }
}
