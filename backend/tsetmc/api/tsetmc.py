from fastapi import APIRouter
from .models import StockInfo
from .watch import fetch_watch_datetime , fetch_watch_historical_data , fetch_watch_simple_data , fetch_watch_client_type_data , fetch_watch_stats_data

router = APIRouter()

@router.get('/watch')
async def watch():
    res = fetch_watch_simple_data()
    res = [StockInfo(**value) for key,value in res.items()]
    return res

@router.get('/watch/datetime')
async def watch_datetime():
    res = fetch_watch_datetime()
    return res

@router.get('/watch/history')
async def watch_history():
    res = fetch_watch_historical_data()
    return res

@router.get('/watch/clients')
async def watch_clients():
    res = fetch_watch_client_type_data()
    return res

@router.get('/watch/status')
async def watch_status():
    res = fetch_watch_stats_data()
    return res