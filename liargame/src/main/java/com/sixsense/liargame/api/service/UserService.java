package com.sixsense.liargame.api.service;


import com.sixsense.liargame.api.request.UserRegisterPostReq;
import com.sixsense.liargame.db.entity.User;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	User createUser(UserRegisterPostReq userRegisterInfo);
	User getUserByUserId(String userId);
}
