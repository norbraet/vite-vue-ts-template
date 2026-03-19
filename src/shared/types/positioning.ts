export type PositioningHorizontal = 'left' | 'right'
export type PositioningVertical = 'up' | 'down'

export interface PositioningOptions {
  offset?: number
  preferredHorizontal?: PositioningHorizontal
  preferredVertical?: PositioningVertical
}
