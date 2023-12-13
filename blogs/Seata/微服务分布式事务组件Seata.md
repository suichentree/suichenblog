---
title: 微服务分布式事务组件Seata
date: 2022-08-22
sidebar: 'auto'
categories: 
 - 后端
tags:
 - Seata
---

[toc]

# 微服务分布式事务组件Seata

Seata是分布式事务的当前解决方案。当前Seata版本为1.5.1

下图为微服务架构图
![20220728161129.png](../blog_img/20220728161129.png)

目前SpringCloudAlibaba中各个组件的版本搭配

|  Spring Cloud Alibaba Version | Sentinel Version | Nacos Version | RocketMQ Version | Dubbo Version | Seata Version | 
|  ----  | ----  | ----  | ----  | ----  | ----  |
| 2.2.8.RELEASE  | 1.8.4 | 2.1.0 | 4.9.3 | ~ | 1.5.1 |


## 分布式事务

### 事务的分类

事务本质上就是一组逻辑操作。事务的原子性要求事务内的所有逻辑操作要么全部完成，要么全部失败。

事务主要分为本地事务和分布式事务两种。

> 本地事务

本地事务一般是指服务自身的逻辑操作。并且只涉及到一个服务，一个数据库。

本地事务的ACID特性是由数据库直接提供支持。

![seata_20231213211420.png](../blog_img/seata_20231213211420.png)

> 分布式事务

分布式事务一般是指多个服务共同组成的逻辑操作。并且会涉及到多个服务，多个数据库。

简而言之，分布式事务可以理解为多个本地事务组合为一个大事务。

![seata_20231213212116.png](../blog_img/seata_20231213212116.png)

由于分布式事务涉及到多个数据库，那么分布式事务的ACID特性就无法单纯由数据库的事务机制来提供了。

### 分布式事务的问题

由于分布式事务是由多个本地事务组成的。而每个本地事务都有自己的业务逻辑操作和数据库操作。

当分布式事务中的某个操作失败了，那么为了保证分布式事务的原子性，分布式事务中的其他读写操作也要进行失败处理。只有当分布式事务中的所有操作都成功了，那么这个分布式事务才算成功。

即分布式事务中的所有操作，要么全部成功，要么全部失败。

### 分布式事务的使用场景

通常情况下，事务的ACID特性都是由数据库来实现。例如Spring事务的底层就是调用各个数据库的事务实现的。

由于分布式事务涉及到多个服务，多个数据库。那么分布式事务的ACID特性就无法单纯由数据库的事务来提供了。

分布式事务的使用场景如下：
1. 跨库事务: 跨库事务指的是一个业务功能需要操作多个数据库。这种情况下会面临着分布式事务的问题。
![seata20220822144529.png](../blog_img/seata20220822144529.png)

2. 分库分表: 当数据库分库分表之后，一个业务功能也会涉及到操作多个数据库的情况。此时要保证多个数据库的操作要么都成功，要么都失败，因此分库分表的情况下也会面临着分布式事务的问题。
![seata20220822145935.png](../blog_img/seata20220822145935.png)

3. 微服务: 在微服务架构下，一个业务功需要调用多个服务，多个数据库。那么也会面临着分布式事务的问题。
![seata20220822151034.png](../blog_img/seata20220822151034.png)

### 解决分布式事务问题的理论基础

由于分布式事务，涉及到多个事务，多个数据库。那么如何保证分布式事务中的操作要么全部完成，要么全部失败。

目前解决分布式事务问题的理论基础，有2PC和3PC协议。

目前主流的分布式事务解决方案都是2PC协议。

#### 2PC协议

2PC协议，全称2阶段提交协议。

> 阶段1(准备阶段):
1. 协调者向所有参与者询问是否可执行事务操作，然后等待各个参与者的响应。
2. 各个参与者接收到协调者的询问后，执行事务操作(例如更新数据库记录)，但不提交事务。
3. 参与者事务操作完成后，将Undo和Redo信息记入事务日志中。
4. 如果参与者成功执行了事务操作，则向协调者返回 YES 响应，否则返回 NO 响应。

![seata20220822155036.png](../blog_img/seata20220822155036.png)

- 协调者:用于管理分布式事务中的所有事务.
- 参与者:可以是数据库,也可以是单个服务.

<font color="red">注意:在阶段1中,如果协调者就无法收到所有参与者的YES响应，或者某个参与者返回了No响应。此时协调者就会进入回退流程，让所有的事务进行回退操作(将Commit请求替换为红色的Rollback请求)。如下图所示 </font>

> 阶段2(提交阶段，正常情况下)
1. 当阶段1完成后，即协调者收到所有参与者的 YES 响应后。开始进行阶段2。
2. 协调者会向所有参与者发送 Commit 提交请求。
3. 参与者收到 Commit 提交请求后，进行事务提交。事务提交完成后，释放事务占用的所有资源。
4. 参与者在事务提交完成之后向协调者发送 YES 响应。
5. 协调者接收到所有参与者的 YES 响应后，那么分布式事务就完成了。

![seata20220822154748.png](../blog_img/seata20220822154748.png)

> 阶段2(提交阶段，回退情况下)

中断事务并回退:
1. 如果某个参与者的事务提交失败。那么参与者会向协同者发送 NO 响应。
2. 当协同者收到参与者的 NO 响应后，表示有某个事务执行失败了。
3. 此时协调者会向所有参与者发送 Rollback 回退请求。
3. 参与者收到 Rollback 回退请求后，参与者会使用阶段1生成的 Undo 日志执行事务回滚，然后释放事务占用的所有资源。
4. 参与者执行完事务回滚后，向协调者发送 Ack 响应。
5. 协调者接收到所有参与者的 Ack 响应后，完成分布式事务的回退操作。

![seata20220822160139.png](../blog_img/seata20220822160139.png)

#### 2PC协议的问题

1. 若网络异常，导致参与者收不到协调者信息，那么参与者会一直阻塞下去。
2. 如果协调者宕机，那么参与者会一直阻塞下去。并占用资源。
3. 在阶段2中，如果网络异常，导致部分参与者没有收到协同者的 Commit/Rollback 请求，而其他参与者则正常收到 Commit/Rollback 操作。那么没有收到请求的参与者则继续阻塞。这时，参与者之间的数据就不再一致了。

### 常见分布式事务解决方案

分布式事务的解决方案有4种:
① seata阿里分布式事务框架
② 消息队列
③ saga
④ XA

实际上，这四种分布式事务解决方案，分别对应着分布式事务的四种模式：AT、TCC、Saga、XA；<font color="red">这四种模式都是在2PC协议上形成的。</font>

## 2 分布式事务实现的4种模式（AT、TCC、Saga、XA）

### AT模式(auto transcation)

阿里seata分布式事务框架实现了AT模式。在AT模式下，用户只需关注自己的“业务 SQL”，用户的 “业务 SQL” 作为一阶段，Seata 框架会自动生成事务的二阶段提交和回滚操作。

![seata20220822223543.png](../blog_img/seata20220822223543.png)

一阶段：
    在一阶段，Seata 会拦截“业务 SQL”，首先解析 SQL 语义，找到“业务 SQL”要更新的业务数据，在业务数据被更新前，将其保存成“before image（before快照）”，然后执行“业务 SQL”更新业务数据，在业务数据更新之后，再将其保存成“after image（after快照）”，最后生成行锁。以上操作全部在一个数据库事务内完成，这样保证了一阶段操作的原子性。

![seata20220822224203.png](../blog_img/seata20220822224203.png)

二阶段提交的情况：
    二阶段如果是提交的话，因为“业务 SQL”在一阶段已经提交至数据库， 所以 Seata 框架只需将一阶段保存的快照数据和行锁删掉，完成数据清理即可。

![seata20220822224609.png](../blog_img/seata20220822224609.png)

二阶段回滚的情况：
    二阶段如果是回滚的话，Seata 就需要回滚一阶段已经执行的“业务 SQL”，还原业务数据。回滚方式便是用“before image”还原业务数据；但在还原前要首先要校验脏写，对比“数据库当前业务数据”和 “after image”，如果两份数据完全一致就说明没有脏写，可以还原业务数据，如果不一致就说明有脏写，出现脏写就需要转人工处理。

![seata20220822224701.png](../blog_img/seata20220822224701.png)

<font color="red">AT 模式的一阶段、二阶段提交和回滚均由 Seata 框架自动生成，用户只需编写“业务 SQL”，便能轻松接入分布式事务，AT 模式是一种对业务无任何侵入的分布式事务解决方案。</font>


### TCC模式(Try、Confirm 和 Cancel)

TCC 模式需要用户根据自己的业务场景实现 Try、Confirm 和 Cancel 三个操作；事务发起方在一阶段执行 Try 方式，在二阶段提交执行 Confirm 方法，二阶段回滚执行 Cancel 方法。

TCC 模式：
    优点：在整个分布式事务的过程中基本没有锁，性能更强。
    缺点：侵入性比较强， 并且得自己实现相关事务控制逻辑。

![seata20220822225712.png](../blog_img/seata20220822225712.png)

Try：用来进行资源的检测和预留；
Confirm：执行的业务操作提交；要求 Try 成功 Confirm 一定要能成功；
Cancel：预留资源释放

### Saga模式

在 Saga 模式下，分布式事务内有多个参与者，每一个参与者都有一个对应的冲正补偿服务，需要用户根据业务场景实现其正向操作和逆向回滚操作。<font color="red">Saga正向服务与补偿服务需要业务开发者实现。因此是业务入侵的。</font>

![seata20220822230419.png](../blog_img/seata20220822230419.png)

上图T1-T3都是正向的业务流程，都对应着一个冲正逆向操作C1-C3。若在分布式事务执行过程中，依次执行各参与者的正向操作，如果所有正向操作均执行成功，那么分布式事务提交。如果任何一个正向操作执行失败，那么分布式事务会退回去执行前面参与者的逆向回滚操作，回滚已提交的参与者，使分布式事务回到初始状态。

Saga模式的优点是：
1. 一阶段提交本地数据库事务，无锁，高性能；
2. 参与者可以采用事务驱动异步执行，高吞吐；
3. 补偿服务即正向服务的“反向”，易于理解，易于实现；

Saga模式的缺点是：
由于一阶段已经提交本地数据库事务，且没有进行“预留”动作，所以不能保证隔离性。需要专门对隔离性采取额外应对措施。

### XA模式

XA模式缺点：事务粒度大。高并发下，系统可用性低。因此很少使用。

### 4种分布式事务模式的使用场景和分析

* AT 模式是无侵入的分布式事务解决方案，适用于不希望对业务进行改造的场景，几乎0学习成本。
* TCC 模式是高性能分布式事务解决方案，适用于核心系统等对性能有很高要求的场景。
* Saga 模式是长事务解决方案，适用于业务流程长且需要保证事务最终一致性的业务系统。
* XA模式是分布式强一致性的解决方案，但性能低而使用较少

<font color="red">总结：在微服务开发过程中，分布式事务会大大的提高流程的复杂度，会带来很多额外的开销工作，因此能不使用分布式事务就不使用。</font>


## 分布式事务组件Seata介绍

Seata是一款阿里巴巴开源的分布式事务解决方案，致力于提供高性能和简单易用的分布式事务服务。

[Seata官网](https://seata.io/zh-cn/)

> 在 Seata 的架构中，有三个重要的角色。
- TC 事务协调者(Transaction Coordinator) ：用于维护全局和分支事务的状态，驱动全局事务提交或回滚。
- TM 事务管理器(Transaction Manager) ：用于定义全局事务的范围：开始全局事务、提交或回滚全局事务。
- RM 资源管理器(Resource Manager) ：用于管理分支事务处理的资源，与TC交谈以注册分支事务和报告分支事务的状态，并驱动分支事务提交或回滚。

<font color="red">其中TC为单独部署的Seata Server服务端，TM和RM为嵌入到服务应用中的Seata Client客户端。</font>

![seata_20231214011524.png](../blog_img/seata_20231214011524.png)

如图所示，三个角色在分布式事务中的作用。其中Business服务需要调用Stock服务，Order服务，Account服务。

> Seata提供了四种分布式事务的解决方案

- AT模式：Seata的默认模式。是最终一致性的分阶段事务模式，无业务侵入。
- XA模式：强一致性分阶段事务模式，弱可用性，无业务侵入。
- TCC模式：最终一致性的分阶段事务模式，有业务侵入。
- SAGA模式：长事务模式，有业务侵入。

其中AT模式是Seata的默认模式，也是阿里巴巴推荐的模式。

## 分布式事务组件Seata的使用


### Seata服务端（TC角色）部署

①下载安装包，注意Seata的版本要与SpringCloudAlibaba的版本搭配

下载地址：https://github.com/seata/seata/releases

② Seata服务端存储模式（store.mode）支持三种
* file：(默认单机模式)本地文件模式，全局事务会话信息内存中读写并持久化本地文件/bin/sessionStore/root.data，性能较高。
* db：数据库模式（可为集群模式），全局事务会话信息通过db共享，性能差些。（mysql数据库仅支持5.7+版本）
* redis： redis模式，性能较高,存在事务信息丢失风险,需要提前配置redis持久化配置。

③ 运行/bin/seata-server.bat,启动Seata服务端。

<font color="red">file模式下可以直接启动，无须数据源配置。</font>

④ 访问seata服务端界面。localhost:7091/#/login。账号密码都是seata

![seata20220824095707.png](../blog_img/seata20220824095707.png)
![seata20220824095943.png](../blog_img/seata20220824095943.png)

#### 配置Seata服务端存储模式为db

1. 修改Seata服务端配置文件/conf/application.yml,修改为store.mode="db"
2. 将application.example.yml中的数据库db配置信息，复制到application.yml中,修改store.db相关属性。

```yml
seata:
  config:
    type: file
  registry:
    type: file
  store:
    mode: db  ## 模式改为db
    #### 从application.example.yml中复制数据库连接信息到application.yml的
    db:
      datasource: druid
      db-type: mysql
      driver-class-name: com.mysql.jdbc.Driver
      url: jdbc:mysql://127.0.0.1:3306/seata-mysql?rewriteBatchedStatements=true
      user: root
      password: root
      min-conn: 5
      max-conn: 100
      global-table: global_table
      branch-table: branch_table
      lock-table: lock_table
      distributed-lock-table: distributed_lock
      query-limit: 100
      max-wait: 5000
```
3. 在数据库中创建表

Seata建表脚本地址：https://github.com/seata/seata/blob/1.5.0/script/server/db/mysql.sql

创建对应数据库，执行下面脚本建表。数据库名称为上面配置文件中的url名称，即seata-mysql

```sql
-- -------------------------------- The script used when storeMode is 'db' --------------------------------
-- the table to store GlobalSession data
CREATE TABLE IF NOT EXISTS `global_table`
(
    `xid`                       VARCHAR(128) NOT NULL,
    `transaction_id`            BIGINT,
    `status`                    TINYINT      NOT NULL,
    `application_id`            VARCHAR(32),
    `transaction_service_group` VARCHAR(32),
    `transaction_name`          VARCHAR(128),
    `timeout`                   INT,
    `begin_time`                BIGINT,
    `application_data`          VARCHAR(2000),
    `gmt_create`                DATETIME,
    `gmt_modified`              DATETIME,
    PRIMARY KEY (`xid`),
    KEY `idx_status_gmt_modified` (`status` , `gmt_modified`),
    KEY `idx_transaction_id` (`transaction_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- the table to store BranchSession data
CREATE TABLE IF NOT EXISTS `branch_table`
(
    `branch_id`         BIGINT       NOT NULL,
    `xid`               VARCHAR(128) NOT NULL,
    `transaction_id`    BIGINT,
    `resource_group_id` VARCHAR(32),
    `resource_id`       VARCHAR(256),
    `branch_type`       VARCHAR(8),
    `status`            TINYINT,
    `client_id`         VARCHAR(64),
    `application_data`  VARCHAR(2000),
    `gmt_create`        DATETIME(6),
    `gmt_modified`      DATETIME(6),
    PRIMARY KEY (`branch_id`),
    KEY `idx_xid` (`xid`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- the table to store lock data
CREATE TABLE IF NOT EXISTS `lock_table`
(
    `row_key`        VARCHAR(128) NOT NULL,
    `xid`            VARCHAR(128),
    `transaction_id` BIGINT,
    `branch_id`      BIGINT       NOT NULL,
    `resource_id`    VARCHAR(256),
    `table_name`     VARCHAR(32),
    `pk`             VARCHAR(36),
    `status`         TINYINT      NOT NULL DEFAULT '0' COMMENT '0:locked ,1:rollbacking',
    `gmt_create`     DATETIME,
    `gmt_modified`   DATETIME,
    PRIMARY KEY (`row_key`),
    KEY `idx_status` (`status`),
    KEY `idx_branch_id` (`branch_id`),
    KEY `idx_xid_and_branch_id` (`xid` , `branch_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS `distributed_lock`
(
    `lock_key`       CHAR(20) NOT NULL,
    `lock_value`     VARCHAR(20) NOT NULL,
    `expire`         BIGINT,
    primary key (`lock_key`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

INSERT INTO `distributed_lock` (lock_key, lock_value, expire) VALUES ('AsyncCommitting', ' ', 0);
INSERT INTO `distributed_lock` (lock_key, lock_value, expire) VALUES ('RetryCommitting', ' ', 0);
INSERT INTO `distributed_lock` (lock_key, lock_value, expire) VALUES ('RetryRollbacking', ' ', 0);
INSERT INTO `distributed_lock` (lock_key, lock_value, expire) VALUES ('TxTimeoutCheck', ' ', 0);
```

#### 配置Seata服务端，注入到nacos注册中心

从application.example.yml中复制注册中心连接信息到application.yml中。编辑registry.type属性和registry.nacos属性。

```yml
seata:
  registry:
    type: nacos   ### 设置注册中心为nacos
    preferred-networks: 30.240.*
    nacos:
      application: seata-server     ### seata服务名称
      server-addr: 127.0.0.1:7070   ### nacos注册中心地址
      group: SEATA_GROUP
      namespace:
      cluster: default              ### nacos注册中心默认为集群模式
      username: nacos               ### nacos账户
      password: nacos               ### nacos密码
```

![seata20220823171307.png](../blog_img/seata20220823171307.png)

#### 配置Seata服务端连接nacos配置中心，读取配置中心数据

① 从application.example.yml中复制配置中心连接信息到application.yml中。编辑registry.type属性和registry.nacos属性。

```yml
seata:
  config:
    type: nacos  ##设置nacos为配置中心
    nacos:
      server-addr: 127.0.0.1:7070       ##配置中心地址
      namespace:
      group: SEATA_GROUP             
      username: nacos                   ### nacos账户
      password: nacos                   ### nacos密码
      data-id: seataServer.properties   ### 配置文件的名称
```

② 在nacos配置中心中创建对应的配置文件。可以把seata的存储模式等相关配置放在nacos配置中心中编辑，然后由seata来读取。

![seata20220823172222.png](../blog_img/seata20220823172222.png)
![seata20220823173928.png](../blog_img/seata20220823173928.png)


#### 解决Seata服务端启动seata-server.bat闪退

当Seata服务端启动失败后，windows命令窗口会闪退，导致无法看到失败原因。

解放方式：编辑seata-server.bat

```
cmd    # 在最后一行前加上这段代码，防止闪退。
exit /B %ERROR_CODE%
```

### Seata客户端部署

暂无