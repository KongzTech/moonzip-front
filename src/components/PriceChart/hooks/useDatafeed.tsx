import {useCallback, useMemo, useRef} from "react";
import {getTradingViewTimeZone} from "@/utils/chart";

import {
  DatafeedErrorCallback,
  HistoryCallback,
  LibrarySymbolInfo,
  PeriodParams,
  ResolutionString,
  ResolveCallback,
  SubscribeBarsCallback
} from "../../../../public/charting_library";
import {getCandles} from "@/data/getCandles.ts";

export interface TradingViewCandleData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}


const configurationData = {
  supported_resolutions: ["1", "5", "15", "1H", "4H", "1D"],
};

const timePeriodMap: Record<string, number> = {
  "1": 60,
  "5": 300,
  "15": 900,
  "1H": 3600,
  "4H": 14400,
  "1D": 86400,
};

export const useDatafeed = (projectId: string) => {
  const intervalRef = useRef();

  const getData = useCallback(
    async (options: { period: number; time: number; n: number }) => {
      return await getCandles(projectId, options);
    },
    [projectId],
  );

  return useMemo(() => {
    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
      onReady: (callback: Function) => {
        setTimeout(() => callback(configurationData));
      },
      searchSymbols: () => {},
      resolveSymbol: async (symbolName: string, onSymbolResolvedCallback: ResolveCallback, onResolveErrorCallback: DatafeedErrorCallback) => {
        setTimeout(() =>
          onSymbolResolvedCallback({
            ticker: symbolName,
            name: symbolName,
            description: symbolName,
            type: "Crypto",
            session: "24x7",
            timezone: getTradingViewTimeZone(),
            exchange: "",
            listed_exchange: "",
            format: "price",
            minmov: 1,
            pricescale: 1000000,
            has_intraday: true,
            has_empty_bars: true,
            has_weekly_and_monthly: true,
            has_daily: true,
            supported_resolutions: configurationData.supported_resolutions as ResolutionString[],
            data_status: "streaming",
          }),
        );
      },
      getBars: async (symbolInfo: LibrarySymbolInfo, resolution: ResolutionString, periodParams: PeriodParams, onHistoryCallback: HistoryCallback, onErrorCallback: DatafeedErrorCallback) => {
        try {
          const { from, to, countBack } = periodParams;
          const n = Math.ceil(countBack / 1000);
          const secondsPerCandle = (to - from) / countBack;
          const promises = [];

          for (let i = 0; i < n; i++) {
            promises.push(
              getData({
                period: timePeriodMap[resolution],
                time: Math.floor(from - i * 1000 * secondsPerCandle),
                n: countBack > 1000 ? (i === n - 1 ? countBack % 1000 : 1000) : countBack,
              }),
            );
            console.log("time", Math.floor(from - i * 1000 * secondsPerCandle));
            console.log("n", countBack > 1000 ? (i === n - 1 ? countBack % 1000 : 1000) : countBack);
          }

          const data = await Promise.all(promises);

          console.log(data);

          if (!data || data.length === 0) {
            onHistoryCallback([], { noData: true });
            return;
          }

          const sortedData = data.flat().sort((a, b) => a.time - b.time);

          const bars: TradingViewCandleData[] = [];

          sortedData.forEach((bar) => {
            bars.push({
              time: bar.time * 1000,
              low: bar.low,
              high: bar.high,
              open: bar.open,
              close: bar.close,
            });
          });

          onHistoryCallback(bars, {
            noData: bars.length === 0,
          });
        } catch (error) {
          console.error("[getBars]: Get error", error);
        }
      },

      subscribeBars: async (symbolInfo: LibrarySymbolInfo, resolution: ResolutionString, onRealtimeCallback: SubscribeBarsCallback, subscribeUID: string, onResetCacheNeededCallback: Function) => {},
      unsubscribeBars: (subscriberUID: string) => {
        clearInterval(intervalRef.current);
      },
    };
  }, [getData]);
};
