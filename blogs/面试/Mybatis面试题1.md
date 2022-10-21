---
title: Mybatis面试题
date: 2019-11-12
sidebar: 'auto'
categories:
 - 面试
tags:
 - Mybatis
---

[toc]

## Mybatis面试题

### 1.什么是Mybatis？有什么优点和缺点？

* （1）Mybatis 是一个半 ORM（对象关系映射）框架，它内部封装了 JDBC，不需要花费精力去处理加载驱动、创建连接、创建statement 等繁杂的过程。开发时只需要关注 SQL 语句本身。
* （2）MyBatis 可以使用 XML 或注解来配置，通过配置把对象映射成数据库中的记录。

### 2.Mybatis有什么优点和缺点？

* 优点1:SQL 写在 XML 里，解除sql与程序代码的耦合，便于统一管理；提供 XML标签，支持编写动态SQL语句，并可重用。
* 优点2：消除了 JDBC 大量冗余的代码。与 JDBC 相比，减少了 50%以上的代码量，不需要手动开关连接；
* 优点3：能够与 Spring 很好的集成。

* 缺点1：SQL 语句的编写工作量较大，尤其当字段多、关联表多时，对开发人员编写SQL 语句的功底有一定要求。
* 缺点2：SQL 语句依赖于数据库，导致数据库移植性差，不能随意更换数据库。

### 3.MyBatis 与 Hibernate 有哪些不同？

* （1）Mybatis 和 hibernate 不同，它是一个 半ORM 框架，因为 MyBatis 需要程序员自己编写 Sql 语句。
* （2）Mybatis 直接编写原生态 sql，可以严格控制 sql 执行性能，灵活度高，非常适合对关系数据模型要求不高的软件开发，
* （3）Hibernate 对象/关系映射能力强，数据库无关性好，对于关系模型要求高的软件，如果用hibernate开发可以节省很多代码，提高效率。

### 4.#{}和${}的区别是什么？

```
#{}是预编译处理，${}是字符串替换。
Mybatis 在处理#{}时，会将 sql 中的#{}替换为?号，调用 PreparedStatement 的set 方法来赋值；
Mybatis 在处理${}时，就是把${}替换成变量的值。类似用 + 号来把参数和sql语句进行拼接。
使用#{}可以有效的防止SQL注入，提高系统安全性。
```

使用#{parameterName}引用参数的时候，Mybatis会把这个参数认为是一个字符串，例如传入参数是“1=1”，那么在SQL（Select * from temp where name = #{employeeName})使用的时候就会转换为Select * from emp where name = '1=1'; 那么你想sql注入1=1之类的就起不来作用 

### 5.什么是SQL注入？
sql注入攻击就是输入参数未经过滤，直接拼接到sql语句中，当这样不符合预期的sql语句执行后，达到预想之外的行为。**就是用户输入的时候 输入某些SQL片段，从而更改后台SQL语句的预定的执行命令。**

### 6.当类的属性名和表中的字段名不一样怎么办？
方法1：通过在sql语句中定义字段名的别名，让字段名的别名和类的属性名一致。
```xml
<select id="selectorder" parametertype="int" resultetype="com.xx.xx.order">
select order_id id, order_no orderno ,order_price price form orders where order_id=#{id};
</select>
```

方法2： 通过`<resultMap>`来把字段名和类属性一一对应。
```xml
<select id="getOrder" parameterType="int" resultMap="AAA">
select * from orders where order_id=#{id}
</select>
<resultMap type=”com.xxx.xxx.order” id="AAA">
    <id property="id" column="order_id">   //用 id 属性来映射主键字段
    <result property ="orderno" column ="order_no"/> //用 result 属性来映射非主键字段，property 为实体类属性名，column为数据表中的属性
    <result property="price" column="order_price" />
</reslutMap>
```

### 7.模糊查询 like 语句该怎么写?
第 1 种：在 Java 代码中添加 sql 通配符%。
```
string name = “%aaa%”;

<select id="selectlike">
select * from foo where bar like #{value}
</select>
```

第 2 种：在 sql 语句中拼接通配符%，会引起 sql 注入.
```
string name = “aaa”;

<select id="selectlike">
select * from foo where bar like "%"#{value}"%"
</select>
```

### 8.通常一个Mybatis的Xml映射文件，都会写一个Mapper接口与之对应，这个Mapper接口的工作原理是什么？Mapper接口里的方法能重载吗？

Mapper 接口就是Dao接口。在 Mybatis的xml文件中，每一个`<select>`、`<insert>`、`<update>`、`<delete>`标签，都会被解析为一个MapperStatement 对象。举例：com.mybatis3.mappers.StudentDao.findStudentById，可以唯一找到 namespace 为 com.mybatis3.mappers.StudentDao 下面 id 为findStudentById 的 MapperStatement。Mapper 接口里的方法，是不能重载的，因为是使用 全限名+方法名 的保存和寻找策略。Mapper 接口的工作原理是 JDK 动态代理，Mybatis 运行时会使用 JDK动态代理为 Mapper 接口生成代理对象 proxy，代理对象会拦截接口方法，转而执行 MapperStatement 所代表的 sql，然后将 sql 执行结果返回。

### 9.Mybatis如何获取自动生成的(主)键值?
insert 方法总是返回一个 int 值 ，这个值代表的是插入的行数。
如果采用自增长策略，自动生成的键值在 insert 方法执行完后可以被设置到传入的参数对象中.

```java
<insert id="insertname" usegeneratedkeys="true" keyproperty="id">
insert into names (name) values (#{name})
</insert>

name name = new name();
name.setname(“fred”);
int rows = mapper.insertname(name);
// 完成后,id 已经被设置到对象中
system.out.println(“rows inserted = ” + rows);
system.out.println(“generated key value = ” + name.getid());
```

### 10.在mapper接口中如何传递多个参数?

方法1：#{0}代表接收的是 dao 层中的第一个参数

```java
//dao层接口
public UserselectUser(String name,String area);

//对应的xml文件
<select id="selectUser" resultMap="BaseResultMap">
select * from user_user_t where user_name = #{0} and user_area=#{1}
</select>
```

方法2:使用 @param 注解

```java
public interface usermapper {
	public user selectuser(@param("username") string username,@param("hashedpassword") string hashedpassword);
}

//对应的xml文件
<select id="selectuser" resulttype="user">
select id, username,hashedpassword from some_table
where username = #{username}
and hashedpassword = #{hashedpassword}
</select>
```

方法3： 

```java
HashMap<String, Object> map = new HashMap<>();
map.put("username","a");
map.put("sex","男");
map.put("startIndex",0);
map.put("pageSize",6);
List<User> findByConditionByMap(map); 

//对应的xml文件
<select id="findByConditionByMap" parameterType="map" resultType="user">
    select * from user where username like "%"#{username}"%" and sex=#{sex} 
    limit #{startIndex},#{pageSize}
</select>
```

### 11.Mybatis 动态 sql 有什么用？执行原理？有哪些动态 sql？

在Xml映射文件内，以标签的形式编写动态sql，执行原理是根据表达式的值完成逻辑判断并动态拼接sql。

Mybatis 提供了 9 种动态 sql 标签：trim | where | set | foreach | if | choose| when | otherwise | bind。

1. if标签
```xml
<select id="findUserById" resultType="user">
    select * from user where 
    <if test="id != null">
        id=#{id}
    </if>
</select>
```

2. where标签-加上where关键字，并且当where标签后紧随and或则or的时候，就去除and或者or。
```xml
<select id="findUserById" resultType="user">
    select * from user            
    <where>
        <if test="id != null">
            id=#{id}
        </if>
        and deleteFlag=0;
    </where>
 </select>
## 若id为null ,则会拼接  select * from user where deleteFlag=0
```

3. set标签-添加set关键字，并且当set标签后有","逗号时，就去除逗号
```xml
<update id="updateUser" parameterType="com.dy.entity.User">
    update user        
    <set>
        <if test="name != null">name = #{name},</if> 
        <if test="password != null">password = #{password},</if> 
        <if test="age != null">age = #{age},</if> 
    </set>
</update>
```

4. foreach标签
foreach循环的对象当然主要是java容器和数组。
```xml
<select id="selectPostIn" resultType="domain.blog.Post">
  SELECT *
  FROM POST P
  WHERE ID in
  <foreach item="item" index="index" collection="list"
      open="(" separator="," close=")">
        #{item}
  </foreach>
</select>
```
将一个 List 实例或者数组作为参数对象传给 MyBatis，当这么做的时候，MyBatis 会自动将它包装在一个 Map 中并以名称为键。List 实例将会以“list”作为键，而数组实例的键将是“array”。同样， 当循环的对象为map的时候，index其实就是map的key。

5. choose, when, otherwise标签

```xml
<select id="findActiveBlogLike" resultType="Blog">
  SELECT * FROM BLOG WHERE state = ‘ACTIVE’
  <choose>
    <when test="title != null">
      AND title like #{title}
    </when>
    <when test="author != null and author.name != null">
      AND author_name like #{author.name}
    </when>
    <otherwise>
      AND featured = 1
    </otherwise>
  </choose>
</select>
```

当choose标签中的when标签都满足条件，则二选一，前者优先。when标签都不满足条件，则选择otherwise标签中sql。若when标签中只有一个满足条件，则选择满足条件的when标签。

6. trim标签-灵活的去处多余关键字的标签

```xml
trim标签替代where标签
<trim prefix="WHERE" prefixOverrides="AND |OR ">
  ... 
</trim>
## 上面的意思时在sql前添加前缀 where,并且去掉sql语句中的and 或 or 前缀（即第一个and或者or关键字）

trim标签替代set标签
<trim prefix="SET" suffixOverrides=",">
  ...
</trim>
## 上面的意思时在sql前添加前缀set,并且去掉sql语句中的","逗号后缀（即最后一个","逗号关键字）
```

7. bind标签
```xml
<select id="" resultType="">
    <bind name="_lastName" value="'%'+lastName+'%'"/>
    select * from tbl_employee where last_name like #{_lastName}
</select>
```
上面xml中name是为该值取别名，value是其具体的值。

### 12.不同的 Xml 映射文件中，每个sql对应id 是否可以重复？

不同的 Xml 映射文件，如果配置了namespace，那么 id 可以重复；如果没有配置 namespace，那么 id 不能重复；

原因就是 namespace+id 是作为唯一key使用的，如果没有 namespace，就剩下 id，那么id重复会导致数据互相覆盖。有了namespace，namespace 不同，namespace+id 自然也就不同。

### 13.为什么说Mybatis是半自动 ORM 映射工具？它与全自动的区别在哪里？？
Hibernate 属于全自动 ORM 映射工具，使用 Hibernate 查询关联对象或者关联集合对象时，可以根据对象关系模型直接获取，所以它是全自动的。

而 Mybatis在查询关联对象或关联集合对象时，需要手动编写 sql 来完成，所以，称之为半自动 ORM 映射工具。

### 14.Mybatis中的 一对一、一对多的关联查询 ？

一对一关联查询-association
```xml
<!--association 一对一关联查询 -->
<select id="getClass" parameterType="int" resultMap="ClassesResultMap">
select * from class c,teacher t where c.teacher_id=t.t_id and
c.c_id=#{id}
</select>

<resultMap type="com.lcb.user.Classes" id="ClassesResultMap">
    <!-- 实体类的字段名和数据表的字段名映射 -->
    <id property="id" column="c_id"/>
    <result property="name" column="c_name"/>

    <association property="teacher" javaType="com.lcb.user.Teacher">
        <id property="id" column="t_id"/>
        <result property="name" column="t_name"/>
    </association>
</resultMap>
```
association标签中的property="teacher"，表示映射为学生类的teacher属性。

一对多关联查询-collection
```xml
<!--collection 一对多关联查询 -->
<select id="getClass2" parameterType="int" resultMap="ClassesResultMap2">
select * from class c,teacher t,student s where c.teacher_id=t.t_id
and c.c_id=s.class_id and c.c_id=#{id}
</select>

<resultMap type="com.lcb.user.Classes" id="ClassesResultMap2">
    <id property="id" column="c_id"/>
    <result property="name" column="c_name"/>
    
    <association property="teacher" javaType="com.lcb.user.Teacher">
        <id property="id" column="t_id"/>
        <result property="name" column="t_name"/>
    </association>
    
    <collection property="student" ofType="com.lcb.user.Student">
        <id property="id" column="s_id"/>
        <result property="name" column="s_name"/>
    </collection>
</resultMap>
```

### 15.Mybatis 的一级、二级缓存？

1. 一级缓存: 其存储作用域为Session，当 Session被flush 或 close 之后，该 Session 中的所有 Cache 就将清空，默认打开一级缓存。
2. 二级缓存与一级缓存其机制相同，默认也是采用 PerpetualCache，HashMap存储，不同在于其存储作用域为 Mapper(Namespace)，并且可自定义存储源，如 Ehcache。默认不打开二级缓存，要开启二级缓存，使用二级缓存属性类需要实现 Serializable 序列化接口(可用来保存对象的状态),可在它的映射文件中配置`<cache/>` ；
3. 对于缓存数据更新机制，当某一个作用域(一级缓存 Session/二级缓存Namespaces)的进行了 C/U/D 操作后，默认该作用域下所有 select 中的缓存将被 clear。

### 16.什么是 MyBatis 的接口绑定？有哪些实现方式？
接口绑定，就是在 MyBatis 中任意定义接口,然后把接口里面的方法和 SQL 语句绑定, 直接调用接口方法就相当于调用接口方法对应的sql语句,

接口绑定有两种实现方式,一种是通过注解绑定，就是在接口的方法上面加上@Select、@Update 等注解，里面包含 Sql 语句来绑定；另外一种就是通过 xml里面写 SQL 来绑定, 在这种情况下,要指定 xml 映射文件里面的 namespace 必须为接口的全路径名。

当 Sql 语句比较简单时候,用注解绑定, 当 SQL 语句比较复杂时候,用 xml 绑定,一般用 xml 绑定的比较多。

### 17.使用 MyBatis 的 mapper 接口调用时有哪些要求？
1. Mapper 接口方法名和 mapper.xml 中定义的每个 sql 的 id 相同；
2. Mapper 接口方法的输入参数类型和 mapper.xml 中定义的每个 sql 的parameterType 的类型相同；
3. Mapper 接口方法的输出参数类型和 mapper.xml 中定义的每个 sql 的resultType 的类型相同；
4. Mapper.xml 文件中的 namespace 即是 mapper 接口的类路径。

### 18.Mapper 编写有哪几种方式？

第一种：接口实现类继承 SqlSessionDaoSupport：使用此种方法需要编写mapper 接口，mapper 接口实现类、mapper.xml 文件。
1. 在 sqlMapConfig.xml 中配置 mapper.xml 的位置
```xml
<mappers>
    <mapper resource="mapper.xml 文件的地址" />
    <mapper resource="mapper.xml 文件的地址" />
</mappers>
```
2. 定义 mapper 接口
3. 实现类集成 SqlSessionDaoSupportmapper 方法中可以 this.getSqlSession()进行数据增删改查
4. spring 配置
```xml
<bean id=" " class="mapper 接口的实现">
<property name="sqlSessionFactory"
ref="sqlSessionFactory"></property>
</bean>
```

第二种：使用 org.mybatis.spring.mapper.MapperFactoryBean：
1. 在 sqlMapConfig.xml 中配置 mapper.xml 的位置，如果 mapper.xml 和mappre 接口的名称相同且在同一个目录，这里可以不用配置
```xml
<mappers>
<mapper resource="mapper.xml 文件的地址" />
<mapper resource="mapper.xml 文件的地址" />
</mappers>
```
2. 定义 mapper 接口：
3. mapper.xml 中的 namespace 为 mapper 接口的地址
4. mapper 接口中的方法名和 mapper.xml 中的定义的 statement 的 id 保持一致
5. Spring 中定义
```xml
<bean id="" class="org.mybatis.spring.mapper.MapperFactoryBean">
<property name="mapperInterface" value="mapper 接口地址" />
<property name="sqlSessionFactory" ref="sqlSessionFactory" />
</bean>
```

第三种：使用 mapper 扫描器：
1. mapper.xml 文件编写：mapper.xml 中的 namespace 为 mapper 接口的地址；mapper 接口中的方法名和 mapper.xml 中的定义的 statement 的 id 保持一致；如果将 mapper.xml 和 mapper 接口的名称保持一致则不用在 sqlMapConfig.xml中进行配置。
2. 定义 mapper 接口：注意 mapper.xml 的文件名和 mapper 的接口名称保持一致，且放在同一个目录
3. 配置 mapper 扫描器：
```xml
<bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
<property name="basePackage" value="mapper 接口包地址"></property>
<property name="sqlSessionFactoryBeanName"
value="sqlSessionFactory"/>
</bean>
```
4. 使用扫描器后从 spring 容器中获取 mapper 的实现对象。