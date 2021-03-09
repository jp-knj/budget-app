import { config } from 'react-spring'

export const transitionConfig = (listHeight, trail) => ({
  from: { height: listHeight, transform: 'translate3d(-5%,0,0)', opacity: 0 },
  enter: { height: listHeight, transform: 'translate3d(0%,0,0)', opacity: 1 },
  leave: { height: 0, transform: 'translate3d(-5000%,0,0)', opacity: 0 },
  config: config.stiff,
  reset: true,
  trail,
})
