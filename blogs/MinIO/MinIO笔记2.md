---
title: MinIO笔记2
date: 2024-03-24
sidebar: "auto"
categories:
  - 数据库
tags:
  - MinIO
  - 对象存储
---

[toc]

# MinIO 笔记 2

## SpringBoot 与 minio 搭配使用

1. 先创建 springboot 工程。
2. 导入 minio 客户端依赖

```xml
<!-- MinIO 客户端 -->
<dependency>
    <groupId>io.minio</groupId>
    <artifactId>minio</artifactId>
    <version>8.2.2</version>
</dependency>
```

3. minio 配置

```yml
minio:
  url: http://127.0.0.1:19000 # minio服务端地址
  accessKey: minioadmin # 用户名
  secretKey: minioadmin # 密码
```

4. 自定义 minio 客户端类

由于官方提供的 MinioClient 类，并没有把一些关于分片上传等方法暴露出来。因此我们需要自定义 MinioClient 类。这样才能使用分片上传等被隐藏的方法。

```java
@Component
public class MyMinioClient extends MinioClient {

    /**
     * 调用父类MinioClient的构造方法
     * @param client
     */
    public MyMinioClient(MinioClient client) {
        super(client);
    }

    /**
     * 创建分片上传请求
     *
     * @param bucketName       存储桶
     * @param region           区域
     * @param objectName       对象名
     * @param headers          消息头
     * @param extraQueryParams 额外查询参数
     */
    @Override
    public CreateMultipartUploadResponse createMultipartUpload(String bucketName, String region, String objectName, Multimap<String, String> headers, Multimap<String, String> extraQueryParams) throws ServerException, InsufficientDataException, ErrorResponseException, NoSuchAlgorithmException, IOException, InvalidKeyException, XmlParserException, InvalidResponseException, InternalException {
        return super.createMultipartUpload(bucketName, region, objectName, headers, extraQueryParams);
    }

    /**
     * 完成分片上传，执行合并文件
     *
     * @param bucketName       存储桶
     * @param region           区域
     * @param objectName       对象名
     * @param uploadId         上传ID
     * @param parts            分片
     * @param extraHeaders     额外消息头
     * @param extraQueryParams 额外查询参数
     */
    @Override
    public ObjectWriteResponse completeMultipartUpload(String bucketName, String region, String objectName, String uploadId, Part[] parts, Multimap<String, String> extraHeaders, Multimap<String, String> extraQueryParams) throws NoSuchAlgorithmException, InsufficientDataException, IOException, InvalidKeyException, ServerException, XmlParserException, ErrorResponseException, InternalException, InvalidResponseException {
        return super.completeMultipartUpload(bucketName, region, objectName, uploadId, parts, extraHeaders, extraQueryParams);
    }

    /**
     * 查询分片文件的数据
     * @param bucketName       存储桶
     * @param region           区域
     * @param objectName       对象名
     * @param uploadId         上传ID
     * @param extraHeaders     额外消息头
     * @param extraQueryParams 额外查询参数
     */
    public ListPartsResponse listParts(String bucketName, String region, String objectName, Integer maxParts, Integer partNumberMarker, String uploadId, Multimap<String, String> extraHeaders, Multimap<String, String> extraQueryParams) throws NoSuchAlgorithmException, InsufficientDataException, IOException, InvalidKeyException, ServerException, XmlParserException, ErrorResponseException, InternalException, InvalidResponseException {
        return super.listParts(bucketName, region, objectName, maxParts, partNumberMarker, uploadId, extraHeaders, extraQueryParams);
    }

}

```

5. minio 配置类

minio 配置类中注入我们自定义 MinioClient 类。

```java
@Configuration
public class MinioConfig {

    /**
     * 访问地址
     */
    @Value("${minio.url}")
    private String endpoint;

    /**
     * accessKey类似于用户ID，用于唯一标识你的账户
     */
    @Value("${minio.accessKey}")
    private String accessKey;

    /**
     * secretKey是你账户的密码
     */
    @Value("${minio.secretKey}")
    private String secretKey;

    @Bean
    public MyMinioClient minioClient() {
        MinioClient minioClient = MinioClient.builder()
                .endpoint(endpoint)
                .credentials(accessKey, secretKey)
                .build();
        return new MyMinioClient(minioClient);
    }

}
```

6. minio 工具类

minio 工具类中使用我们自定义的 MinioClient 类。

```java
/**
 * MinIO工具类
 */
@Slf4j
@Component
public class MinioUtils {
    @Autowired
    private MyMinioClient myMinioClient;

    /****************************** 操作 Bucket ******************************/

    /**
     * 创建存储bucket
     * @return Boolean
     */
    public void makeBucket(String bucketName) throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        myMinioClient.makeBucket(MakeBucketArgs.builder().bucket(bucketName).build());
    }

    /**
     * 判断Bucket是否存在，true：存在，false：不存在
     * @param bucketName
     * @return
     */
    public boolean bucketExists(String bucketName) throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        return myMinioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketName).build());
    }

    /**
     * 查询所有存储桶Bucket
     * @return Bucket列表集合
     */
    public List<Bucket> getBucketslist() throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        return myMinioClient.listBuckets();
    }

    /**
     * 根据bucketName删除Bucket，true：删除成功； false：删除失败或桶中存在文件
     * @param bucketName
     * @throws Exception
     */
    public void removeBucket(String bucketName) throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        myMinioClient.removeBucket(RemoveBucketArgs.builder().bucket(bucketName).build());
    }

    /******************************  查询文件 ******************************/

    /**
     * 判断文件是否存在
     * @param bucketName
     * @param objectName
     * @return
     */
    public boolean isObjectExist(String bucketName, String objectName) {
        boolean exist = true;
        try {
            myMinioClient.statObject(StatObjectArgs.builder().bucket(bucketName).object(objectName).build());
        } catch (Exception e) {
            log.error("[Minio工具类]>>>> 判断文件是否存在, 异常：", e);
            exist = false;
        }
        return exist;
    }

    /**
     * 获取文件信息, 如果抛出异常则说明文件不存在
     * @param bucketName 存储桶
     * @param objectName 文件名称
     * @return
     */
    public String getFileInfo(String bucketName, String objectName) throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        return myMinioClient.statObject(
                StatObjectArgs.builder()
                        .bucket(bucketName)
                        .object(objectName)
                        .build()).toString();
    }

    /**
     * 根据文件前缀来获取文件列表信息
     * @param bucketName 存储桶
     * @param prefix     文件名称前缀
     * @param recursive  是否递归查找，false：模拟文件夹结构查找
     * @return 二进制流
     */
    public Iterable<Result<Item>> getListObjects(String bucketName, String prefix, boolean recursive) {
        return myMinioClient.listObjects(
                ListObjectsArgs.builder()
                        .bucket(bucketName)
                        .prefix(prefix)
                        .recursive(recursive)
                        .build());
    }

    /**
     * 根据文件前缀，查询文件
     * @param bucketName 存储桶
     * @param prefix     前缀
     * @param recursive  是否使用递归查询
     * @return MinioItem 列表
     */
    public List<Item> getObjectsByPrefix(String bucketName,
                                            String prefix,
                                            boolean recursive) throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        List<Item> list = new ArrayList<>();
        Iterable<Result<Item>> objectsIterator = myMinioClient.listObjects(
                ListObjectsArgs.builder().bucket(bucketName).prefix(prefix).recursive(recursive).build());
        if (objectsIterator != null) {
            for (Result<Item> o : objectsIterator) {
                Item item = o.get();
                list.add(item);
            }
        }
        return list;
    }

    /**
     * 获取文件流
     * @param bucketName 存储桶
     * @param objectName 文件名
     * @return 二进制流
     */
    public InputStream getObject(String bucketName, String objectName) throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        return myMinioClient.getObject(
                GetObjectArgs.builder()
                        .bucket(bucketName)
                        .object(objectName)
                        .build());
    }


    /**
     * 获取文件外链,有时间限制
     * @param bucketName 存储桶
     * @param objectName 文件名
     * @param expires    外链有效时间（单位：秒）
     * @return url
     */
    @SneakyThrows(Exception.class)
    public String getPresignedObjectUrl(String bucketName, String objectName, Integer expires) {
        GetPresignedObjectUrlArgs args = GetPresignedObjectUrlArgs.builder().expiry(expires).bucket(bucketName).object(objectName).build();
        return myMinioClient.getPresignedObjectUrl(args);
    }

    /**
     * 获得文件外链，长期有效
     * @param bucketName
     * @param objectName
     * @return url
     */
    @SneakyThrows(Exception.class)
    public String getPresignedObjectUrl(String bucketName, String objectName) {
        GetPresignedObjectUrlArgs args = GetPresignedObjectUrlArgs.builder()
                .bucket(bucketName)
                .object(objectName)
                .method(Method.GET).build();
        return myMinioClient.getPresignedObjectUrl(args);
    }

    /**
     * 获取预签名链接、过期时间一天
     * @param bucketName  桶名
     * @param objectName  文件名称
     * @return
     */
    @SneakyThrows
    public String getPresignedObjectUrl(String bucketName, String objectName,Map<String, String> queryParams) {
        return myMinioClient.getPresignedObjectUrl(
                GetPresignedObjectUrlArgs.builder()
                        .method(Method.PUT)
                        .bucket(bucketName)
                        .object(objectName)
                        .expiry(60 * 60 * 24)
                        .extraQueryParams(queryParams)
                        .build());
    }

    /******************************  操作文件 ******************************/

    /**
     * 拷贝文件
     * @param bucketName    存储桶
     * @param objectName    文件名
     * @param srcBucketName 目标存储桶
     * @param srcObjectName 目标文件名
     */
    @SneakyThrows(Exception.class)
    public ObjectWriteResponse copyFile(String bucketName, String objectName, String srcBucketName, String srcObjectName) {
        return myMinioClient.copyObject(
                CopyObjectArgs.builder()
                        .source(CopySource.builder().bucket(bucketName).object(objectName).build())
                        .bucket(srcBucketName)
                        .object(srcObjectName)
                        .build());
    }

    /**
     * 删除文件
     * @param bucketName 存储桶
     * @param objectName 文件名称
     */
    @SneakyThrows(Exception.class)
    public void removeFile(String bucketName, String objectName) {
        myMinioClient.removeObject(
                RemoveObjectArgs.builder()
                        .bucket(bucketName)
                        .object(objectName)
                        .build());
    }

    /**
     * 批量删除文件
     * @param bucketName 存储桶
     * @param keys       需要删除的文件列表
     * @return
     */
    public void removeFiles(String bucketName, List<String> keys) {
        List<DeleteObject> objects = new LinkedList<>();
        keys.forEach(s -> {
            objects.add(new DeleteObject(s));
            try {
                removeFile(bucketName, s);
            } catch (Exception e) {
                log.error("[Minio工具类]>>>> 批量删除文件，异常：", e);
            }
        });
    }



    /******************************  下载文件  ******************************/

    /**
     * 断点下载
     * @param bucketName 存储桶
     * @param objectName 文件名称
     * @param offset     起始字节的位置
     * @param length     要读取的长度
     * @return 二进制流
     */
    public InputStream getObject(String bucketName, String objectName, long offset, long length) throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        return myMinioClient.getObject(
                GetObjectArgs.builder()
                        .bucket(bucketName)
                        .object(objectName)
                        .offset(offset)
                        .length(length)
                        .build());
    }

    /******************************  上传文件  ******************************/

    /**
     * 通过 MultipartFile 进行文件上传
     * @param bucketName  存储桶
     * @param file        文件名
     * @param objectName  对象名
     * @param contentType 文件类型
     * @return
     */
    public ObjectWriteResponse uploadFile(String bucketName, MultipartFile file, String objectName, String contentType) throws IOException, ServerException, InsufficientDataException, ErrorResponseException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        //先判断对象桶是否存在
        boolean b = bucketExists(bucketName);
        if(!b){
            //若对象桶不存在，则创建
            makeBucket(bucketName);
        }
        //把文件转化为输入流
        InputStream inputStream = file.getInputStream();
        //上传文件
        ObjectWriteResponse objectWriteResponse = myMinioClient.putObject(
                PutObjectArgs.builder()
                        .bucket(bucketName)
                        .object(objectName)
                        .contentType(contentType)
                        .stream(inputStream, inputStream.available(), -1)
                        .build());
        //上传文件后，关闭流
        if(inputStream!=null){
            inputStream.close();
        }
        return objectWriteResponse;
    }


    /**
     * 通过文件完整路径 上传文件
     * @param bucketName 存储桶
     * @param objectName 对象名称
     * @param filePath   本地文件路径
     * @return
     */
    public ObjectWriteResponse uploadFile(String bucketName, String objectName, String filePath) throws IOException, ServerException, InsufficientDataException, ErrorResponseException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        return myMinioClient.uploadObject(
                UploadObjectArgs.builder()
                        .bucket(bucketName)
                        .object(objectName)
                        .filename(filePath)
                        .build());
    }

    /**
     * 通过输入流 上传文件
     * @param bucketName  存储桶
     * @param objectName  文件对象
     * @param inputStream 文件流
     * @return
     */
    public ObjectWriteResponse uploadFile(String bucketName, String objectName, InputStream inputStream) throws IOException, ServerException, InsufficientDataException, ErrorResponseException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        return myMinioClient.putObject(
                PutObjectArgs.builder()
                        .bucket(bucketName)
                        .object(objectName)
                        .stream(inputStream, inputStream.available(), -1)
                        .build());
    }

    /**
     *  创建分片上传
     */
    public CreateMultipartUploadResponse createMultipartUpload(String bucketName, String region, String objectName, Multimap<String, String> headers, Multimap<String, String> extraQueryParams) throws NoSuchAlgorithmException, InsufficientDataException, IOException, InvalidKeyException, ServerException, XmlParserException, ErrorResponseException, InternalException, InvalidResponseException {
        return myMinioClient.createMultipartUpload(bucketName, region, objectName, headers, extraQueryParams);
    }

    /**
     * 完成分片上传（分片文件合并）
     */
    public ObjectWriteResponse completeMultipartUpload(String bucketName, String region, String objectName, String uploadId, Part[] parts, Multimap<String, String> extraHeaders, Multimap<String, String> extraQueryParams) throws NoSuchAlgorithmException, InsufficientDataException, IOException, InvalidKeyException, ServerException, XmlParserException, ErrorResponseException, InternalException, InvalidResponseException {
        return myMinioClient.completeMultipartUpload(bucketName, region, objectName, uploadId, parts, extraHeaders, extraQueryParams);
    }

    /**
     * 查询分片文件
     */
    public ListPartsResponse listParts(String bucketName, String region, String objectName, Integer maxParts, Integer partNumberMarker, String uploadId, Multimap<String, String> extraHeaders, Multimap<String, String> extraQueryParams) throws NoSuchAlgorithmException, InsufficientDataException, IOException, InvalidKeyException, ServerException, XmlParserException, ErrorResponseException, InternalException, InvalidResponseException {
        return myMinioClient.listParts(bucketName, region, objectName, maxParts, partNumberMarker, uploadId, extraHeaders, extraQueryParams);
    }
}

```

## 文件上传

前端代码

```html
<!--element-plus的文件上传组件-->
<el-upload
  ref="uploadRef"
  action="#"
  :limit="1"
  :file-list="fileList"
  :on-change="onChange"
  :auto-upload="false"
>
  <template #trigger>
    <el-button type="primary">选取文件</el-button>
  </template>
  <el-button style="margin-left: 10px" type="success" @click="uploadlFile">
    上传到服务器
  </el-button>
</el-upload>
<el-progress
  v-if="isShowProgress"
  :text-inside="true"
  :stroke-width="20"
  :percentage="progressPercent"
/>

<script setup>
  import axios from "axios"; //引入axios
  import { ElMessage } from "element-plus";

  let uploadRef = ref(undefined);
  let isShowProgress = ref(false); //是否显示进度条
  let progressPercent = ref(0); //进度条进度
  let fileList = ref([]); //文件列表

  //文件改变时,将新添加的文件加入到文件列表中
  function onChange(file) {
    fileList.value.push(file);
  }

  //自定义文件上传请求
  function uploadlFile() {
    //判断文件列表中是否有文件再上传
    if (fileList.value.length === 0) {
      return ElMessage.error("请选择要上传的文件");
    }
    //遍历文件列表，把列表中的每个文件都上传
    fileList.value.forEach((file) => {
      let param = new FormData();
      param.append("file", file.raw);
      param.append("bucketName", "media-episodes-bucket");
      isShowProgress.value = true;
      //调接口
      axios
        .request({
          url: "/shuyx-minio/oss/upload",
          method: "POST",
          data: param,
          headers: { "Content-Type": "multipart/form-data" },
          //获取进度方法
          onUploadProgress: (e) => {
            progressPercent.value = Number(
              ((e.loaded / e.total) * 100).toFixed(0)
            );
          },
        })
        .then((res) => {
          //设置文件列表中的文件的状态，变为成功
          file.url = res.data.fileName;
          file.status = "success";
          //隐藏进度条，并把进度清空
          isShowProgress.value = false;
          progressPercent.value = 0;
        });
    });
  }
</script>
```

后端代码

```java
@RestController
@RequestMapping("/shuyx-minio/oss")
public class OSSController {
    @Autowired
    private MinioUtils minioUtils;

    //用户头像文件对象桶
    private String USER_AVATAR_BUCKET = "user-avatar-bucket";
    //媒体剧集文件对象桶
    private String MEDIA_EPISODES_BUCKET = "media-episodes-bucket";

    /**
     * 上传文件接口
     * @param file
     */
    @PostMapping("/upload")
    public Object upload(@RequestParam("file") MultipartFile file,String bucketName) {
        log.info("/shuyx-minio/oss/upload, file,{}",file);
        double size = (double) (file.getSize() / 1024 / 1024) + 1;
        log.info(file.getOriginalFilename() +" 文件大小为 "+size+" MB之内。");

        try {
            //新文件名
            String newFileName = System.currentTimeMillis() + "." +  file.getOriginalFilename();
            //文件类型
            String contentType = file.getContentType();
            //上传文件
            minioUtils.uploadFile(bucketName, file, newFileName, contentType);
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("fileName",newFileName);
            return ReturnUtil.success(jsonObject);
        } catch (Exception e) {
            log.error("上传文件失败。请查询日志。");
            e.printStackTrace();
            return ReturnUtil.fail(ResultCodeEnum.HTTP_REQUEST_ERROR);
        }
    }
}

```

## 分片文件上传

当要上传的文件太大的时候。我们可以在前端，将大文件进行分片。然后把多个分片文件都上传到 minio 中。然后再 minio 中将分片文件拼接成大文件。

假设一个大文件，大小为 444M。并且设置每个分片文件的大小为 100M。那么这个大文件会被分成 5 个分片文件。

分片文件上传逻辑：

1. 前端通过后端向 minio 发送分片上传请求。参数是文件名称，文件分片数量，对象桶名称
   1. minio 会根据这些参数，创建一个 uploadId。
   2. 我们拿着 uploadId，再向 minio 获取预签名链接。链接个数与分片个数相同。
   3. 最后把 uploadId 和多个预签名链接。作为响应结果返回。
2. 前端将大文件进行分片。每个分片对应一个预签名链接。
3. 然后前端直接向 minio 发送 put 请求。参数就是分片文件和对应的预签名链接。
4. 当所有分片文件都上传到 minio 的时候。前端通过后端向 minio 发送分片文件合并请求。把 minio 中的分片文件合并为一个大文件。

<font color="red">注意：当我们拿到预签名链接后，前端是直接向minio服务端发送put请求，来上传分片文件。此时的put请求是没有经过后端的。</font>

前端代码：

```html
<!--element-plus的文件上传组件-->
<el-upload
  ref="uploadRef"
  action="#"
  :limit="1"
  :file-list="fileList"
  :on-change="onChange"
  :auto-upload="false"
>
  <template #trigger>
    <el-button type="primary">选取文件</el-button>
  </template>
  <el-button style="margin-left: 10px" type="success" @click="uploadlPartFile">
    上传到服务器
  </el-button>
</el-upload>
<el-progress
  v-if="isShowProgress"
  :text-inside="true"
  :stroke-width="20"
  :percentage="progressPercent"
/>

<script setup>
import axios from "axios"; //引入axios
  import { ElMessage } from "element-plus";

  //自定义分片文件上传请求
  function uploadlPartFile() {
    //判断文件列表中是否有文件再上传
    if (fileList.value.length === 0) {
      return ElMessage.error("请选择要上传的文件");
    }
    //获取文件列表中的第一个文件
    let currentFile = fileList.value[0].raw;
    console.log("11", currentFile);

    //将文件分片,得到分片数组
    let fileChunkList = createFileChunk(currentFile);

    //请求参数
    let param = new FormData();
    param.append("fileName", currentFile.name);
    param.append("bucketName", "media-episodes-bucket");
    param.append("chunkNum", fileChunkList.length);

    //创建分片上传请求
    axios.request({
        url: "/shuyx-minio/oss/createMultipartUpload",
        method: "POST",
        data: param,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(async (res) => {
        //uploadId
        let uploadId = res.data.uploadId;
        //预签名链接数组
        let chunkList = res.data.uploadUrlList;
        //依次上传分片文件
        for (let i = 0; i < fileChunkList.length; i++) {
          console.log("------------------------------------");
          console.log("开始上传第" + (i + 1) + "个分片");
          //此处用axios发送put请求,该请求用于上传分片文件
          //请求参数就是分片文件和对应的预签名链接
          //注意该请求是同步的。即一个分片文件上传完毕之后，再上传下一个分片文件
          await axios({
            method: "put",
            url: chunkList[i],
            data: fileChunkList[i].file,
          }).then(async function (res) {
            if (res.status == 200) {
              console.log("第" + (i + 1) + "个分片,上传成功");
            } else {
              console.log("第" + (i + 1) + "个分片,上传失败");
            }
          });
        }

        //如果最后一个分片文件上传完毕，那么就调用分片文件合并请求
        let obj = {
          bucketName: "media-episodes-bucket",
          fileName: currentFile.name,
          uploadId: uploadId,
        };
        console.log("开始合并分片");

        axios.request({
            url: "/shuyx-minio/oss/mergePartFile",
            method: "POST",
            data: obj,
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((r) => {
            console.log("mergePartFile", r);
            console.log("分片合并完成");
          });
      });
  }

  /**
   * 把文件分片
   */
  function createFileChunk(file) {
    let fileChunkList = [];
    let chunkSize = 100 * 1024 * 1024; //每个分片大小为100mb
    let count = 0;
    while (count < file.size) {
      fileChunkList.push({
        file: file.slice(count, count + chunkSize),
      });
      count += chunkSize;
    }
    return fileChunkList;
  }
</script>
```

后端代码

```java
@RestController
@RequestMapping("/shuyx-minio/oss")
public class OSSController {
    @Autowired
    private MinioUtils minioUtils;

    //用户头像文件对象桶
    private String USER_AVATAR_BUCKET = "user-avatar-bucket";
    //媒体剧集文件对象桶
    private String MEDIA_EPISODES_BUCKET = "media-episodes-bucket";
  
    /**
     * 创建分片文件请求等信息
     * 逻辑：
     * 1. minio接收到前端发来的创建分片文件请求。会返回对应的uploadId
     * 2. 然后通过uploadId以及分片数量，创建同等数量的预签名链接。并返回
     * @return
     */
    @PostMapping("/createMultipartUpload")
    public Object createMultipartUpload(String fileName,String bucketName,Integer chunkNum)  {
        log.info("/shuyx-minio/oss/createMultipartUpload, bucketName {} , fileName {},chunkNum {}",bucketName,fileName,chunkNum);
        log.info("文件名称为"+fileName);
        log.info("对象桶名称为"+bucketName);
        log.info("分片数量为"+chunkNum);

        // 1. 向minio创建分片上传请求,会返回一个uploadId
        CreateMultipartUploadResponse response = minioUtils.createMultipartUpload(bucketName, null, fileName, null, null);
        // 2. 获取uploadId
        String uploadId = response.result().uploadId();

        // 3. 返回结果信息
        Map<String, Object> result = new HashMap<>();
        result.put("uploadId",uploadId);

        ArrayList<String> uploadUrlList = new ArrayList<>();

        // 4. 请求Minio，获取每个分块，对应的签名上传URL
        Map<String, String> partMap = new HashMap<>();
        partMap.put("uploadId", uploadId);
        // 5. 根据分片数量，循环获取各个分片的预签名链接
        for (int i = 1; i <= chunkNum; i++) {
            partMap.put("partNumber", String.valueOf(i));
            String uploadUrl = minioUtils.getPresignedObjectUrl(bucketName, fileName, partMap);//获取每个分片文件的预签名链接
            uploadUrlList.add(uploadUrl);   //添加预签名链接
        }
        result.put("uploadUrlList",uploadUrlList);
        //返回
        return ReturnUtil.success(result);
    }

    /**
     * 合并分片文件
     */
    @PostMapping("/mergePartFile")
    public Object mergePartFile(String bucketName,String fileName,String uploadId) throws ServerException, InsufficientDataException, ErrorResponseException, NoSuchAlgorithmException, IOException, InvalidKeyException, XmlParserException, InvalidResponseException, InternalException {
         //先查询minio中具有相同uploadId的分片文件
        ListPartsResponse listPartsResponse = minioUtils.listParts(bucketName,null,
                fileName,null,null, uploadId,null,null);
        List<Part> parts = listPartsResponse.result().partList();
        //找到这些分片文件之后，开始合并分片文件
        minioUtils.completeMultipartUpload(bucketName, null,
                fileName, uploadId, parts.toArray(new Part[]{}), null, null);
        return ReturnUtil.success();
    }

}
```