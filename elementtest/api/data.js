import axios from "./axios";
// 注册
export const getMenu =(param)=>{
	return axios.request({
		url:'http://localhost:8081/signUser',
		method:'post',
		data:param
	})
}
// 登录
export const getLogin =(param)=>{
	return axios.request({
		url:'http://localhost:8081/login',
		method:'post',
		data:param
	})
}
// 页面初始化
export const getAll =(value,adminName,pageSize,adminEmail,adminAddress)=>{
	return axios.request({
		url:'http://localhost:8081/pageUsers',
		method:'get',
		params:{currentPage:value,adminName:adminName,pageSize:pageSize,adminEmail:adminEmail,adminAddress:adminAddress}
	})
}
// 删除admin
export const deleteById =(adminId)=>{
	return axios.request({
		url:'http://localhost:8081/deleteById',
		method:'get',
		params:{adminId:adminId}
	})
}
// 添加admin
export const insertAdmin =(param)=>{
	return axios.request({
		url:'http://localhost:8081/insertAdmin',
		method:'post',
		data:param
	})
}
// 修改admin
export const updAdmin =(param)=>{
	return axios.request({
		url:'http://localhost:8081/updAdmin',
		method:'post',
		data:param
	})
}
// 角色初始化
export const selectRole =()=>{
	return axios.request({
		url:'http://localhost:8081/selectRole',
		method:'get',
	})
}
// 角色总数
export const selectRoleCount =()=>{
	return axios.request({
		url:'http://localhost:8081/selectRoleCount',
		method:'get',
	})
}
// 商品列表
export const listAll =()=>{
	return axios.request({
		url:'http://localhost:8081/list',
		method:'post',
	})
}

// 文件列表
export const fileList =(pageNum,pageSize,name)=>{
	return axios.request({
		url:'http://localhost:8081/file/page',
		method:'get',
		params:{pageNum:pageNum,pageSize:pageSize,name:name}
	})
}
// 文件修改
export const fileUpdate =(row)=>{
	return axios.request({
		url:'http://localhost:8081//file/update',
		method:'post',
		data:row
	})
}
// 文件删除
export const fileDelete =(id)=>{
	return axios.request({
		url:'http://localhost:8081/file',
		method:'get',
		params:{id:id}
	})
}
// 批量删除文件
export const fileDeleteAll =(ids)=>{
	return axios.request({
		url:'http://localhost:8081/file/del/batch',
		method:'post',
		data:ids
	})
}
// 图表
export const Echarts =()=>{
	return axios.request({
		url:'http://localhost:8081/echarts/members',
		method:'get',
	})
}
// 根据账号查信息
export const selectAdminInfo =(adminId)=>{
	return axios.request({
		url:'http://localhost:8081/selectAdminInfo',
		method:'get',
		params:{adminId:adminId}
	})
}