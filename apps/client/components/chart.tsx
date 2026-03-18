"use client"
import { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import {
    CandlestickData,
    CandlestickSeries,
    ColorType,
    createChart,
    CrosshairMode,
    HistogramData,
    HistogramSeries,
    IChartApi,
    MouseEventParams,
    Time,
    UTCTimestamp,
} from 'lightweight-charts';
import { candleStyleConfig, chartConfig } from '../share/config/chartConfig';

type CandlePoint = CandlestickData<Time>;
type VolumePoint = HistogramData<Time>;

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

function createPumpSimulationData() {
    const candles: CandlePoint[] = [];
    const volumes: VolumePoint[] = [];
    const start = Math.floor(new Date("2026-03-16T00:00:00Z").getTime() / 1000) as UTCTimestamp;
    const interval = 60 * 60;
    let previousClose = 2480;

    for (let i = 0; i < 72; i++) {
        const time = (start + i * interval) as UTCTimestamp;
        let open = previousClose;
        let high = open + 60;
        let low = open - 60;
        let close = open + (i % 2 === 0 ? 18 : -16);
        let volume = 0.95 + (i % 5) * 0.06;

        if (i === 32) {
            open = 2550;
            high = 128000;
            low = 2480;
            close = 104500;
            volume = 38;
        } else if (i === 33) {
            open = 104500;
            high = 232000;
            low = 96500;
            close = 198800;
            volume = 76;
        } else if (i === 34) {
            open = 198800;
            high = 348000;
            low = 1800;
            close = 2580;
            volume = 92;
        } else if (i > 34) {
            open = previousClose;
            high = open + 34;
            low = open - 34;
            close = open + (i % 3 === 0 ? 9 : -7);
            volume = 0.82 + (i % 4) * 0.03;
        }

        const candle = {
            time,
            open,
            high: Math.max(high, open, close),
            low: Math.min(low, open, close),
            close,
        } satisfies CandlePoint;

        candles.push(candle);
        volumes.push({
            time,
            value: volume,
            color: close >= open ? 'rgba(20, 184, 166, 0.45)' : 'rgba(239, 68, 68, 0.45)',
        });

        previousClose = close;
    }

    return { candles, volumes };
}

export function ChartComponent() {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const { candles, volumes } = useMemo(() => createPumpSimulationData(), []);

    const [headerState, setHeaderState] = useState<HeaderState>(() => {
        const lastCandle = candles[candles.length - 1] ?? {
            time: 0 as Time,
            open: 0,
            high: 0,
            low: 0,
            close: 0,
        };
        const lastVolume = volumes[volumes.length - 1] ?? {
            time: 0 as Time,
            value: 0,
        };
        const change = lastCandle.open === 0 ? 0 : ((lastCandle.close - lastCandle.open) / lastCandle.open) * 100;

        return {
            open: lastCandle.open,
            high: lastCandle.high,
            low: lastCandle.low,
            close: lastCandle.close,
            volume: lastVolume.value,
            change,
        };
    });

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, 
            chartConfig({chartContainerRef : chartContainerRef as RefObject<HTMLDivElement>})    
        );

        const candlestickSeries = chart.addSeries(CandlestickSeries, candleStyleConfig());

        const volumeSeries = chart.addSeries(HistogramSeries, {
            priceScaleId: '',
            priceFormat: {
                type: 'volume',
            },
        });

        chart.priceScale('').applyOptions({
            scaleMargins: {
                top: 0.78,
                bottom: 0,
            },
            borderVisible: false,
        });

        candlestickSeries.setData(candles);
        volumeSeries.setData(volumes);
        chart.timeScale().fitContent();

        const onCrosshairMove = (param: MouseEventParams<Time>) => {
            const candleAtPoint = param.seriesData.get(candlestickSeries) as CandlePoint | undefined;
            const volumeAtPoint = param.seriesData.get(volumeSeries) as VolumePoint | undefined;

            if (!candleAtPoint) return;

            const change = ((candleAtPoint.close - candleAtPoint.open) / candleAtPoint.open) * 100;

            setHeaderState({
                open: candleAtPoint.open,
                high: candleAtPoint.high,
                low: candleAtPoint.low,
                close: candleAtPoint.close,
                volume: volumeAtPoint?.value ?? 0,
                change,
            });
        };

        chart.subscribeCrosshairMove(onCrosshairMove);
        
        chartRef.current = chart;

        const handleResize = () => {
            chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.unsubscribeCrosshairMove(onCrosshairMove);
            chart.remove();
        };
    }, [candles, volumes]);

    const changeText = `${headerState.change >= 0 ? '+' : ''}${headerState.change.toFixed(2)}%`;
    const changeColor = headerState.change >= 0 ? 'text-emerald-400' : 'text-red-400';

    return (
        <div className='px-6'>
        <div className='w-full rounded-xl border border-neutral-800 bg-neutral-950 p-3 '>
            <div className='mb-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs md:text-sm'>
                <span className='rounded border border-neutral-700 bg-neutral-900 px-2 py-1 text-neutral-100'>1h</span>
                <span className='text-neutral-100'>SLUG/ETH Market Cap (USD)</span>
                <span className='text-neutral-400'>O <span className='text-neutral-200'>{formatCompact(headerState.open)}</span></span>
                <span className='text-neutral-400'>H <span className='text-neutral-200'>{formatCompact(headerState.high)}</span></span>
                <span className='text-neutral-400'>L <span className='text-neutral-200'>{formatCompact(headerState.low)}</span></span>
                <span className='text-neutral-400'>C <span className='text-neutral-200'>{formatCompact(headerState.close)}</span></span>
                <span className='text-neutral-400'>V <span className='text-neutral-200'>{formatCompact(headerState.volume)}</span></span>
                <span className={changeColor}>{changeText}</span>
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