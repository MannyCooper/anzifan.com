export const GA_TRACKING_ID = 'G-NY3LST6278';

export const pageview = (url : string, title : string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_location: url,
    page_title: title,
  });
};

export const event = ({ action, category, label, value } : {action: string, category: string, label: string, value: string}) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};