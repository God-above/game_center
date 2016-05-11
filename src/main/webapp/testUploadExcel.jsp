<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>上传卡券Excel</title>
</head>
<body>
<h1>文件上传区域</h1>
<form action="./coupon/uploadConvertExcel" method="post" enctype="multipart/form-data">
	<input type="file" name="file">
	<input type="submit" value="提交">
</form>
</body>
</html>