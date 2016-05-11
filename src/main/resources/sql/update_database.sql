/*
  保存数据库更新sql
  格式:
  -- 日期(精确到分钟) 操作人 操作表:操作内容
  具体的SQL

  eg:
  -- 2015/07/06 15:30 伊开堂 tb_payment:增加整合微信时所需字段
  alter table tb_payment add wx_order_no varchar(20) default null;
*/


/*修改 tb_coupon_batch   字段长度*/
alter table tb_coupon_batch change product_name product_name varchar(1000) not null comment '商品编号'; 
alter table tb_coupon_batch change product_no product_no varchar(256) not null comment '商品编号';
/* */