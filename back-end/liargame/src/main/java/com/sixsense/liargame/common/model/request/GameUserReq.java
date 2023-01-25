package com.sixsense.liargame.common.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GameUserReq {
    private Long userId;
    private String role;
}