from pydantic import BaseModel

headers = ['نماد'
, 'نام'
, 'تعداد'
, 'حجم'
, 'ارزش'
, 'دیروز'
, 'اولین'
, 'آخرین معامله - مقدار'
, 'آخرین معامله - تغییر'
, 'آخرین معامله - درصد'
, 'قیمت پایانی - مقدار'
, 'قیمت پایانی - تغییر'
, 'قیمت پایانی - درصد'
, 'کمترین'
, 'بیشترین'
, 'EPS'
, 'P/E'
, 'خرید - تعداد'
, 'خرید - قیمت'
, 'فروش - قیمت'
, 'فروش - حجم'
, 'فروش - تعداد']

class StockInfo(BaseModel):
    symbol_short_name: str
    symbol_long_name: str
    count: float
    volume: float
    value: float
    yesterday: float
    open: float
    last: float
    last_change: float
    last_change_percentage: float = None
    close: float
    close_change: float
    close_change_percentage: float = None
    min: float
    max: float
    eps: float = None
    p_e: float = None
    buy_orders_count: float
    buy_orders_volume: float
    buy_orders_price: float
    sell_orders_count: float
    sell_orders_volume: float
    sell_orders_price: float