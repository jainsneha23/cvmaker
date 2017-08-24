import AnalyticsModule from '../../analytics';

const analyticsModule = new AnalyticsModule();

export function fireBasicEvent(type, tag, storeId, storeName) {
  return () => {
    analyticsModule.compEvtHandler({
                        type,
                        tag,
                        storeId,
                        storeName,
                        eventType: 'UIEventBasicEvent'
                      });
  };
}

export function fireSearchEvent(type, tag, searchTerm) {
  return () => {
    analyticsModule.compEvtHandler({
                        type,
                        tag,
                        searchTerm,
                        eventType: 'UISearch'
                      });
  };
}

export function fireFilterEvent(type, tag) {
  return () => {
    analyticsModule.compEvtHandler({
                        type,
                        tag,
                        eventType: 'UIEventFilterOp'
                      });
  };
}

export function firePageEvent(pageName, storeId) {
  return () => {
    analyticsModule.firePageEvent(pageName, storeId);
  };
}
