import {useEffect, useMemo, useState} from "react";
import {getTradingViewTimeZone, loadChartAndSetVisibleRange} from "@/utils/chart";
import {ChartingLibraryWidgetOptions, ResolutionString, widget} from "../../../public/charting_library";
import {formatNumberExact} from "@/utils/formatNumber.ts";
import {useDatafeed} from "@/components/PriceChart/hooks/useDatafeed.tsx";
import classNames from "classnames";

export function PriceChart(props: { projectId: string; tokenAddress: string; tokenSymbol: string }) {
  const [loading, setLoading] = useState(true);

  const datafeed = useDatafeed(props.projectId);

  const widgetOptions = useMemo((): ChartingLibraryWidgetOptions | null => {
    return {
      symbol: `${props.tokenSymbol}/SOL`,
      datafeed: datafeed,
      interval: "5" as ResolutionString,
      container: "price_chart",
      library_path: "/charting_library/",
      locale: "en",
      disabled_features: ["header_symbol_search", "header_fullscreen_button", "header_compare", "header_saveload", "timeframes_toolbar"],
      enabled_features: [],
      custom_formatters: {
        priceFormatterFactory: () => {
          return {
            format: (price: number) => {
              if (Math.abs(price) >= 10000) {
                return formatNumberExact(price, 1);
              }
              if (Math.abs(price) >= 1000) {
                return formatNumberExact(price, 2);
              }
              if (Math.abs(price) >= 100) {
                return formatNumberExact(price, 3);
              }
              if (Math.abs(price) >= 10) {
                return formatNumberExact(price, 4);
              }
              if (Math.abs(price) >= 1) {
                return formatNumberExact(price, 5);
              }
              if (Math.abs(price) > 0.0000001) {
                return formatNumberExact(price, 5);
              }
              return "0.00000";
            },
          };
        },
      },
      fullscreen: false,
      autosize: true,
      loading_screen: { backgroundColor: "#0C1015", foregroundColor: "#31CB9E" },
      time_frames: [
        { text: "1m", resolution: "1" as ResolutionString, description: "1 minute" },
        { text: "5m", resolution: "5" as ResolutionString, description: "5 minutes" },
        { text: "15m", resolution: "15" as ResolutionString, description: "15 minutes" },
        { text: "1h", resolution: "1H" as ResolutionString, description: "1 hour" },
        { text: "4h", resolution: "4H" as ResolutionString, description: "4 hours" },
        { text: "1d", resolution: "1D" as ResolutionString, description: "1 day" },
      ],
      timezone: getTradingViewTimeZone(),
      studies_overrides: {
        "volume.volume.display": 9,
      },
      theme: "dark",
      custom_css_url: "/charting_library/style.css",
      custom_font_family: "'OverusedGrotesk', sans-serif",
    };
  }, [datafeed, props.tokenSymbol]);

  useEffect(() => {
    setLoading(true);
    if (!widgetOptions) return;
    const tvWidget = new widget(widgetOptions);

    loadChartAndSetVisibleRange(tvWidget, () => {
      setLoading(false);
    });

    return () => {
      if (tvWidget !== null) {
        tvWidget.remove();
      }
    };
  }, [widgetOptions]);

  return (
    <>
      {loading && (
        <div className="absolute h-[520px] w-full flex flex-col gap-2 items-center justify-center">
          Loading chart...
        </div>
      )}
      <div id="price_chart" className={classNames("min-h-[320px] lg:min-h-[480px] w-full h-full", loading ? "opacity-0" : "opacity-100")}></div>
    </>
  );
}
