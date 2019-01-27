const users = `
  CREATE TABLE if not exists users  (
    uid int(10) unsigned NOT NULL auto_increment,
    token varchar(200) default NULL,
    name varchar(32) default NULL,
    password varchar(64) default NULL,
    mail varchar(200) default NULL,
    created int(10) unsigned default '0',
    PRIMARY KEY  (uid),
    UNIQUE KEY name (name),
    UNIQUE KEY mail (mail)
  ) ENGINE=MyISAM  DEFAULT CHARSET=utf8;`

const roles = `
  CREATE TABLE if not exists roles (
    id int(10) unsigned NOT NULL auto_increment,
    _id int(10)  unsigned NOT NULL,
    name varchar(16),
    description varchar(225) default NULL,
    PRIMARY KEY  (id)
  ) ENGINE=MyISAM  DEFAULT CHARSET=utf8;`

const permissions = `
  CREATE TABLE if not exists permissions(
    id int(10) unsigned NOT NULL auto_increment,
    _id int(10)  unsigned NOT NULL,
    name varchar(16) NOT NULL,
    description varchar(225) default NULL,
    PRIMARY KEY  (id)
  ) ENGINE=MyISAM  DEFAULT CHARSET=utf8;`

const users_role = `
  CREATE TABLE if not exists users_role(
    id int(10) unsigned NOT NULL auto_increment,
    user_id int(10) NOT NULL,
    role_id int(10) NOT NUlL,
    PRIMARY KEY  (id)
  ) ENGINE=MyISAM  DEFAULT CHARSET=utf8;`

const roles_permission = `
  CREATE TABLE if not exists roles_permission(
    id int(10) unsigned NOT NULL auto_increment,
    role_id int(10) NOT NULL,
    permission_id varchar(16) NOT NULL,
    PRIMARY KEY  (id)
  ) ENGINE=MyISAM  DEFAULT CHARSET=utf8;`

const posts = `
  CREATE TABLE if not exists posts (
    pid int(10) unsigned NOT NULL auto_increment,
    title varchar(200) default NULL,
    created int(10) unsigned default '0',
    modified int(10) unsigned default '0',
    text longtext,
    authorId int(10) unsigned default '0',
    commentsNum int(10) unsigned default '0',
    allowComment char(1) default '0',
    PRIMARY KEY  (pid),
    KEY created (created)
  ) ENGINE=MyISAM  DEFAULT CHARSET=utf8;`

const comments = `
  CREATE TABLE if not exists comments (
    coid int(10) unsigned NOT NULL auto_increment,
    created int(10) unsigned default '0',
    author varchar(200) default NULL,
    authorId int(10) unsigned default '0',
    ownerId int(10) unsigned default '0' comment '所属文章',
    mail varchar(200) default NULL,
    url varchar(200) default NULL,
    text text,
    parent int(10) unsigned default '0',
    PRIMARY KEY  (coid),
    KEY created (created)
  ) ENGINE=MyISAM  DEFAULT CHARSET=utf8;`

export default {
  users,
  roles,
  permissions,
  users_role,
  roles_permission,
  posts,
  comments
}
