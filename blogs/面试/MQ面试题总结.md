---
title: MQ面试题
date: 2023-08-29
sidebar: 'auto'
categories:
 - 面试
---

[toc]

# MQ面试题

## 为什么使用MQ

使用MQ最大的好处就是解耦,异步,削峰。

- 解耦是指一个系统或者一个模块，调用了多个系统或者模块，维护起来很麻烦。如果用 MQ 可以给它异步化解耦。
- 异步是指一个系统可以用MQ，以异步的方式调用其他接口。
- 削峰：减少高峰时期对服务器压力。

使用MQ最大的缺点就是系统可用性下降，系统复杂性提高，一致性问题。

- 系统可用性降低：系统引入的外部依赖越多，越容易挂掉。
- 系统复杂度提高：硬生生加个 MQ 进来，你怎么保证消息没有重复消费？怎么处理消息丢失的情况？怎么保证消息传递的顺序性？
- 一致性问题：A 系统处理完了直接返回成功了，人都以为你这个请求就成功了；但是问题是，要是 BCD 三个系统那里，BD 两个系统写库成功了，结果 C 系统写库失败了，咋整？你这数据就不一致了。

## Kafka、ActiveMQ、RabbitMQ、RocketMQ 都有什么区别？

于吞吐量来说kafka和RocketMQ支撑高吞吐，ActiveMQ和RabbitMQ比他们低一个数量级。对于延迟量来说RabbitMQ是最低的。

## 如何保证消息的可靠传输？如果消息丢了怎么办

数据的丢失问题，可能出现在生产者、MQ、消费者中

生产者丢失：生产者将数据发送到 RabbitMQ 的时候，可能数据就在半路给搞丢了，因为网络问题啥的，都有可能。此时可以选择用 RabbitMQ 提供的事务功能，就是生产者发送数据之前开启 RabbitMQ事务channel.txSelect，然后发送消息，如果消息没有成功被 RabbitMQ 接收到，那么生产者会收到异
常报错，此时就可以回滚事务channel.txRollback，然后重试发送消息；如果收到了消息，那么可以提交事务channel.txCommit。

MQ中丢失：就是 RabbitMQ 自己弄丢了数据，这个你必须开启 RabbitMQ 的持久化，就是消息写入之后会持久化到磁盘，哪怕是 RabbitMQ 自己挂了，恢复之后会自动读取之前存储的数据，一般数据不会丢。

消费端丢失：你消费的时候，刚消费到，还没处理，结果进程挂了，比如重启了，那么就尴尬了，RabbitMQ 认为你都消费了，这数据就丢了。这个时候得用 RabbitMQ 提供的ack机制，简单来说，就是你关闭 RabbitMQ 的自动ack，可以通过一个 api 来调用就行，然后每次你自己代码里确保处理完的时候，再在程序里ack一把。这样的话，如果你还没处理完，不就没有ack？那 RabbitMQ 就认为你还没处理完，这个时候 RabbitMQ 会把这个消费分配给别的 consumer 去处理，消息是不会丢的。

## RocketMQ的速度为什么这么快？

RocketMQ处理消息和拉取消息的速度为什么这么快？主要有以下几个方面的原因。

> 批量发送消息 

对于需要批量发送消息的业务场景，RocketMQ在发送消息的时候支持一次性批量发送多条消息。

通过批量发送消息，减少了RocketMQ客户端与服务端之间的网络通信次数，提高消息发送到RocketMq的速度。

不过在使用批量消息的时候，需要注意以下三点：
1. 每条消息的Topic必须都得是一样的
2. 不支持延迟消息和事务消息
3. 不论是普通消息还是批量消息，总大小默认不能超过4m

> 消息压缩

RocketMQ在发送消息的时候，当发现消息的大小超过4k的时候，就会对消息进行压缩。这是因为如果消息过大，会对网络带宽造成压力。

压缩消息除了能够减少网络带宽造成压力之外，还能够节省消息存储空间,会提高发送消息到RocketMQ的速度。

需要注意的是，如果是批量消息的话，就不会进行压缩

> 高性能网络通信模型 

RocketMQ拥有一个高性能网络通信模型。

RocketMQ网络通信这块底层是基于Netty来实现的。

这个高性能网络通信模型能有效提高RocketMQ把消息发送给消费者的速度。

> 零拷贝技术 

当消息达到RocketMQ服务端之后，为了能够保证服务端重启之后消息也不丢失，此时就需要将消息持久化到磁盘中。

而零拷贝技术能够快速将消息存在磁盘中和快速地将消息从磁盘中取出。

> 顺序写

RocketMQ在存储消息时，除了使用零拷贝技术来实现文件的高效读写之外

还使用顺序写的方式提高数据写入的速度。RocketMQ会将消息按照顺序一条一条地写入文件中

这种顺序写的方式由于减少了磁头的移动和寻道时间，在大规模数据写入的场景下，使得数据写入的速度更快。

> CommitLog

当消息到达RocektMQ服务端时，需要将消息存到磁盘文件。而这个磁盘文件就叫CommitLog。

消息在写入到CommitLog文件时，除了包含消息本身的内容数据，也还会包含其它信息。例如消息的Topic，消息生产者的ip和端口等。

这些数据会和消息本身按照一定的顺序同时写到CommitLog文件中

> ConsumeQueue

除了CommitLog文件之外，RocketMQ还会为每个消息队列创建对于的磁盘文件。这个磁盘文件就叫ConsumeQueue。

当消息被存到CommitLog之后，其实还会往这条消息所在队列的ConsumeQueue文件中插一条数据。

插入ConsumeQueue中的每条数据由20个字节组成，包含3部分信息
- 消息在CommitLog的起始位置（8个字节），也被称为偏移量
- 消息在CommitLog存储的长度（4个字节）
- 消息tag的hashCode（8个字节）

因此RocektMQ可以通过ConsumeQueue中存的数据可以在CommitLog文件中找到对应的消息

所以，当消费者在拉取消息时，ConsumeQueue其实就相当于是一个索引文件，方便快速查找在CommitLog中的消息。并且无论CommitLog文件中存多少消息，整个查找消息的时间复杂度都是O(1)

所以ConsumeQueue和CommitLog相互配合，就能保证快速查找到消息，消费者从而就可以快速拉取消息。

> 线程池隔离

RocketMQ在处理请求的时候，会为不同的请求分配不同的线程池进行处理

- 对于消息存储请求和拉取消息请求来说。Broker会有专门为它们分配两个不同的线程池去分别处理这些请求
- 并且不同的业务由不同的线程池去处理的方式，能够有效地隔离不同业务逻辑之间的线程资源的影响

所以RocketMQ通过线程隔离及时可以有效地提高系统的并发性能和稳定性

> 锁优化

RocketMQ进行了多方面的锁优化以提高性能和并发能力。

为了保证消息是按照顺序一条一条地写入到CommitLog文件中，就需要对这个写消息的操作进行加锁。

RocketMQ使用了基于CAS的原子操作来代替传统的锁机制。避免了显式的锁竞争，提高了并发性能。
