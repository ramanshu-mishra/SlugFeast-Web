import { ColorType, CrosshairMode } from "lightweight-charts";
import { RefObject } from "react";

export function chartConfig({chartContainerRef}:{chartContainerRef: RefObject<HTMLDivElement>}){
    const config = 
    {
                width: chartContainerRef.current.clientWidth,
                height: 560,
                layout: {
                    background: { type: ColorType.Solid, color: '#171717' },
                    textColor: '#94A3B8',
                    fontFamily: 'Inter, system-ui, sans-serif',
                },
                grid: {
                    vertLines: { color: 'rgba(148, 163, 184, 0.08)' },
                    horzLines: { color: 'rgba(148, 163, 184, 0.08)' },
                },
                crosshair: {
                    mode: CrosshairMode.Normal,
                    vertLine: {
                        color: 'rgba(59, 130, 246, 0.45)',
                        labelBackgroundColor: '#1E293B',
                    },
                    horzLine: {
                        color: 'rgba(59, 130, 246, 0.45)',
                        labelBackgroundColor: '#1E293B',
                    },
                },
                rightPriceScale: {
                    borderColor: 'rgba(148, 163, 184, 0.24)',
                    scaleMargins: {
                        top: 0.08,
                        bottom: 0.28,
                    },
                },
                timeScale: {
                    borderColor: 'rgba(148, 163, 184, 0.24)',
                    rightOffset: 8,
                    barSpacing: 10,
                    timeVisible: true,
                    secondsVisible: false,
                    fixLeftEdge: false,
                    lockVisibleTimeRangeOnResize: true,
                },
            }
            return config;
}



export function candleStyleConfig(){
    const config = {
            upColor: '#14B8A6',
            downColor: '#EF4444',
            wickUpColor: '#14B8A6',
            wickDownColor: '#EF4444',
            borderVisible: false,
        }
        return config;
}