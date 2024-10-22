import * as Koa from 'koa';
import * as Router from 'koa-router'
import logger=require('koa-logger');
import bodyparser=require('koa-bodyparser')
import { playBattleship } from './controller/gameController';

const port=process.env.PORT || 8080

const app=new Koa();
const router=new Router();
app.use(logger());
app.use(bodyparser());

router.get('/',async (ctx)=>{
    ctx.body='Welcome to Koa';
});


router.get('/play', playBattleship);

app.use(router.routes());
app.listen(port);

console.log(` My koa server is up and listening on port ${port}`)
