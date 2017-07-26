
class EventPayloadHandler {

  createContentPayload(analyticsData) {
    return {
      "@type": `tesco:UIContentClicked`,
      _eventType: 'UIContentClicked',
      page: "pa-storelocator",
      component: {
        campaign: analyticsData.campaign || '',
        type: "tesco:UIContentData",
        posInPanel: analyticsData.posInPanel,
        placement: analyticsData.placement,
        id: analyticsData.tag,
        segments: "",
        moduleType: "m-of"
      }
    };
  }

  createSearchPayload(analyticsData) {
    return {
      _eventType: 'UISearch',
      type: analyticsData.type,
      value: analyticsData.tag,
      searchTerm: analyticsData.searchTerm
    };
  }

  createBasicPayload(analyticsData) {
    return {
      _eventType: 'UIEventBasicEvent',
      type: analyticsData.type,
      value: analyticsData.tag
    };
  }

  createStoreDetailsPayload(analyticsData) {
    return {
      _eventType: 'UIEventBasicEvent',
      storeId: analyticsData.storeId,
      storeName: analyticsData.storeName,
      type: analyticsData.type,
      value: analyticsData.tag
    };
  }

  createFilterPayload(analyticsData) {
    return {
      _eventType: 'UIEventFilterOp',
      type: analyticsData.type,
      value: analyticsData.tag
    };
  }
}

export default EventPayloadHandler;
