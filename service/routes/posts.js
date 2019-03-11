import marked from 'marked';
import DBModel from '../db/index';
import { blogInfo } from '../db/config';

export default async (ctx) => {
  const { offset, limit } = ctx.request.query;

  try {
    const posts = await DBModel.posts(offset, limit || blogInfo.limit);
    ctx.body = {
      status: 1,
      data: posts,
    };
  } catch (err) {
    ctx.throw(500, JSON.stringify(err));
  }
};
