/*
 Navicat Premium Data Transfer

 Source Server         : 130
 Source Server Type    : MariaDB
 Source Server Version : 100014
 Source Host           : 192.168.1.130
 Source Database       : 8flowtest

 Target Server Type    : MariaDB
 Target Server Version : 100014
 File Encoding         : utf-8

 Date: 07/06/2015 15:01:44 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `tb_asset_flow`
-- ----------------------------
DROP TABLE IF EXISTS `tb_asset_flow`;
CREATE TABLE `tb_asset_flow` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `flow_no` varchar(50) NOT NULL DEFAULT '' COMMENT '支付编号',
  `flow_asset_type` int(2) NOT NULL COMMENT '支付类型',
  `user_code` varchar(50) DEFAULT NULL COMMENT '用户编号',
  `user_name` varchar(50) DEFAULT NULL COMMENT '用户名称',
  `operate_code` varchar(50) DEFAULT NULL COMMENT '操作人编号',
  `operate_name` varchar(50) DEFAULT NULL COMMENT '操作人名称',
  `amount` int(11) NOT NULL COMMENT '金额',
  `type` int(2) NOT NULL COMMENT '类型',
  `order_no` varchar(50) DEFAULT NULL COMMENT '订单编号',
  `payment_no` varchar(50) DEFAULT '' COMMENT '支付主订单编号',
  `request_trade_no` varchar(64) DEFAULT NULL COMMENT '关联交易编号, 用于非余额和积分支付场景, 可能是支付宝订单号, 券号(pay_type=3时必输)',
  `out_trade_no` varchar(64) DEFAULT NULL COMMENT '关联交易编号, 用于非余额和积分支付场景, 可能是支付宝订单号, 券号(pay_type=3时必输)',
  `status` int(2) NOT NULL COMMENT '状态',
  `create_date` datetime NOT NULL COMMENT '创建时间，注册时间',
  `update_date` datetime DEFAULT NULL COMMENT '修改信息时间',
  `remark` varchar(3000) DEFAULT NULL COMMENT '备注信息',
  `reserve1` varchar(1000) DEFAULT NULL,
  `reserve2` varchar(1000) DEFAULT NULL,
  `reserve3` varchar(1000) DEFAULT NULL,
  `reserve4` varchar(1000) DEFAULT NULL,
  `reserve5` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_flow_no` (`flow_no`) USING BTREE,
  KEY `idx_payment_no` (`payment_no`),
  KEY `idx_user_code` (`user_code`),
  KEY `idx_order_no` (`order_no`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `tb_back_card_order`
-- ----------------------------
DROP TABLE IF EXISTS `tb_back_card_order`;
CREATE TABLE `tb_back_card_order` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `order_no` varchar(50) NOT NULL COMMENT '订单编号',
  `coupon_batch_no` varchar(50) DEFAULT NULL,
  `product_no` varchar(20) NOT NULL COMMENT '商品编号',
  `product_name` varchar(20) NOT NULL COMMENT '商品名称',
  `pro_count` int(10) DEFAULT NULL COMMENT '数量',
  `price` bigint(20) NOT NULL COMMENT '价格（分）',
  `back_money` bigint(20) DEFAULT NULL COMMENT '退款总金额',
  `user_code` varchar(50) NOT NULL COMMENT '用户编号，登陆账号',
  `create_date` datetime NOT NULL COMMENT '创建时间',
  `back_order_no` varchar(50) DEFAULT NULL COMMENT '要退款的批次号',
  `remark` varchar(3000) DEFAULT NULL COMMENT '备注信息',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_order_no` (`order_no`),
  KEY `idx_coupon_batch_no` (`coupon_batch_no`),
  KEY `idx_user_code` (`user_code`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `tb_batch`
-- ----------------------------
DROP TABLE IF EXISTS `tb_batch`;
CREATE TABLE `tb_batch` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `create_date` datetime NOT NULL,
  `creator_code` varchar(64) DEFAULT NULL,
  `creator_name` varchar(128) DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `name` varchar(50) NOT NULL COMMENT '批次名称',
  `number` varchar(64) NOT NULL COMMENT '批次编号',
  `status` int(2) NOT NULL COMMENT '批次状态',
  `user_code` varchar(32) NOT NULL COMMENT '用户编号',
  `nick_name` varchar(32) DEFAULT NULL COMMENT '用户昵称',
  `product_no` varchar(32) NOT NULL COMMENT '商品编号',
  `product_name` varchar(64) NOT NULL COMMENT '商品名称',
  `total_price` bigint(10) NOT NULL COMMENT '总价, 以''分''为单位',
  `pay_order_no` varchar(32) DEFAULT NULL COMMENT '支付订单号',
  `pay_status` int(2) DEFAULT NULL COMMENT '支付状态',
  `valid_account_total` int(8) unsigned NOT NULL COMMENT '有效账号总数',
  `charge_await_total` int(8) unsigned NOT NULL COMMENT '待充值账号总数',
  `charging_total` int(8) unsigned NOT NULL COMMENT '充值中账号总数',
  `charge_succeed_total` int(8) unsigned NOT NULL COMMENT '充值成功账号总数',
  `charge_failed_total` int(8) unsigned NOT NULL COMMENT '充值失败账号总数',
  `product_type` int(2) unsigned NOT NULL COMMENT '1：充流量 2：流量券',
  `remark` varchar(3000) DEFAULT NULL,
  `reserve1` varchar(1000) DEFAULT NULL,
  `reserve2` varchar(1000) DEFAULT NULL,
  `reserve3` varchar(1000) DEFAULT NULL,
  `reserve4` varchar(1000) DEFAULT NULL,
  `reserve5` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_batch_no` (`number`),
  KEY `idx_user_code` (`user_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `tb_batch_consume_record`
-- ----------------------------
DROP TABLE IF EXISTS `tb_batch_consume_record`;
CREATE TABLE `tb_batch_consume_record` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_date` DATETIME NOT NULL,
  `user_code` varchar(50) DEFAULT NULL,
  `exchange_batch_no` varchar(50) NOT NULL,
  `exchange_batch_name` varchar(50) DEFAULT NULL,
  `status` int(5) DEFAULT NULL,
  `valid_total` int(5) DEFAULT NULL,
  `recharge_total` int(5) DEFAULT NULL,
  `recharge_success_total` int(5) DEFAULT NULL,
  `recharge_failure_total` int(5) DEFAULT NULL,
  `remark` int(50) DEFAULT NULL,
  `reserve1` varchar(50) DEFAULT NULL COMMENT '备注字段',
  `reserve2` varchar(50) DEFAULT NULL COMMENT '备注字段',
  `reserve3` varchar(50) DEFAULT NULL COMMENT '备注字段',
  `reserve4` varchar(50) DEFAULT NULL COMMENT '备注字段',
  `reserve5` varchar(50) DEFAULT NULL COMMENT '备注字段',
  PRIMARY KEY (`id`),
  KEY `idx_exchange_batch_no` (`exchange_batch_no`),
  KEY `idx_user_code` (`user_code`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `tb_consume_record`
-- ----------------------------
DROP TABLE IF EXISTS `tb_consume_record`;
CREATE TABLE `tb_consume_record` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_date` datetime NOT NULL,
  `record_no` varchar(64) NOT NULL COMMENT '编号',
  `type` tinyint(2) NOT NULL COMMENT '类型',
  `status` tinyint(2) NOT NULL,
  `order_no` varchar(64) DEFAULT NULL COMMENT '单订单编号',
  `batch_no` varchar(64) DEFAULT NULL COMMENT '批次编号',
  `coupon_batch_no` varchar(64) DEFAULT NULL COMMENT '流量卡批次号',
  `user_code` varchar(64) NOT NULL COMMENT '用户编号',
  `product_no` varchar(64) NOT NULL COMMENT '商品编号或流量卡编号',
  `product_name` varchar(64) DEFAULT NULL COMMENT '商品名称或流量卡名称',
  `product_type` tinyint(2) DEFAULT NULL COMMENT '商品类型',
  `recharge_account` varchar(50) DEFAULT NULL COMMENT '充值账号',
  `account_type` tinyint(2) DEFAULT NULL COMMENT '账号类型  1:手机号"',
  `coupon_no` varchar(64) DEFAULT NULL,
  `return_code` varchar(10) DEFAULT NULL COMMENT '充值返回码',
  `return_msg` varchar(100) DEFAULT NULL COMMENT '充值返回信息',
  `return_order_no` varchar(64) DEFAULT NULL COMMENT '充值返回的订单号',
  `remark` varchar(1000) DEFAULT NULL,
  `reserve1` varchar(1000) DEFAULT NULL,
  `reserve2` varchar(1000) DEFAULT NULL,
  `reserve3` varchar(1000) DEFAULT NULL,
  `reserve4` varchar(1000) DEFAULT NULL,
  `reserve5` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_user_code` (`user_code`),
  KEY `idx_record_no` (`record_no`),
  KEY `idx_order_no` (`order_no`),
  KEY `idx_batch_no` (`batch_no`),
  KEY `idx_coupon_batch_no` (`coupon_batch_no`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `tb_coupon_batch`
-- ----------------------------
DROP TABLE IF EXISTS `tb_coupon_batch`;
CREATE TABLE `tb_coupon_batch` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `create_date` datetime NOT NULL,
  `creator_code` varchar(64) DEFAULT NULL,
  `creator_name` varchar(128) DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `number` varchar(64) NOT NULL COMMENT '批次编号',
  `status` int(2) NOT NULL COMMENT '批次状态',
  `user_code` varchar(32) NOT NULL COMMENT '用户编号',
  `nick_name` varchar(32) DEFAULT NULL COMMENT '用户昵称',
  `product_no` varchar(32) NOT NULL COMMENT '商品编号',
  `product_name` varchar(64) NOT NULL COMMENT '商品名称',
  `product_type` int(2) unsigned NOT NULL COMMENT '1：充流量 2：流量券',
  `total_price` bigint(20) NOT NULL COMMENT '总价, 以''分''为单位',
  `actual_total_price` bigint(20) NOT NULL COMMENT '实际扣减总价, 以''分''为单位',
  `type` int(2) DEFAULT NULL,
  `fee` int(5) DEFAULT NULL,
  `remark` varchar(3000) DEFAULT NULL,
  `reserve1` varchar(1000) DEFAULT NULL,
  `reserve2` varchar(1000) DEFAULT NULL,
  `reserve3` varchar(1000) DEFAULT NULL,
  `reserve4` varchar(1000) DEFAULT NULL,
  `reserve5` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_batch_no` (`number`),
  UNIQUE KEY `idx_number` (`number`),
  KEY `idx_user_code` (`user_code`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `tb_order`
-- ----------------------------
DROP TABLE IF EXISTS `tb_order`;
CREATE TABLE `tb_order` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `order_no` varchar(50) NOT NULL COMMENT '订单编号',
  `order_type` int(2) NOT NULL COMMENT '订单类型：1-系统，2-接口',
  `product_type` int(2) NOT NULL COMMENT '1：充流量 2：流量券',
  `product_no` varchar(20) NOT NULL COMMENT '商品编号',
  `product_name` varchar(20) NOT NULL COMMENT '商品名称',
  `pro_count` int(10) DEFAULT NULL COMMENT '数量',
  `used_count` int(10) DEFAULT NULL COMMENT '已经使用的数量',
  `price` bigint(20) NOT NULL COMMENT '价格（分）',
  `total_price` bigint(20) DEFAULT NULL COMMENT '总价',
  `account_type` int(2) DEFAULT NULL COMMENT '账号类型',
  `recharge_account` varchar(50) DEFAULT NULL COMMENT '充值账号',
  `user_code` varchar(50) NOT NULL COMMENT '用户编号，登陆账号',
  `batch_no` varchar(50) DEFAULT NULL COMMENT '批次号',
  `coupon_batch_no` varchar(50) DEFAULT NULL,
  `status` int(2) NOT NULL COMMENT '状态',
  `return_code` varchar(20) DEFAULT NULL COMMENT '返回码',
  `create_date` datetime NOT NULL COMMENT '创建时间，注册时间',
  `update_date` datetime DEFAULT NULL COMMENT '修改信息时间',
  `remark` varchar(3000) DEFAULT NULL COMMENT '备注信息',
  `return_msg` varchar(100) DEFAULT NULL COMMENT '返回说明',
  `return_order_no` varchar(64) DEFAULT NULL COMMENT '返回订单号',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_order_no` (`order_no`),
  KEY `idx_user_code` (`user_code`),
  KEY `idx_batch_no` (`batch_no`),
  KEY `idx_coupon_batch_no` (`coupon_batch_no`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `tb_payment`
-- ----------------------------
DROP TABLE IF EXISTS `tb_payment`;
CREATE TABLE `tb_payment` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `create_date` datetime NOT NULL,
  `payment_no` varchar(64) NOT NULL COMMENT '支付订单号',
  `payment_asset_type` int(4) NOT NULL COMMENT '支付资金类型',
  `amount` int(11) NOT NULL COMMENT '支付金额',
  `status` int(2) NOT NULL COMMENT '状态',
  `type` int(2) NOT NULL COMMENT '类型',
  `order_no` varchar(64) DEFAULT '' COMMENT '商品订单号',
  `batch_no` varchar(64) DEFAULT NULL COMMENT '批次号',
  `coupon_batch_no` varchar(64) DEFAULT NULL,
  `product_no` varchar(64) NOT NULL COMMENT '商品编号',
  `product_name` varchar(64) DEFAULT NULL COMMENT '商品名称',
  `creator_name` varchar(64) DEFAULT NULL,
  `remark` varchar(1000) DEFAULT NULL,
  `reserve1` varchar(1000) DEFAULT NULL,
  `reserve2` varchar(1000) DEFAULT NULL,
  `reserve3` varchar(1000) DEFAULT NULL,
  `reserve4` varchar(1000) DEFAULT NULL,
  `reserve5` varchar(1000) DEFAULT NULL,
  `wx_coupon_name` VARCHAR(100) DEFAULT NULL,
  `wx_coupon_code` VARCHAR(32)  DEFAULT NULL,
  `wx_coupon_value` INT(13)  DEFAULT NULL,
  `wx_order_pay_id` VARCHAR(64) DEFAULT NULL,
  `wx_prepay_id` VARCHAR(64) DEFAULT NULL,
  `wx_pay_serial_number` VARCHAR(64) DEFAULT NULL,
  `wx_system_refund_id` VARCHAR(64) DEFAULT NULL,
  `wx_wx_refund_id` VARCHAR(64) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_payment_no` (`payment_no`) USING BTREE,
  UNIQUE KEY `idx_order_type` (`payment_asset_type`,`order_no`),
  KEY `idx_order_no` (`order_no`) USING BTREE,
  KEY `idx_batch_no` (`batch_no`),
  KEY `idx_coupon_batch_no` (`coupon_batch_no`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `tb_product`
-- ----------------------------
DROP TABLE IF EXISTS `tb_product`;
CREATE TABLE `tb_product` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `product_no` varchar(20) NOT NULL COMMENT '商品编号',
  `product_name` varchar(50) NOT NULL COMMENT '商品名称',
  `par` varchar(10) NOT NULL DEFAULT '' COMMENT '面值(5M, 1G)',
  `type` int(2) NOT NULL COMMENT '商品类型  1 流量直冲  2 券 ',
  `pro_count` int(10) NOT NULL COMMENT '数量',
  `price` bigint(20) DEFAULT NULL COMMENT '价格',
  `account_type` int(2) DEFAULT NULL COMMENT '帐号类别',
  `verify_type` int(2) DEFAULT NULL COMMENT '帐号检测类型（移动、联通...号段验证等）',
  `source` varchar(50) NOT NULL COMMENT '来源',
  `ticket` varchar(50) DEFAULT NULL COMMENT '券号，pay_type=3时必输',
  `status` int(2) NOT NULL COMMENT '状态',
  `create_date` datetime NOT NULL COMMENT '创建时间，注册时间',
  `update_date` datetime DEFAULT NULL COMMENT '修改信息时间',
  `remark` varchar(3000) DEFAULT NULL COMMENT '备注信息',
  `disable_reason` varchar(200) DEFAULT NULL COMMENT '禁用原因',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_product_no` (`product_no`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `tb_ticket`
-- ----------------------------
DROP TABLE IF EXISTS `tb_ticket`;
CREATE TABLE `tb_ticket` (
  `id` bigint(11) NOT NULL,
  `ticket_no` varchar(50) NOT NULL COMMENT '券号',
  `ticket_passwrod` varchar(50) NOT NULL COMMENT '券密码',
  `ticket_name` varchar(50) NOT NULL COMMENT '券名称',
  `order_no` varchar(50) DEFAULT NULL COMMENT '订单编号（采购订单）',
  `type` int(2) NOT NULL COMMENT '类型：1-流量券',
  `product_no` varchar(50) NOT NULL COMMENT '商品编号',
  `product_name` varchar(50) NOT NULL COMMENT '商品名称',
  `price` bigint(20) NOT NULL COMMENT '单价(分)',
  `recharge_account` varchar(20) DEFAULT NULL COMMENT '充值账号',
  `user_code` varchar(50) DEFAULT NULL COMMENT '用户编号',
  `user_name` varchar(50) DEFAULT NULL COMMENT '用户名称',
  `source_system` int(2) NOT NULL COMMENT '商品源系统：1-券系统',
  `source_orderNo` varchar(50) DEFAULT NULL COMMENT '源系统订单编号',
  `source_returncode` varchar(50) DEFAULT NULL COMMENT '源系统响应码',
  `source_power` int(2) NOT NULL COMMENT '使用权限：1-当前用户，2-不限',
  `status` int(2) NOT NULL COMMENT '状态：1-可用，0-已用2正在使用、3使用失败',
  `create_date` datetime NOT NULL COMMENT '生成时间',
  `start_date` datetime NOT NULL COMMENT '有效时间起',
  `end_date` datetime NOT NULL COMMENT '有效时间止',
  `sold_date` datetime DEFAULT NULL COMMENT '售出时间',
  `handle_date` datetime DEFAULT NULL COMMENT '使用时间',
  `remark` varchar(3000) DEFAULT NULL COMMENT '备注信息',
  `reserve1` varchar(50) DEFAULT NULL,
  `reserve2` varchar(50) DEFAULT NULL,
  `reserve3` varchar(50) DEFAULT NULL,
  `reserve4` varchar(50) DEFAULT NULL,
  `reserve5` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_ticket_no` (`ticket_no`),
  KEY `idx_order_no` (`order_no`),
  KEY `idx_user_code` (`user_code`),
  KEY `idx_recharge_account` (`recharge_account`),
  KEY `idx_product_no` (`product_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `tb_ticket_stock`
-- ----------------------------
DROP TABLE IF EXISTS `tb_ticket_stock`;
CREATE TABLE `tb_ticket_stock` (
  `id` bigint(11) NOT NULL,
  `ticket_name` varchar(50) DEFAULT NULL COMMENT '券名称',
  `order_no` varchar(50) NOT NULL COMMENT '订单编号（采购订单）',
  `type` int(2) NOT NULL COMMENT '类型：1-流量券',
  `product_no` varchar(30) NOT NULL COMMENT '商品编号',
  `product_name` varchar(20) NOT NULL COMMENT '商品名称',
  `price` bigint(20) NOT NULL COMMENT '单价',
  `source_system` int(2) NOT NULL COMMENT '商品源系统：1-券系统',
  `source_power` int(2) NOT NULL COMMENT '使用权限：1-当前用户，2-不限',
  `ticket_stock` int(10) NOT NULL COMMENT '剩余数量',
  `enable` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否禁用',
  `create_date` datetime NOT NULL COMMENT '创建时间',
  `start_date` datetime NOT NULL COMMENT '有效时间起',
  `end_date` datetime NOT NULL COMMENT '有效时间止',
  `remark` varchar(3000) DEFAULT NULL COMMENT '备注信息',
  `reserve1` varchar(50) DEFAULT NULL,
  `reserve2` varchar(50) DEFAULT NULL,
  `reserve3` varchar(50) DEFAULT NULL,
  `reserve4` varchar(50) DEFAULT NULL,
  `reserve5` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `tb_user`
-- ----------------------------
DROP TABLE IF EXISTS `tb_user`;
CREATE TABLE `tb_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_code` varchar(50) DEFAULT NULL COMMENT '用户编号',
  `user_name` varchar(50) DEFAULT NULL COMMENT '用户名称',
  `nick_name` varchar(20) DEFAULT NULL COMMENT '昵称',
  `password` varchar(50) DEFAULT NULL COMMENT '登陆密码MD5',
  `user_type` int(2) NOT NULL COMMENT '用户类型：1-个人用户，2-公司客户',
  `company_name` varchar(255) DEFAULT NULL COMMENT '公司名称（公司客户）',
  `company_address` varchar(255) DEFAULT NULL COMMENT '公司地址（公司客户）',
  `contacts` varchar(20) DEFAULT NULL COMMENT '联系人（公司客户）',
  `tel` varchar(20) DEFAULT NULL COMMENT '联系电话',
  `email` varchar(50) DEFAULT NULL COMMENT '邮箱',
  `status` int(2) NOT NULL COMMENT '状态',
  `create_date` datetime NOT NULL COMMENT '创建时间，注册时间',
  `update_date` datetime DEFAULT NULL COMMENT '修改信息时间',
  `pay_password` varchar(50) DEFAULT NULL COMMENT '支付密码md5',
  `remark` varchar(3000) DEFAULT NULL COMMENT '备注信息',
  `disable_reason` varchar(200) DEFAULT NULL COMMENT '禁用原因',
  `last_login_failed_date` datetime DEFAULT NULL,
  `security_level` int(2) DEFAULT NULL COMMENT '安全等级',
  `last_login_date` datetime DEFAULT NULL,
  `wx_open_id` varchar(255) DEFAULT NULL,
  `wx_photo_url` varchar(255) DEFAULT NULL,
  `sex` tinyint(1) DEFAULT '0',
  `area` varchar(255) DEFAULT NULL,
  `wx_attention_date` datetime DEFAULT NULL,
  `wx_state` tinyint(1) DEFAULT NULL COMMENT '微信关注状态0：未关注  1：已关注',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_user_code` (`user_code`),
  UNIQUE KEY `idx_email` (`email`),
  UNIQUE KEY `idx_tel` (`tel`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `tb_user_asset`
-- ----------------------------
DROP TABLE IF EXISTS `tb_user_asset`;
CREATE TABLE `tb_user_asset` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `asset_no` varchar(50) DEFAULT NULL COMMENT '编号(用户编号 + yyMMdd + 资产类型)',
  `asset_name` varchar(50) DEFAULT NULL COMMENT '资产名称',
  `asset_type` int(2) DEFAULT NULL COMMENT '资产类型(1:积分, 2:余额...)',
  `asset_count` bigint(20) DEFAULT NULL COMMENT '资产总量(余额时单位为分)',
  `asset_status` int(2) DEFAULT NULL COMMENT '资产状态(正常,冻结...)',
  `user_code` varchar(50) DEFAULT NULL COMMENT '用户编号',
  `user_name` varchar(50) DEFAULT NULL COMMENT '用户名称',
  `user_type` int(2) DEFAULT NULL COMMENT '用户类型',
  `company_name` varchar(50) DEFAULT NULL COMMENT '公司名称（公司客户）',
  `create_date` datetime DEFAULT NULL,
  `valid_date` datetime DEFAULT NULL COMMENT '启用时间(冻结时设置)',
  `last_modify_value` bigint(20) DEFAULT NULL COMMENT '最后一次资产变动数量',
  `last_modify_type` int(2) DEFAULT NULL COMMENT '最后一次资产变动类型(开户, 销户, 扣减, 充值, 冻结, 解冻...), 参考:UserAssetOperationEnum',
  `last_modify_date` datetime DEFAULT NULL COMMENT '最后一次资产变动时间',
  `last_relative_flow_no` varchar(50) DEFAULT NULL COMMENT '最后一次资产变动时关联的流水号',
  `remark` varchar(3000) DEFAULT NULL,
  `reserve1` varchar(50) DEFAULT NULL,
  `reserve2` varchar(50) DEFAULT NULL,
  `reserve3` varchar(50) DEFAULT NULL,
  `reserve4` varchar(50) DEFAULT NULL,
  `reserve5` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_asset_no` (`asset_no`),
  KEY `idx_user_code` (`user_code`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;


-- init