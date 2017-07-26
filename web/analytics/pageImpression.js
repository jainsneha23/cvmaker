import {replaceSpace} from './utils';

/* global document window */
class PageImpression {
  constructor(eventHandler) {
    this.eventHandler = eventHandler;
  }

  getSiteData(buildInfo, country) {
    let built = buildInfo.time;
    const buildDate = Date.parse(buildInfo.time);
    if (isNaN(buildDate) === false) {
      built = new Date(buildDate).toISOString();
    }
    return {
      '@type': 'tesco:siteData',
      application: buildInfo.env,
      built,
      buildVersion: buildInfo.version,
      country: country.toUpperCase()
    };
  }

  getCustomerData() {
    const breakpoint = this.getBreakpoint();
    const viewportWidth = document.documentElement.clientWidth;
    return {
      '@type': 'tesco:customerData',
      UUID: '',
      trkid: '',
      flags: {
        amendMode: false,
        amendStart: false,
        authenticated: false,
        bookedSlot: {
          charge: {
            price: '',
            priceCurrency: ''
          },
          start: '',
          end: '',
          method: ''
        },
        firstTimeShopper: true,
        orderCount: 0,
        orderID: '',
        device: {
          breakpoint,
          width: viewportWidth
        }
      }
    };
  }

  getPageData(pageName, storeId) {
    return {
      '@type': 'tesco:pageData',
      pageLanguage: 'en-GB',
      pageTitle: document.title,
      pageURL: window.location.href,
      storeId,
      pageName: pageName || 'store-locator',
      pageHierarchy: ''
    };
  }

  getRenderContent(pagemap) {
    const renderPanels = [];
    pagemap.forEach((comp) => {
      if (comp.type === 'HeroBanner') {
        renderPanels.push({
          panelPos: 1,
          components: [
            {
              campaign: replaceSpace(comp.props.headlineText),
              '@type': 'tesco:UIContentData',
              posInPanel: 1,
              placement: 1,
              id: 'HeroBanner',
              segments: "",
              moduleType: "m-of"
            },
            {
              campaign: `${replaceSpace(comp.props.headlineText)}-${replaceSpace(comp.children[0].props.buttonText)}`,
              '@type': 'tesco:UIContentData',
              posInPanel: 1,
              placement: 1,
              id: 'HeroBanner-button',
              segments: "",
              moduleType: "m-of"
            }
          ]
        });
      }
    });
    return {
      '@type': 'tesco:UIRenderContent',
      page: 'pa-storelocator',
      panels: renderPanels
    };
  }

  getBreakpoint() {
    const viewportWidth = document.documentElement.clientWidth;
    const isBetween = (a, b) => viewportWidth >= a && viewportWidth < b;
    if (isBetween(320, 504)) return 'small';
    if (isBetween(504, 756)) return 'small-medium';
    if (isBetween(756, 1008)) return 'medium';
    if (isBetween(1008, 1260)) return 'large';
    if (viewportWidth >= 1260) return 'extra-large';
    return '';
  }
}

export default PageImpression;
