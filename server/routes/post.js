import DBModel from '../db/index'

export default async (ctx, next) => {
  const token = ctx.header.authorization
  const ACTION = 'post'

  const user = await DBModel.findUSerByToken(token)

  console.log(user);
  

  //const { title, text,allowComment } = ctx.request.body
 
}
