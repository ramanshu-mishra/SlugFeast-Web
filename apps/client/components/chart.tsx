"use client"
import { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import {
    CandlestickData,
    CandlestickSeries,
    createChart,
    HistogramData,
    HistogramSeries,
    IChartApi,
    LogicalRange,
    MouseEventParams,
    Time,
    UTCTimestamp,
    WhitespaceData,
} from 'lightweight-charts';
import { candleStyleConfig, chartConfig } from '../share/config/chartConfig';
import { QuoteOption, useGetTransactions } from '../hooks/useGetTransactions';

type CandlePoint = CandlestickData<Time>;
type VolumePoint = HistogramData<Time>;
type CandleSeriesPoint = CandlePoint | WhitespaceData<Time>;
type VolumeSeriesPoint = VolumePoint | WhitespaceData<Time>;
type RangeOption = '1D' | '5D' | '1M';

interface HeaderState {
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    change: number;
}

function formatCompact(value: number) {
    return new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 1,
    }).format(value);
}

const rangeToWindowSeconds: Record<RangeOption, number> = {
    '1D': 24 * 60 * 60,
    '5D': 5 * 24 * 60 * 60,
    '1M': 30 * 24 * 60 * 60,
};

const rangeToHookTimeframe: Record<RangeOption, '1h' | '1d'> = {
    '1D': '1h',
    '5D': '1d',
    '1M': '1d',
};

const CHART_EDGE_PADDING_SECONDS = 5 * 24 * 60 * 60;
const CHART_NUMERIC_LIMIT = 90_071_992_547_409.91;

function toChartSafeNumber(value: number) {
    if (!Number.isFinite(value)) {
        return 0;
    }

    if (value > CHART_NUMERIC_LIMIT) {
        return CHART_NUMERIC_LIMIT;
    }

    if (value < -CHART_NUMERIC_LIMIT) {
        return -CHART_NUMERIC_LIMIT;
    }

    return value;
}

export function ChartComponent({ token }: { token: string }) {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const candlestickSeriesRef = useRef<any>(null);
    const volumeSeriesRef = useRef<any>(null);
    const loadMoreRef = useRef<() => Promise<void>>(async () => {});
    const hasMoreRef = useRef(false);
    const loadingOlderRef = useRef(false);
    const fitOnNextUpdateRef = useRef(true);
    const backfillAttemptsRef = useRef(0);

    const [selectedRange, setSelectedRange] = useState<RangeOption>('1D');
    const [selectedQuote, setSelectedQuote] = useState<QuoteOption>('eth');

    const hookTimeframe = rangeToHookTimeframe[selectedRange];
    const windowSeconds = rangeToWindowSeconds[selectedRange];

    const {
        candles: historicalCandles,
        transactionError,
        transactionIsLoading,
        transactionIsFetchingMore,
        loadMore,
        hasMore,
    } = useGetTransactions(token, hookTimeframe, windowSeconds, selectedQuote);

    const candles = useMemo<CandlePoint[]>(() => {
        return historicalCandles.map((candle) => ({
            time: candle.timestamp as UTCTimestamp,
            open: toChartSafeNumber(candle.open),
            high: toChartSafeNumber(candle.high),
            low: toChartSafeNumber(candle.low),
            close: toChartSafeNumber(candle.close),
        }));
    }, [historicalCandles]);

    const volumes = useMemo<VolumePoint[]>(() => {
        return historicalCandles.map((candle) => ({
            time: candle.timestamp as UTCTimestamp,
            value: toChartSafeNumber(candle.volume),
            color: candle.close >= candle.open ? 'rgba(20, 184, 166, 0.45)' : 'rgba(239, 68, 68, 0.45)',
        }));
    }, [historicalCandles]);

    const paddedVisibleRange = useMemo<{ from: Time; to: Time } | null>(() => {
        const firstCandle = historicalCandles[0];
        const lastCandle = historicalCandles[historicalCandles.length - 1];

        if (!firstCandle || !lastCandle) {
            return null;
        }

        return {
            from: (firstCandle.timestamp - CHART_EDGE_PADDING_SECONDS) as UTCTimestamp,
            to: (lastCandle.timestamp + CHART_EDGE_PADDING_SECONDS) as UTCTimestamp,
        };
    }, [historicalCandles]);

    const [headerState, setHeaderState] = useState<HeaderState>(() => {
        const lastCandle = historicalCandles[historicalCandles.length - 1] ?? {
            time: 0 as Time,
            open: 0,
            high: 0,
            low: 0,
            close: 0,
        };
        const lastVolume = historicalCandles[historicalCandles.length - 1]?.volume ?? 0;
        const change = lastCandle.open === 0 ? 0 : ((lastCandle.close - lastCandle.open) / lastCandle.open) * 100;

        return {
            open: lastCandle.open,
            high: lastCandle.high,
            low: lastCandle.low,
            close: lastCandle.close,
            volume: Number(lastVolume),
            change,
        };
    });

    useEffect(() => {
        const lastCandle = historicalCandles[historicalCandles.length - 1];
        if (!lastCandle) {
            setHeaderState({
                open: 0,
                high: 0,
                low: 0,
                close: 0,
                volume: 0,
                change: 0,
            });
            return;
        }

        const change = lastCandle.open === 0 ? 0 : ((lastCandle.close - lastCandle.open) / lastCandle.open) * 100;
        setHeaderState({
            open: toChartSafeNumber(lastCandle.open),
            high: toChartSafeNumber(lastCandle.high),
            low: toChartSafeNumber(lastCandle.low),
            close: toChartSafeNumber(lastCandle.close),
            volume: toChartSafeNumber(lastCandle.volume),
            change,
        });
    }, [historicalCandles]);

    useEffect(() => {
        loadMoreRef.current = loadMore;
    }, [loadMore]);

    useEffect(() => {
        hasMoreRef.current = hasMore;
    }, [hasMore]);

    useEffect(() => {
        fitOnNextUpdateRef.current = true;
        backfillAttemptsRef.current = 0;
    }, [selectedQuote, selectedRange]);

    useEffect(() => {
        if (transactionIsLoading || transactionIsFetchingMore) {
            return;
        }

        if (historicalCandles.length > 0) {
            return;
        }

        if (!hasMore || backfillAttemptsRef.current >= 10) {
            return;
        }

        backfillAttemptsRef.current += 1;
        void loadMore();
    }, [
        historicalCandles.length,
        hasMore,
        loadMore,
        transactionIsFetchingMore,
        transactionIsLoading,
    ]);

    useEffect(() => {
        if (!chartContainerRef.current) return;
        if (chartRef.current) return;

        const chart = createChart(chartContainerRef.current, 
            chartConfig({chartContainerRef : chartContainerRef as RefObject<HTMLDivElement>})    
        );

        const candlestickSeries = chart.addSeries(CandlestickSeries, candleStyleConfig());
        candlestickSeriesRef.current = candlestickSeries;

        const volumeSeries = chart.addSeries(HistogramSeries, {
            priceScaleId: '',
            priceFormat: {
                type: 'volume',
            },
        });
        volumeSeriesRef.current = volumeSeries;

        chart.priceScale('').applyOptions({
            scaleMargins: {
                top: 0.78,
                bottom: 0,
            },
            borderVisible: false,
        });

        const onCrosshairMove = (param: MouseEventParams<Time>) => {
            const candleAtPoint = param.seriesData.get(candlestickSeries) as CandlePoint | undefined;
            const volumeAtPoint = param.seriesData.get(volumeSeries) as VolumePoint | undefined;

            if (!candleAtPoint) return;

            const change = ((candleAtPoint.close - candleAtPoint.open) / candleAtPoint.open) * 100;

            setHeaderState({
                open: toChartSafeNumber(candleAtPoint.open),
                high: toChartSafeNumber(candleAtPoint.high),
                low: toChartSafeNumber(candleAtPoint.low),
                close: toChartSafeNumber(candleAtPoint.close),
                volume: toChartSafeNumber(volumeAtPoint?.value ?? 0),
                change,
            });
        };

        const onVisibleRangeChange = async (range: LogicalRange | null) => {
            if (!range) {
                return;
            }

            if (range.from > 10) {
                return;
            }

            if (!hasMoreRef.current || loadingOlderRef.current) {
                return;
            }

            loadingOlderRef.current = true;
            try {
                await loadMoreRef.current();
            } finally {
                loadingOlderRef.current = false;
            }
        };

        chart.subscribeCrosshairMove(onCrosshairMove);
        chart.timeScale().subscribeVisibleLogicalRangeChange(onVisibleRangeChange);
        
        chartRef.current = chart;

        const handleResize = () => {
            chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.unsubscribeCrosshairMove(onCrosshairMove);
            chart.timeScale().unsubscribeVisibleLogicalRangeChange(onVisibleRangeChange);
            chart.remove();
            chartRef.current = null;
            candlestickSeriesRef.current = null;
            volumeSeriesRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (!candlestickSeriesRef.current || !volumeSeriesRef.current || !chartRef.current) {
            return;
        }

        candlestickSeriesRef.current.setData(candles);
        volumeSeriesRef.current.setData(volumes);

        if (fitOnNextUpdateRef.current && paddedVisibleRange) {
            chartRef.current.timeScale().setVisibleRange(paddedVisibleRange);
            fitOnNextUpdateRef.current = false;
        }
    }, [candles, paddedVisibleRange, volumes]);

    const changeText = `${headerState.change >= 0 ? '+' : ''}${headerState.change.toFixed(2)}%`;
    const changeColor = headerState.change >= 0 ? 'text-emerald-400' : 'text-red-400';

    return (
        <div className='px-6'>
        <div className='w-full rounded-xl border border-neutral-800 bg-neutral-950 p-3 '>
            <div className='mb-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs md:text-sm'>
                <div className='flex items-center gap-2'>
                    {(['1D', '5D', '1M'] as const).map((range) => {
                        const isActive = selectedRange === range;
                        return (
                            <button
                                key={range}
                                type='button'
                                onClick={() => setSelectedRange(range)}
                                className={`rounded px-2 py-1 ${isActive ? 'border border-neutral-700 bg-neutral-900 text-neutral-100' : 'text-neutral-500 hover:text-neutral-300'}`}
                            >
                                {range}
                            </button>
                        );
                    })}
                </div>
                <div className='flex items-center gap-2'>
                    {(['eth', 'usdt'] as const).map((quote) => {
                        const isActive = selectedQuote === quote;

                        return (
                            <button
                                key={quote}
                                type='button'
                                onClick={() => setSelectedQuote(quote)}
                                className={`px-1 py-0.5 uppercase ${isActive ? 'text-emerald-400' : 'text-neutral-500 hover:text-neutral-300'}`}
                            >
                                {quote}
                            </button>
                        );
                    })}
                </div>
                <span className='text-neutral-100'>SLUG/ETH Price</span>
                <span className='text-neutral-400'>O <span className='text-neutral-200'>{formatCompact(headerState.open)}</span></span>
                <span className='text-neutral-400'>H <span className='text-neutral-200'>{formatCompact(headerState.high)}</span></span>
                <span className='text-neutral-400'>L <span className='text-neutral-200'>{formatCompact(headerState.low)}</span></span>
                <span className='text-neutral-400'>C <span className='text-neutral-200'>{formatCompact(headerState.close)}</span></span>
                <span className='text-neutral-400'>V <span className='text-neutral-200'>{formatCompact(headerState.volume)}</span></span>
                <span className={changeColor}>{changeText}</span>
                {(transactionIsLoading || transactionIsFetchingMore) && <span className='text-neutral-500'>Loading...</span>}
                {transactionError && <span className='text-red-400'>Failed to load data</span>}
            </div>

        {/* actual chart rendering div  */}
            <div
                ref={chartContainerRef}
                className='chart'
                style={{ position: 'relative', width: '100%' }}
            />
        </div>
        </div>
    );
}