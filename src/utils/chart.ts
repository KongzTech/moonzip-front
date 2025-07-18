import { IChartingLibraryWidget, Timezone } from "../../public/charting_library";

export function getTradingViewTimeZone() {
  const offsetInHours = (new Date().getTimezoneOffset() / 60) * -1;
  const tradingViewTimeZone = Object.keys(tradingViewTimeZones).find((timeZone) => tradingViewTimeZones[timeZone] === offsetInHours);
  if (!tradingViewTimeZone) {
    return "Etc/UTC" as Timezone;
  }
  return tradingViewTimeZone as Timezone;
}

export function loadChartAndSetVisibleRange(tvWidget: IChartingLibraryWidget, callback: () => void) {
  tvWidget.onChartReady(async () => {
    const x = tvWidget.activeChart().getVisibleRange();
    await tvWidget.activeChart().setVisibleRange(
      {
        from: x.from,
        to: x.to,
      },
      {
        applyDefaultRightMargin: false,
      },
    );
    tvWidget.applyOverrides({
      "paneProperties.background": "#0C1015",
      "paneProperties.backgroundType": "solid",
    });
    tvWidget
      .activeChart()
      .onIntervalChanged()
      .subscribe(null, () => {
        const priceScale = tvWidget.activeChart().getPanes()[0].getMainSourcePriceScale();
        priceScale?.setAutoScale(true);
      });
    callback();
  });
}

const tradingViewTimeZones: { [key: string]: number } = {
  "Pacific/Honolulu": -10,
  "America/Juneau": -8,
  "America/Los_Angeles": -7,
  "America/Phoenix": -7,
  "America/Vancouver": -7,
  "US/Mountain": -7,
  "America/El_Salvador": -6,
  "America/Bogota": -5,
  "America/Chicago": -5,
  "America/Lima": -5,
  "America/Mexico_City": -5,
  "America/Caracas": -4,
  "America/New_York": -4,
  "America/Toronto": -4,
  "America/Argentina/Buenos_Aires": -3,
  "America/Santiago": -3,
  "America/Sao_Paulo": -3,
  "Etc/UTC": 0,
  "Atlantic/Reykjavik": 0,
  "Africa/Lagos": 1,
  "Europe/London": 1,
  "Africa/Cairo": 2,
  "Africa/Johannesburg": 2,
  "Europe/Belgrade": 2,
  "Europe/Berlin": 2,
  "Europe/Copenhagen": 2,
  "Europe/Luxembourg": 2,
  "Europe/Madrid": 2,
  "Europe/Oslo": 2,
  "Europe/Paris": 2,
  "Europe/Rome": 2,
  "Europe/Stockholm": 2,
  "Europe/Warsaw": 2,
  "Europe/Zurich": 2,
  "Asia/Bahrain": 3,
  "Asia/Jerusalem": 3,
  "Asia/Kuwait": 3,
  "Asia/Qatar": 3,
  "Asia/Riyadh": 3,
  "Europe/Athens": 3,
  "Europe/Helsinki": 3,
  "Europe/Istanbul": 3,
  "Europe/Moscow": 3,
  "Europe/Riga": 3,
  "Europe/Tallinn": 3,
  "Europe/Vilnius": 3,
  "Asia/Kolkata": 3.5,
  "Asia/Dubai": 4,
  "Asia/Muscat": 4,
  "Asia/Tehran": 4.5,
  "Asia/Ashkhabad": 5,
  "Asia/Kathmandu": 5.75,
  "Asia/Almaty": 6,
  "Asia/Bangkok": 7,
  "Asia/Ho_Chi_Minh": 7,
  "Asia/Jakarta": 7,
  "Asia/Chongqing": 8,
  "Asia/Hong_Kong": 8,
  "Asia/Shanghai": 8,
  "Asia/Singapore": 8,
  "Asia/Taipei": 8,
  "Australia/Perth": 8,
  "Asia/Seoul": 9,
  "Asia/Tokyo": 9,
  "Australia/Adelaide": 9.5,
  "Australia/ACT": 10,
  "Australia/Brisbane": 10,
  "Australia/Sydney": 10,
  "Pacific/Norfolk": 11,
  "Pacific/Auckland": 12,
  "Pacific/Chatham": 12.75,
  "Pacific/Fakaofo": 13,
};
