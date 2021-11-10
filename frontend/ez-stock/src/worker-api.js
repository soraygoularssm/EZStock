import FilterWorker from 'worker-loader!./workers/filter-worker';
import * as Comlink from 'comlink';

const filterWorker = Comlink.wrap(new FilterWorker());

export const fetchData = filterWorker.fetchData;
export const loadClientType = filterWorker.loadClientType;
export const loadInstStat = filterWorker.loadInstStat;
export const loadInstHistory = filterWorker.loadInstHistory;
export const RenderData = filterWorker.RenderData;
export const UpdateMarketWatch = filterWorker.UpdateMarketWatch;
