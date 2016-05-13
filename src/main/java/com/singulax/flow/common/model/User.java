package com.singulax.flow.common.model;

import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

/**
 * 用户信息
 * @author : hp.long
 * @date   : 2014/9/11
 */
@Entity
public class User implements Serializable{

	private static final long serialVersionUID = -8706283871565868643L;
	
	/**
	 * 已关注
	 */
	public static Integer STATE_ATTENTION = 1;

	/**
	 * 已取消关注
	 */
	public static Integer STATE_UN_ATTENTION = 0;

    @Id
    private ObjectId objectId;

	private Long id;// 主键
    private String userCode;// 用户编号，登陆账号
    private String userName;// 用户名称
    private String nickName;// 用户昵称
    private String password;// 登陆密码
    private Integer userType;// 用户类型：1-6越大登记越高
    private String companyName;// 公司名称（公司客户）
    private String companyAddress;// 公司地址（公司客户）
    private Date createDate;// 创建时间
    private Date updateDate;// 修改时间
    private Integer status;// 用户状态，0：停用；1：启用 2:注册待验证
    private String contacts;// 联系人（公司客户）
    private String tel;// 联系电话
    private String email;// 邮箱
    private String payPassword;// 支付密码md5
    private String remark;// 备注信息
    private String disableReason;//禁用原因
    
    private String creatorName;//　创建人名称
    
    /**
     * 微信服务器分配的唯一标识
     */
    private String wxOpenId;
    
    /**
     * 微信的头像url
     */
    private String wxPhotoUrl;
    
    /**
     * 性别
     */
    private Integer sex;
    
    /**
     * 地区
     */
    private String area;
    
    /**
     * 微信状态 0：取消关注 1：已关注
     */
    private Integer wxState;
    
    private String urlType;//(用于前端参数传递，不记录数据库)

	private Date lastLoginFailedDate;        // 最后一次登录失败的时间, 用于决定登录时是否需要验证码
	private Date lastLoginDate;				// 最后一次登录时间

	private Integer securityLevel;			// 安全等级

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserCode() {
		return userCode;
	}

	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getUserType() {
		return userType;
	}

	public void setUserType(Integer userType) {
		this.userType = userType;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getCompanyAddress() {
		return companyAddress;
	}

	public void setCompanyAddress(String companyAddress) {
		this.companyAddress = companyAddress;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getContacts() {
		return contacts;
	}

	public void setContacts(String contacts) {
		this.contacts = contacts;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPayPassword() {
		return payPassword;
	}

	public void setPayPassword(String payPassword) {
		this.payPassword = payPassword;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getDisableReason() {
		return disableReason;
	}

	public void setDisableReason(String disableReason) {
		this.disableReason = disableReason;
	}

	public String getCreatorName() {
		return creatorName;
	}

	public void setCreatorName(String creatorName) {
		this.creatorName = creatorName;
	}

	public String getUrlType() {
		return urlType;
	}

	public void setUrlType(String urlType) {
		this.urlType = urlType;
	}

	public Date getLastLoginFailedDate() {
		return lastLoginFailedDate;
	}

	public void setLastLoginFailedDate(Date lastLoginFailedDate) {
		this.lastLoginFailedDate = lastLoginFailedDate;
	}

	public Date getLastLoginDate() {
		return lastLoginDate;
	}

	public void setLastLoginDate(Date lastLoginDate) {
		this.lastLoginDate = lastLoginDate;
	}

	public Integer getSecurityLevel() {
		return securityLevel;
	}

	public void setSecurityLevel(Integer securityLevel) {
		this.securityLevel = securityLevel;
	}

	public Integer getSex() {
		return sex;
	}

	public void setSex(Integer sex) {
		this.sex = sex;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getWxOpenId() {
		return wxOpenId;
	}

	public void setWxOpenId(String wxOpenId) {
		this.wxOpenId = wxOpenId;
	}

	public String getWxPhotoUrl() {
		return wxPhotoUrl;
	}

	public void setWxPhotoUrl(String wxPhotoUrl) {
		this.wxPhotoUrl = wxPhotoUrl;
	}

	public Integer getWxState() {
		return wxState;
	}

	public void setWxState(Integer wxState) {
		this.wxState = wxState;
	}
}
