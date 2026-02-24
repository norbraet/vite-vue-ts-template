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
    architecture: {
      title: string
      descriptionRich: string
      importDirectionLabel: string
      importDirectionRule: string
    }
    providers: {
      title: string
      description: string
      bootstrapNote: string
    }
    feature: {
      title: string
      intro: string
      hint: string
    }
    page: {
      title: string
      stepCreate: string
      stepRegisterPrefix: string
      hint: string
    }
    i18n: {
      title: string
      locationPrefix: string
      locationMiddle: string
      locationSuffix: string
      creationPrefix: string
      pluralLabel: string
      pluralDemo: string
    }
    state: {
      title: string
      registrationPrefix: string
      storesLabel: string
      featureStateLabel: string
      featureStateValue: string
      globalStateLabel: string
      globalStateValue: string
    }
    shared: {
      title: string
      intro: string
      ui: string
      lib: string
      composables: string
      i18n: string
      types: string
      hint: string
    }
    scripts: {
      title: string
      dev: string
      build: string
      preview: string
      lint: string
      format: string
      typecheck: string
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
