import DBModel from '../db/index';

export default async ctx => {
  const token = ctx.header.authorization;
  const ACTION = 'post';

  const userInfo = await DBModel.findUserByToken(token);

  const userRole = await DBModel.searchUserRolesByUser(userInfo[0].uid);
  let userPermission = await DBModel.searchUserPermissionByRole(
    userRole[0].role_id
  );

  userPermission = userPermission.map(up => up.permission_id);

  const rolePermission = await DBModel.selectPermissionById(
    userPermission.toString()
  );

  const hasPermission = rolePermission.some(rp => rp.name === ACTION);

  if (!hasPermission) {
    ctx.status = 401;
    ctx.body = {
      status: 0,
      msg: 'You don"t have permission',
    };
  }

  const { title, text, allowComment } = ctx.request.body;

  if (!title || !text) {
    ctx.body = {
      status: 0,
      msg: 'Parameters incomplete',
    };
  }

  const res = await DBModel.publishPost([
    userInfo[0].uid,
    title,
    text,
    allowComment || 1,
    Date.now(),
  ]);

  ctx.body = {
    status: 1,
    data: {
      id: res.insertId,
    },
  };
};
