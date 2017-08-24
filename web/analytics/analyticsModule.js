import {Handler} from 'analytics';
import PageImpression from './pageImpression';
import componentHandles from './componentHandles';
import EventPayloadHandler from './eventPayloadHandler';

let instance = null;

class AnalyticsModule {
  constructor(containerId = 'content') {
    if (!instance) {
      this.compEvtHandler = this.compEvtHandler.bind(this);
      this.handler = new Handler(this.compEvtHandler, componentHandles, containerId);
      this.pageHandler = new PageImpression(null);
      this.eventPayloadHandler = new EventPayloadHandler();
      instance = this;
    }
    return instance;
  }

  init(pagemap, buildInfo, country) {
    this.handler.inject(pagemap);
    this.firePageLoad(pagemap, buildInfo, country);
  }

  firePageLoad(pagemap, buildInfo, country) {
    this.handler.fireEvent('siteData', this.pageHandler.getSiteData(buildInfo, country));
    this.handler.fireEvent('customerData', this.pageHandler.getCustomerData());
    this.handler.fireEvent('UIRenderContent', this.pageHandler.getRenderContent(pagemap));
  }

  firePageEvent(pageName, storeId) {
    this.handler.fireEvent('pageData', this.pageHandler.getPageData(pageName, storeId));
  }

  compEvtHandler(analyticsData) {
    let analyticsPayload;
    const eventType = analyticsData.eventType || 'UIEventBasicEvent';
    if (eventType === 'UIContentClicked' || analyticsData.contentLocation) {
      analyticsPayload = this.eventPayloadHandler.createContentPayload(analyticsData);
    } else if (eventType === 'UISearch') {
      analyticsPayload = this.eventPayloadHandler.createSearchPayload(analyticsData);
    } else if (eventType === 'UIEventFilterOp') {
      analyticsPayload = this.eventPayloadHandler.createFilterPayload(analyticsData);
    } else if (analyticsData.storeId !== undefined) {
      analyticsPayload = this.eventPayloadHandler.createStoreDetailsPayload(analyticsData);
    } else {
      analyticsPayload = this.eventPayloadHandler.createBasicPayload(analyticsData.analyticsData || analyticsData);
    }
    this.handler.fireEvent(eventType, analyticsPayload);
  }

}

export default AnalyticsModule;
