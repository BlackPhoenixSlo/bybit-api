export const linearPositionModeEnum = {
  OneWayMode: 'MergedSingle',
  HedgeMode: 'BothSide',
} as const;

export const positionTpSlModeEnum = {
  /** Full take profit/stop loss mode (a single TP order and a single SL order can be placed, covering the entire position) */
  Full: 'Full',
  /** Partial take profit/stop loss mode (multiple TP and SL orders can be placed, covering portions of the position) */
  Partial: 'Partial',
} as const;

export const API_ERROR_CODE = {
  BALANCE_INSUFFICIENT_SPOT: -1131,
  ORDER_NOT_FOUND_OR_TOO_LATE_SPOT: -2013,
  /** This could mean bad request, incorrect value types or even incorrect/missing values */
  PARAMS_MISSING_OR_WRONG: 10001,
  ORDER_NOT_FOUND_OR_TOO_LATE: 20001,
  POSITION_STATUS_NOT_NORMAL: 30013,
  CANNOT_SET_TRADING_STOP_FOR_ZERO_POS: 30024,
  /** Seen when placing an order */
  INSUFFICIENT_BALANCE_FOR_ORDER_COST: 30031,
  POSITION_IDX_NOT_MATCH_POSITION_MODE: 30041,
  /** Seen if a conditional order is too large */
  INSUFFICIENT_BALANCE: 30042,
  /** E.g. trying to change position margin while on cross */
  POSITION_IS_CROSS_MARGIN: 30056,
  POSITION_MODE_NOT_MODIFIED: 30083,
  ISOLATED_NOT_MODIFIED: 30084,
  RISK_LIMIT_NOT_EXISTS: 30090,
  LEVERAGE_NOT_MODIFIED: 34036,
  SAME_SLTP_MODE: 37002,
  ORDER_NOT_FOUND_OR_TOO_LATE_LINEAR: 130010,
  ORDER_COST_NOT_AVAILABLE: 130021,
  CANNOT_SET_LINEAR_TRADING_STOP_FOR_ZERO_POS: 130024,
  ISOLATED_NOT_MODIFIED_LINEAR: 130056,
  POSITION_SIZE_IS_ZERO: 130057,
  AUTO_ADD_MARGIN_NOT_MODIFIED: 130060,
  INSUFFICIENT_BALANCE_FOR_ORDER_COST_LINEAR: 130080,
  SAME_SLTP_MODE_LINEAR: 130150,
  RISK_ID_NOT_MODIFIED: 134026,
} as const;