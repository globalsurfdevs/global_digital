import {Ratelimit} from '@upstash/ratelimit'
import redisClient from './redisClient'

const ratelimit = new Ratelimit({
    redis:redisClient,
    limiter:Ratelimit.slidingWindow(100,'1 m')
});

export default ratelimit;
